import axios from 'axios';
import whatsappService from './whatsapp.service.js';
import translationService from './translation.service.js';
import WHATSAPP_CONFIG from './config.js';
import { getStaffByBusinessId, getUserByPhoneNumber, registerUser } from '../user/user.service.js';
import {
  createOrFindAppointment,
  getAppointmentByPhoneNumber,
  updateDate,
  updateFinalStatus,
  updateService,
  updateStaff,
  updateTime,
} from '../appointment/whatsappAppointment.service.js';

const webhookService = {
  webhook: async (req, res) => {
    const { business_id } = req.params;

    if (
      req.method === 'GET' &&
      req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === business_id
    ) {
      return res.send(req.query['hub.challenge']);
    }

    if (req.method === 'POST') {
      const data = req.body;
      const reqData = data.entry?.[0]?.changes?.[0]?.value;

      if (reqData?.statuses) {
        return res.send('ok');
      }

      res.send('ok');
      const user_phone_no = reqData?.contacts?.[0]?.wa_id;
      const user = await getUserByPhoneNumber(user_phone_no);

      switch (reqData?.messages?.[0]?.type) {
        case WHATSAPP_CONFIG.MESSAGE_TYPES.TEXT:
          if (!user || user === null || user === undefined) {
            try {
              const flow = await whatsappService.getFlowIdForBusiness(business_id);

              await whatsappService.sendWhatsappFlow(
                user_phone_no,
                translationService.getItalianMessage('welcome'),
                translationService.getItalianMessage('welcome_message'),
                translationService.getItalianMessage('sign_up'),
                flow.flow_id,
              );
            } catch (error) {
              console.log('Error: ', error);
            }
          } else {
            sendIntentMessage(business_id, user_phone_no);
          }
          break;
        case WHATSAPP_CONFIG.MESSAGE_TYPES.INTERACTIVE:
          switch (reqData.messages[0].interactive.type) {
            case WHATSAPP_CONFIG.INTERACTIVE_TYPES.BUTTON_REPLY:
              const buttonReply = reqData.messages[0].interactive.button_reply.id.split('-');

              if (buttonReply[2] === 'book') {
                getAndSendListOfService(business_id, user_phone_no);
              } else if (buttonReply[2] === 'reschedule') {
                getAndSendListOfAppointment(business_id, user_phone_no, 'reschedule');
              } else if (buttonReply[2] === 'cancel') {
                getAndSendListOfAppointment(business_id, user_phone_no, 'cancel');
              } else if (buttonReply[4] === 'confirm') {
                confirmAppointment(buttonReply[1], buttonReply[3], user_phone_no, WHATSAPP_CONFIG.APPOINTMENT_STATUS.SCHEDULED, buttonReply[5] === 'reschedule_confirm' ? 'reschedule' : 'book');
              } else if (buttonReply[4] === 'cancel') {
                confirmAppointment(buttonReply[1], buttonReply[3], user_phone_no, WHATSAPP_CONFIG.APPOINTMENT_STATUS.IN_PROGRESS,  buttonReply[5] === 'cancel_reschedule' ? 'reschedule' : 'book');
              } else if (buttonReply[4] === 'back_to_menu') {
                sendIntentMessage(buttonReply[1], user_phone_no);
              } else if (buttonReply[4] === 'cancel_confirm') {
                confirmAppointment(buttonReply[1], buttonReply[3], user_phone_no, WHATSAPP_CONFIG.APPOINTMENT_STATUS.CANCELLED);
              }
              break;
            case WHATSAPP_CONFIG.INTERACTIVE_TYPES.LIST_REPLY:
              const data = reqData.messages[0].interactive.list_reply.id.split('-');

              if (data[0] === 'reschedule') {
                getAndSendNext6MonthsList(data[1], data[5], data[3], user_phone_no, 'reschedule');
              } else if (data[0] === 'cancel') {
                confirmAppointment(data[1], data[3], user_phone_no, WHATSAPP_CONFIG.APPOINTMENT_STATUS.IN_PROGRESS, 'cancel');
              } else if (data[2] === 'service') {
                getAndSendListOfTeam(data[1], data[3], data[5], user_phone_no);
              } else if (data[2] === 'staff') {
                getAndSendNext6MonthsList(data[1], data[3], data[7], user_phone_no);
              } else if (data[2] === 'date') {
                if (data.length === 9) {
                  const date = data[3].split('/');
                  getAndSendListOfTime(data[1], `${date[0]}-${date[1]}-${date[2]}`, data[5], data[7], user_phone_no, data[8]);
                } else {
                  getAndSendListOfTime(data[1], `${data[3]}-${data[4]}-${data[5]}`, data[7], data[9], user_phone_no, data[10], data[11], data[12]);
                }
              } else if (data[2] === 'time') {
                sendAppointmentConfirmation(data[1], data[5], data[3], user_phone_no, data[6]);
              } else if (data[2] === 'month') {
                getAndSendWeeklyList(data[1], `${data[4]} ${data[3]}`, data[6], data[8], user_phone_no, data[9]);
              } else if (data[2] === 'week') {
                getAndSendListOfDate(data[1], data[9], data[11], user_phone_no, data[12], {
                  from: data[3],
                  to: data[5],
                });
              }
              break;
            case WHATSAPP_CONFIG.INTERACTIVE_TYPES.NFM_REPLY:
              const flowData = await JSON.parse(
                reqData.messages[0].interactive.nfm_reply.response_json
              );

              if (flowData.name && flowData.email) {
                const newUser = await registerUser({
                  name: flowData.name,
                  email: flowData.email,
                  phone_number: user_phone_no,
                  password: flowData.password,
                  role: 'user',
                  is_verified: true,
                });

                if (newUser.success) {
                  await whatsappService.sendText(
                    translationService.getItalianMessage('user_registered_success'),
                    user_phone_no,
                  );

                  getAndSendListOfService(business_id, user_phone_no);
                } else {
                  await whatsappService.sendText(
                    newUser.message,
                    user_phone_no,
                  );
                }
              }
              break;
          }
          break;
        default:
          break;
      }
    }
  },
};

