import axios from 'axios';
import whatsappService from './whatsapp.service.js';
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
        case 'text':
          if (!user || user === null || user === undefined) {
            try {
              const res = await whatsappService.sendWhatsappFlow(
                user_phone_no,
                'Please Sign Up',
                'Welcome to our app, we are looking forward to serve you better. We are here to help you in all the difficulties you are facing in your journey. First of all we need to know your name and email, for that please fill up the form provided below:',
                'Sign Up',
                '1447863196403524',
              );

              console.log('Response: ', res);
            } catch (error) {
              console.log('Error: ', error);
            }
          } else if ((reqData?.messages?.[0]?.text?.body).includes('book')) {
            getAndSendListOfService(business_id, user_phone_no);
          } else if ((reqData?.messages?.[0]?.text?.body).includes('reschedule')) {
            getAndSendListOfAppointment(business_id, user_phone_no, 'reschedule');
          } else if ((reqData?.messages?.[0]?.text?.body).includes('cancel')) {
            getAndSendListOfAppointment(business_id, user_phone_no, 'cancel');
          }
          break;
        case 'interactive':
          switch (reqData.messages[0].interactive.type) {
            case "button_reply":
              const buttonReply = reqData.messages[0].interactive.button_reply.id.split('-');

              if (buttonReply[4] === 'confirm') {
                confirmAppointment(buttonReply[1], buttonReply[3], user_phone_no, 'scheduled');
              } else if (buttonReply[4] === 'cancel') {
                confirmAppointment(buttonReply[1], buttonReply[3], user_phone_no, 'cancelled');
              }
              break;
            case "list_reply":
              const data = reqData.messages[0].interactive.list_reply.id.split('-');

              if (data[0] === 'reschedule') {
                console.log('Reschedule', data);
                getAndSendListOfDate(data[1], data[5], data[3], user_phone_no);
              } else if (data[0] === 'cancel') {
                console.log('Cancel', data);
                confirmAppointment(data[1], data[3], user_phone_no, 'cancelled');
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
            case "nfm_reply":
              const flowData = await JSON.parse(
                reqData.messages[0].interactive.nfm_reply.response_json
              );

              if (flowData.name && flowData.email) {
                console.log('Flow Data: ', flowData, user_phone_no);

                const newUser = await registerUser({
                  name: flowData.name,
                  email: flowData.email,
                  phone_number: user_phone_no,
                  password: flowData.password,
                  role: 'user',
                  is_verified: true,
                });

                console.log('New User: ', newUser);
                if (newUser.success) {
                  await whatsappService.sendText(
                    'User registered successfully',
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
      body: `Please select the appointment you want to ${type}`,
      buttonTitle: 'Appointments',
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
      description: `This service will take ${service.service_time} minutes`,
    }));

    const data = {
      phone: user_phone_no,
      body: 'Please select the service you want to book',
      buttonTitle: 'Services',
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
      body: 'Please select the staff you want to book',
      buttonTitle: 'Staff',
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
      description: `Available from ${date.available_from} to ${date.available_to}`,
    }));

    const data = {
      phone: user_phone_no,
      body: 'Please select the date you want to book',
      buttonTitle: 'Date',
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
      body: 'Please select the time you want to book',
      buttonTitle: 'Time',
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
        text: 'Appointment Confirmation',
      },
      body: `Service: ${appointment?.serviceId?.title}\nStaff: ${appointment?.staffId?.name}\nDate: ${appointment?.appointmentDate}\nTime: ${appointment?.appointmentTime}`,
      footer: 'Appointment',
      buttons: [
        {
          id: `booking-${business_id}-appointment-${appointment._id}-confirm`,
          title: 'Confirm',
        },
        {
          id: `booking-${business_id}-appointment-${appointment._id}-cancel`,
          title: 'Cancel',
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

    if (status === 'scheduled') {
      await whatsappService.sendText(
        'Appointment scheduled successfully',
        user_phone_no,
      );
    } else if (status === 'cancelled') {
      await whatsappService.sendText(
        'Appointment cancelled successfully',
        user_phone_no,
      );
    }
  } catch (error) {
    console.log('Error: ', error);
  }
}

export default webhookService;
