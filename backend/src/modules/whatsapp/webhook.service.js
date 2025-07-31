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
              await whatsappService.sendWhatsappFlow(
                user_phone_no,
                translationService.getItalianMessage('welcome'),
                translationService.getItalianMessage('welcome_message'),
                translationService.getItalianMessage('sign_up'),
                '1447863196403524',
              );
            } catch (error) {
              console.log('Error: ', error);
            }
          // } else if ((reqData?.messages?.[0]?.text?.body).includes('book')) {
          //   getAndSendListOfService(business_id, user_phone_no);
          // } else if ((reqData?.messages?.[0]?.text?.body).includes('reschedule')) {
          //   getAndSendListOfAppointment(business_id, user_phone_no, 'reschedule');
          // } else if ((reqData?.messages?.[0]?.text?.body).includes('cancel')) {
          //   getAndSendListOfAppointment(business_id, user_phone_no, 'cancel');
          } else {
            sendIntentMessage(business_id, user_phone_no);
          }
          break;
        case WHATSAPP_CONFIG.MESSAGE_TYPES.INTERACTIVE:
          switch (reqData.messages[0].interactive.type) {
            case WHATSAPP_CONFIG.INTERACTIVE_TYPES.BUTTON_REPLY:
              const buttonReply = reqData.messages[0].interactive.button_reply.id.split('-');

              console.log('Button Reply: ', buttonReply);
              if (buttonReply[2] === 'book') {
                getAndSendListOfService(business_id, user_phone_no);
              } else if (buttonReply[2] === 'reschedule') {
                getAndSendListOfAppointment(business_id, user_phone_no, 'reschedule');
              } else if (buttonReply[2] === 'cancel') {
                getAndSendListOfAppointment(business_id, user_phone_no, 'cancel');
              } else if (buttonReply[4] === 'confirm') {
                confirmAppointment(buttonReply[1], buttonReply[3], user_phone_no, WHATSAPP_CONFIG.APPOINTMENT_STATUS.SCHEDULED);
              } else if (buttonReply[4] === 'cancel') {
                confirmAppointment(buttonReply[1], buttonReply[3], user_phone_no, WHATSAPP_CONFIG.APPOINTMENT_STATUS.CANCELLED);
              }
              break;
            case WHATSAPP_CONFIG.INTERACTIVE_TYPES.LIST_REPLY:
              const data = reqData.messages[0].interactive.list_reply.id.split('-');

              if (data[0] === 'reschedule') {
                getAndSendListOfDate(data[1], data[5], data[3], user_phone_no);
              } else if (data[0] === 'cancel') {
                confirmAppointment(data[1], data[3], user_phone_no, WHATSAPP_CONFIG.APPOINTMENT_STATUS.CANCELLED);
              } else if (data[2] === 'service') {
                getAndSendListOfTeam(data[1], data[3], data[5], user_phone_no);
              } else if (data[2] === 'staff') {
                getAndSendListOfDate(data[1], data[3], data[7], user_phone_no);
              } else if (data[2] === 'date') {
                getAndSendListOfTime(data[1], `${data[3]}-${data[4]}-${data[5]}`, data[7], data[9], user_phone_no);
              } else if (data[2] === 'time') {
                sendAppointmentConfirmation(data[1], data[5], data[3], user_phone_no);
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
    const appointmentData = appointments?.map((appointment) => ({
      id: `${type}-${business_id}-appointment-${appointment._id}-staff-${appointment.staffId._id}-service-${appointment.serviceId._id}`,
      title: appointment.serviceId.title,
      description: `Staff: ${appointment.staffId.name}\nDate: ${appointment.appointmentDate}\nTime: ${appointment.appointmentTime}`,
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
    console.log('Error: ', error);
  }
}

const getAndSendListOfService = async (business_id, user_phone_no) => {
  try {
    const appointment = await createOrFindAppointment(business_id, user_phone_no);
    const services = await axios.get(`${process.env.API_URL}/api/v1/categories/service?business_id=${business_id}`);
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
    console.log('Error: ', error);
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

const getAndSendListOfDate = async (business_id, staff_id, appointment_id, user_phone_no) => {
  try {
    const appointment = await updateStaff(appointment_id, staff_id);
    const date = await axios.get(`${process.env.API_URL}/api/v1/settings/business/${business_id}/available-dates`);

    const dateData = date?.data?.available_dates.map((date) => ({
      id: `booking-${business_id}-date-${date.date}-staff-${staff_id}-appointment-${appointment._id}`,
      title: date.date,
      description: translationService.getItalianMessage('available_from_to', { 
        from: date.available_from, 
        to: date.available_to 
      }),
    }));

    const data = {
      phone: user_phone_no,
      body: translationService.getItalianMessage('select_date'),
      buttonTitle: translationService.getItalianMessage('date'),
      buttons: dateData,
    };

    await whatsappService.sendList(data);
  } catch (error) {
    console.log('Error: ', error);
  }
}

const getAndSendListOfTime = async (business_id, date, staff_id, appointment_id, user_phone_no) => {
  try { 
    const appointment = await updateDate(appointment_id, date);
    const time = await axios.get(`${process.env.API_URL}/api/v1/settings/business/${business_id}/staff/${staff_id}/available-times/${date}`);
    const timeData = time?.data?.available_times.map((time) => ({
      id: `booking-${business_id}-time-${time.time}-appointment-${appointment._id}`,
      title: time.time,
      description: time.description,
    }));

    const data = {
      phone: user_phone_no,
      body: translationService.getItalianMessage('select_time'),
      buttonTitle: translationService.getItalianMessage('time'),
      buttons: timeData,
    };

    await whatsappService.sendList(data);
  } catch (error) {
    console.log('Error: ', error);
  }
}

const sendAppointmentConfirmation = async (business_id, appointment_id, time, user_phone_no) => {
  try {
    const appointment = await updateTime(appointment_id, time);
    const data = {
      phone: user_phone_no,
      header: {
        type: 'text',
        text: translationService.getItalianMessage('appointment_confirmation'),
      },
      body: translationService.getItalianMessage('appointment_details', {
        service: appointment?.serviceId?.title,
        staff: appointment?.staffId?.name,
        date: appointment?.appointmentDate,
        time: appointment?.appointmentTime
      }),
      footer: translationService.getItalianMessage('appointment'),
      buttons: [
        {
          id: `booking-${business_id}-appointment-${appointment._id}-confirm`,
          title: translationService.getItalianMessage('confirm'),
        },
        {
          id: `booking-${business_id}-appointment-${appointment._id}-cancel`,
          title: translationService.getItalianMessage('cancel'),
        },
      ],
    };

    await whatsappService.sendButton(data);
  } catch (error) {
    console.log('Error: ', error);
  }
}

const confirmAppointment = async (business_id, appointment_id, user_phone_no, status) => {
  try {
    await updateFinalStatus(appointment_id, status);

    if (status === WHATSAPP_CONFIG.APPOINTMENT_STATUS.SCHEDULED) {
      await whatsappService.sendText(
        translationService.getItalianMessage('appointment_scheduled_success'),
        user_phone_no,
      );
    } else if (status === WHATSAPP_CONFIG.APPOINTMENT_STATUS.CANCELLED) {
      await whatsappService.sendText(
        translationService.getItalianMessage('appointment_cancelled_success'),
        user_phone_no,
      );
    }
  } catch (error) {
    console.log('Error: ', error);
  }
}

export default webhookService;