const sendIntentMessage = async (business_id, user_phone_no) => {
  try {
    const data = {
      phone: user_phone_no,
      header: {
        type: 'text',
        text: translationService.getItalianMessage('intent_header_message'),
      },
      // "it": "Grazie per averci contattato {{namelocalactivity}}!\n\nCome possiamo aiutarti?"
      body: translationService.getItalianMessage('intent_message'),
      buttons: [
        {
          id: `business-${business_id}-book`,
          title: translationService.getItalianMessage('book'),
        },
        {
          id: `business-${business_id}-reschedule`,
          title: translationService.getItalianMessage('reschedule'),
        },
        {
          id: `business-${business_id}-cancel`,
          title: translationService.getItalianMessage('cancel_appointment'),
        },
      ],
    };

    await whatsappService.sendButton(data);
  } catch (error) {
    console.log('Error: ', error);
  }
}

const getAndSendListOfAppointment = async (business_id, user_phone_no, type) => {
  try {
    const appointments = await getAppointmentByPhoneNumber(business_id, user_phone_no);

    // Helper to format date as dd-mm-yyyy
    const formatDateEU = (dateStr) => {
      if (!dateStr) return '';
      const [year, month, day] = dateStr.split('-');
      if (!year || !month || !day) return dateStr;
      return `${day}-${month}-${year}`;
    };

    const appointmentData = appointments?.map((appointment) => ({
      id: `${type}-${business_id}-appointment-${appointment._id}-staff-${appointment.staffId._id}-service-${appointment.serviceId._id}-type-${type}`,
      title: appointment.serviceId.title,
      description: `Staff: ${appointment.staffId.name}\nDate: ${formatDateEU(appointment.appointmentDate)}\nTime: ${appointment.appointmentTime}`,
    }));

    const data = {
      phone: user_phone_no,
      body: type === 'reschedule'
        ? translationService.getItalianMessage('select_appointment_to_reschedule')
        : translationService.getItalianMessage('select_appointment_to_cancel'),
      buttonTitle: translationService.getItalianMessage('appointments'),
      buttons: appointmentData,
    };

    await whatsappService.sendList(data);
  } catch (error) {
    console.log('Error: ', error?.response?.data);
  }
}

const getAndSendListOfService = async (business_id, user_phone_no) => {
  try {
    const appointment = await createOrFindAppointment(business_id, user_phone_no);
    // router.get('/:business_id/:category_id/service', getServices);
    const services = await axios.get(`${process.env.API_URL}/api/v1/categories/service/${business_id}`);
    const servicesData = services?.data?.services.map((service) => ({
      id: `booking-${business_id}-service-${service._id}-appointment-${appointment._id}`,
      title: service.title,
      description: translationService.getItalianMessage('service_duration', { duration: service.service_time }),
    }));

    const data = {
      phone: user_phone_no,
      body: translationService.getItalianMessage('select_service'),
      buttonTitle: translationService.getItalianMessage('services'),
      buttons: servicesData,
    };

    await whatsappService.sendList(data);
  } catch (error) {
    console.log('Error: ', error?.response?.data);
  }
}

const getAndSendListOfTeam = async (business_id, service_id, appointment_id, user_phone_no) => {
  try {
    const appointment = await updateService(appointment_id, service_id);
    const staff = await getStaffByBusinessId(business_id);
    const staffData = staff?.map((staff) => ({
      id: `booking-${business_id}-staff-${staff?.staff_id?._id}-service-${service_id}-appointment-${appointment._id}`,
      title: staff.staff_id.name,
      description: staff.staff_id.email,
    }));

    const data = {
      phone: user_phone_no,
      body: translationService.getItalianMessage('select_staff'),
      buttonTitle: translationService.getItalianMessage('staff'),
      buttons: staffData,
    };

    await whatsappService.sendList(data);
  } catch (error) {
    console.log('Error: ', error);
  }
}

const getAndSendNext6MonthsList = async (business_id, staff_id, appointment_id, user_phone_no, type = 'book') => {
  try {
    const appointment = await updateStaff(appointment_id, staff_id);

    const next6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() + i);
      let monthName = date.toLocaleString('it-IT', { month: 'long' });
      monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
      const year = date.getFullYear();

      return {
        id: `booking-${business_id}-month-${year}-${monthName}-staff-${staff_id}-appointment-${appointment._id}-${type === 'reschedule' ? 'reschedule' : 'book'}`,
        title: `${monthName} ${year}`,
      };
    });

    const data = {
      phone: user_phone_no,
      body: type === 'book' ? translationService.getItalianMessage('select_month_to_book') : translationService.getItalianMessage('select_month_to_reschedule'),
      buttonTitle: translationService.getItalianMessage('month'),
      buttons: next6Months,
    };
    await whatsappService.sendList(data);
  } catch (error) {
    console.log('Error: ', error);
  }
}

const getAndSendWeeklyList = async (business_id, month, staff_id, appointment_id, user_phone_no, type = 'book') => {
  try {
    const italianMonths = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    const [monthName, yearStr] = month.split(' ');
    const year = parseInt(yearStr, 10);
    const monthIndex = italianMonths.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
    if (monthIndex === -1) throw new Error('Invalid month name: ' + monthName);
    const today = new Date();

    let startDay = 1;
    if (today.getMonth() === monthIndex && today.getFullYear() === year) {
      startDay = today.getDate();
    }

    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    const formatDateEU = (dateObj) => {
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const weeklyRanges = [];
    let rangeStart = startDay;
    while (rangeStart <= lastDay) {
      let rangeEnd = Math.min(rangeStart + 6, lastDay);
      const startDateObj = new Date(year, monthIndex, rangeStart);
      const endDateObj = new Date(year, monthIndex, rangeEnd);

      weeklyRanges.push({
        id: `booking-${business_id}-week-${formatDateEU(startDateObj)}-to-${formatDateEU(endDateObj)}-${monthName}-${year}-staff-${staff_id}-appointment-${appointment_id}-${type === 'reschedule' ? 'reschedule' : 'book'}`,
        title: `${formatDateEU(startDateObj)} - ${formatDateEU(endDateObj)}`,
      });
      rangeStart = rangeEnd + 1;
    }

    const data = {
      phone: user_phone_no,
      body: type === 'book' ? translationService.getItalianMessage('select_week_to_book') : translationService.getItalianMessage('select_week_to_reschedule'),
      buttonTitle: translationService.getItalianMessage('week'),
      buttons: weeklyRanges,
    };

    await whatsappService.sendList(data);
  } catch (error) {
    console.log('Error: ', error);
  }
}

const getAndSendListOfDate = async (business_id, staff_id, appointment_id, user_phone_no, type = 'book', dateRange = null) => {
  try {
    let appointmentDates = [];
    if (dateRange?.from && dateRange.to) {
      const date = await axios.get(`${process.env.API_URL}/api/v1/settings/business/${business_id}/available-dates?from=${dateRange.from}&to=${dateRange.to}`);
      appointmentDates = date?.data?.available_dates;
    } else {
      const date = await axios.get(`${process.env.API_URL}/api/v1/settings/business/${business_id}/available-dates`);
      appointmentDates = date?.data?.available_dates;
    }

    const dateData = appointmentDates.map((date) => ({
      id: `booking-${business_id}-date-${date.date}-staff-${staff_id}-appointment-${appointment_id}-${type}`,
      title: date.date,
      description: translationService.getItalianMessage('available_from_to', { 
        from: date.available_from, 
        to: date.available_to 
      }),
    }));

    const data = {
      phone: user_phone_no,
      body: type === 'book'
              ? translationService.getItalianMessage('select_date_to_book')
              : translationService.getItalianMessage('select_date_to_reschedule'),
      buttonTitle: type === 'book'
                    ? translationService.getItalianMessage('date')
                    : translationService.getItalianMessage('date_button_title'),
      buttons: dateData,
    };

    await whatsappService.sendList(data);
  } catch (error) {
    console.log('Error: ', error);
  }
}

const getAndSendListOfTime = async (business_id, date, staff_id, appointment_id, user_phone_no, type = 'book', check = 'start', timeslot = null) => {
  try {
    const dateStr = date.split('-');

    let time = [];
    if (check === 'more') {
      time = await axios.get(`${process.env.API_URL}/api/v1/settings/business/${business_id}/staff/${staff_id}/available-times/${dateStr[2]}-${dateStr[1]}-${dateStr[0]}?time=${timeslot}`);
    } else {
      await updateDate(appointment_id, `${dateStr[2]}-${dateStr[1]}-${dateStr[0]}`);
      time = await axios.get(`${process.env.API_URL}/api/v1/settings/business/${business_id}/staff/${staff_id}/available-times/${dateStr[2]}-${dateStr[1]}-${dateStr[0]}`);
    }
    const timeData = time?.data?.available_times.map((time) => ({
      id: type === 'book' ? `booking-${business_id}-time-${time.time}-appointment-${appointment_id}` : `booking-${business_id}-time-${time.time}-appointment-${appointment_id}-reschedule`,
      title: time.time,
    }));

    if (timeData.length === 9) {
      const lastTime = timeData[timeData.length - 1].title;
      timeData.push({
        id: `booking-${business_id}-date-${date}-staff-${staff_id}-appointment-${appointment_id}-${type}-more-${lastTime}`,
        title: 'More Time Slots',
        description: 'You can get next time slots from this',
      });
    }

    const data = {
      phone: user_phone_no,
      body: type === 'book' ? translationService.getItalianMessage('select_time') : translationService.getItalianMessage('select_time_to_reschedule'),
      buttonTitle: type === 'book' ? translationService.getItalianMessage('time') : translationService.getItalianMessage('time_button_title'),
      buttons: timeData,
    };

    await whatsappService.sendList(data);
  } catch (error) {
    console.log('Error: ', error);
  }
}

const sendAppointmentConfirmation = async (business_id, appointment_id, time, user_phone_no, type = 'book') => {
  try {
    const appointment = await updateTime(appointment_id, time);
    const date = appointment.appointmentDate.split('-');

    const data = {
      phone: user_phone_no,
      body: type === 'book' ? translationService.getItalianMessage('appointment_details', {
        service: appointment?.serviceId?.title,
        staff: appointment?.staffId?.name,
        date: `${date[2]}/${date[1]}/${date[0]}`,
        time: appointment?.appointmentTime
      }) : translationService.getItalianMessage('appointment_reschedule_details', {
        service: appointment?.serviceId?.title,
        staff: appointment?.staffId?.name,
        date: `${date[2]}/${date[1]}/${date[0]}`,
        time: appointment?.appointmentTime
      }),
      buttons: [
        {
          id: type === 'book' ? `booking-${business_id}-appointment-${appointment._id}-confirm` : `booking-${business_id}-appointment-${appointment._id}-confirm-reschedule_confirm`,
          title: translationService.getItalianMessage('confirm'),
        },
        {
          id: type === 'book' ? `booking-${business_id}-appointment-${appointment._id}-cancel` : `booking-${business_id}-appointment-${appointment._id}-cancel-cancel_reschedule`,
          title: type === 'book' ? translationService.getItalianMessage('cancel') : translationService.getItalianMessage('cancel_reschedule'),
        },
      ],
    };

    await whatsappService.sendButton(data);
  } catch (error) {
    console.log('Error: ', error);
  }
}

const confirmAppointment = async (business_id, appointment_id, user_phone_no, status, type = 'book') => {
  try {
    const appointment = await updateFinalStatus(appointment_id, status);
    if (status === WHATSAPP_CONFIG.APPOINTMENT_STATUS.SCHEDULED) {
      await whatsappService.sendText(
        type === 'book' ? translationService.getItalianMessage('appointment_confirmation_message', {
          date: appointment?.appointmentDate,
          time: appointment?.appointmentTime
        }) : translationService.getItalianMessage('appointment_reschedule_message', {
          date: appointment?.appointmentDate,
          time: appointment?.appointmentTime
        }),
        user_phone_no,
      );
    } else if (status === WHATSAPP_CONFIG.APPOINTMENT_STATUS.IN_PROGRESS) {
      const data = {
        phone: user_phone_no,
        body: type === 'book' ? translationService.getItalianMessage('appointment_cancelation_message') : type === 'cancel' ? translationService.getItalianMessage('appointment_cancel_message') : translationService.getItalianMessage('appointment_reschedule_cancelation_message'),
        buttons: [
          {
            id: `booking-${business_id}-appointment-${appointment._id}-back_to_menu`,
            title: translationService.getItalianMessage('appointment_back_to_main_menu'),
          },
          {
            id: `booking-${business_id}-appointment-${appointment._id}-cancel_confirm`,
            title: translationService.getItalianMessage('appointment_cancel_confirm'),
          },
        ],
      };

      await whatsappService.sendButton(data);
    } else if (status === WHATSAPP_CONFIG.APPOINTMENT_STATUS.CANCELLED) {
      await whatsappService.sendText(
        translationService.getItalianMessage('appointment_cancelation_message_1'),
        user_phone_no,
      );
    }
  } catch (error) {
    console.log('Error: ', error);
  }
}

export default webhookService;
