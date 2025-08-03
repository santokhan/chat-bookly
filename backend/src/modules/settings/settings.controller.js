import Settings from './settings.model.js';

export async function setBusinessSettings(req, res) {
  try {
    const { business_id } = req.params;
    const {
      location,
      ...data
    } = req.body;

    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: 'business_id required',
      });
    }

    // Validate location if provided
    if (location) {
      if (typeof location.latitude !== 'number' || typeof location.longitude !== 'number') {
        return res.status(400).json({
          success: false,
          message: 'latitude and longitude must be numbers',
        });
      }

      if (location.latitude < -90 || location.latitude > 90) {
        return res.status(400).json({
          success: false,
          message: 'latitude must be between -90 and 90',
        });
      }

      if (location.longitude < -180 || location.longitude > 180) {
        return res.status(400).json({
          success: false,
          message: 'longitude must be between -180 and 180',
        });
      }
    }

    let gallery = [];
    if (req.files && req.files.length > 0) {
      gallery = req.files.map(file => `/media/${file.filename}`);
    }

    let updateData = {
      business_id,
      location,
      ...data,
      staff_id: null,
    };

    if (gallery.length > 0) {
      const existing = await Settings.findOne({
        business_id,
        staff_id: null,
      });

      if (
        existing
        && existing.gallery
        && Array.isArray(existing.gallery)
      ) {
        updateData.gallery = [...existing.gallery, ...gallery];
      } else {
        updateData.gallery = gallery;
      }
    }

    const settings = await Settings.findOneAndUpdate(
      {
        business_id,
        staff_id: null,
      },
      updateData,
      {
        upsert: true,
        new: true,
      },
    );

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to set business settings',
      error,
    });
  }
}

export async function setStaffSettings(req, res) {
  try {
    const { staff_id, business_id } = req.params;
    const {
      operational_hours,
      time_slot,
      unavailability_periods,
    } = req.body;

    if (!staff_id || !business_id) {
      return res.status(400).json({
        success: false,
        message: 'staff_id and business_id required',
      });
    }

    const settings = await Settings.findOneAndUpdate(
      {
        staff_id,
        business_id,
      },
      {
        staff_id,
        business_id,
        operational_hours,
        time_slot,
        unavailability_periods,
      },
      {
        upsert: true,
        new: true,
      },
    );

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to set staff settings',
      error,
    });
  }
}

export async function getBusinessSettings(req, res) {
  try {
    const {
      business_id,
    } = req.params;

    const settings = await Settings.findOne({
      business_id,
      staff_id: null,
    });

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get business settings',
      error,
    });
  }
}

export async function getStaffSettings(req, res) {
  try {
    const {
      staff_id,
    } = req.params;

    const settings = await Settings.findOne({
      staff_id,
    });

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get staff settings',
      error,
    });
  }
}

export async function getNextAvailableDates(req, res) {
  try {
    const { business_id } = req.params;

    if (!business_id) {
      return res.status(400).json({
        success: false,
        message: 'business_id required',
      });
    }

    // Get business settings to retrieve operational hours
    // const settings = await Settings.findOne({
    //   business_id,
    //   staff_id: null,
    // });

    const settings = {
      operational_hours: [
        {
          day: 'Monday',
          from: '10:00 AM',
          to: '07:00 PM',
        },
        {
          day: 'Wednesday',
          from: '09:00 AM',
          to: '06:00 PM',
        },
        {
          day: 'Friday',
          from: '11:00 AM',
          to: '08:00 PM',
        },
      ],
    };

    if (!settings || !settings.operational_hours || settings.operational_hours.length === 0) {
      return res.json({
        success: true,
        available_dates: [],
        message: 'No operational hours configured for this business',
      });
    }

    // Create a map of day names to their operational hours
    const dayToHoursMap = {};
    settings.operational_hours.forEach(hour => {
      dayToHoursMap[hour.day.toLowerCase()] = {
        from: hour.from,
        to: hour.to,
      };
    });

    // Get the days that the business operates
    const operationalDays = Object.keys(dayToHoursMap);
    
    if (operationalDays.length === 0) {
      return res.json({
        success: true,
        available_dates: [],
        message: 'No operational days configured',
      });
    }

    // Map day names to day numbers (0 = Sunday, 1 = Monday, etc.)
    const dayNameToNumber = {
      'sunday': 0,
      'monday': 1,
      'tuesday': 2,
      'wednesday': 3,
      'thursday': 4,
      'friday': 5,
      'saturday': 6,
    };

    // Get day numbers for operational days
    const operationalDayNumbers = operationalDays.map(day => dayNameToNumber[day]);

    // Calculate next 7 available dates
    const availableDates = [];
    const today = new Date();
    let currentDate = new Date(today);
    let foundDates = 0;

    // Start from today and look for the next 7 available dates
    while (foundDates < 7) {
      const dayOfWeek = currentDate.getDay();
      
      // Check if this day is operational
      if (operationalDayNumbers.includes(dayOfWeek)) {
        const dayName = Object.keys(dayNameToNumber).find(key => dayNameToNumber[key] === dayOfWeek);
        const hours = dayToHoursMap[dayName];
        
        availableDates.push({
          date: currentDate.toISOString().split('T')[0], // YYYY-MM-DD format
          day: dayName.charAt(0).toUpperCase() + dayName.slice(1), // Capitalized day name
          available_from: hours.from,
          available_to: hours.to,
          day_of_week: dayOfWeek,
        });
        
        foundDates++;
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    res.json({
      success: true,
      available_dates: availableDates,
      total_found: availableDates.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get next available dates',
      error: error.message,
    });
  }
}

export async function getNextAvailableTimes(req, res) {
  try {
    const { business_id, date, staff_id } = req.params;

    if (!business_id || !date) {
      return res.status(400).json({
        success: false,
        message: 'business_id and date required',
      });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD',
      });
    }

    // Check if date is not in the past
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Cannot get available times for past dates',
      });
    }

    // Get business settings
    // const settings = await Settings.findOne({
    //   business_id,
    //   staff_id: null,
    // });

    const settings = {
      operational_hours: [
        {
          day: 'Tuesday',
          from: '10:00 AM',
          to: '07:00 PM',
        },
        {
          day: 'Wednesday',
          from: '09:00 AM',
          to: '06:00 PM',
        },
        {
          day: 'Friday',
          from: '11:00 AM',
          to: '08:00 PM',
        },
      ],
    };

    if (!settings || !settings.operational_hours || settings.operational_hours.length === 0) {
      return res.json({
        success: true,
        available_times: [],
        message: 'No operational hours configured for this business',
      });
    }

    // Get the day of week for the given date
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = dayNames[selectedDate.getDay()];

    // Find operational hours for this day
    const dayHours = settings.operational_hours.find(hour => 
      hour.day.toLowerCase() === dayOfWeek.toLowerCase()
    );

    if (!dayHours) {
      return res.json({
        success: true,
        available_times: [],
        message: `Business is not operational on ${dayOfWeek}`,
      });
    }

    // Import Appointment model
    const Appointment = (await import('../appointment/appointment.model.js')).default;

    // Get existing appointments for this date and staff (if specified)
    const appointmentQuery = {
      businessId: business_id,
      appointmentDate: date,
      status: { $ne: 'cancelled' }
    };

    if (staff_id) {
      appointmentQuery.staffId = staff_id;
    }

    const existingAppointments = await Appointment.find(appointmentQuery);

    // Convert time strings to minutes for easier comparison
    const timeToMinutes = (timeStr) => {
      const [time, period] = timeStr.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let hour24 = hours;
      
      if (period === 'PM' && hours !== 12) hour24 += 12;
      if (period === 'AM' && hours === 12) hour24 = 0;
      
      return hour24 * 60 + minutes;
    };

    const minutesToTime = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const period = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      return `${hour12.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${period}`;
    };

    const startMinutes = timeToMinutes(dayHours.from);
    const endMinutes = timeToMinutes(dayHours.to);
    const timeSlotDuration = settings.time_slot || 30; // Default to 30 minutes if not set

    // Get booked times
    const bookedTimes = existingAppointments.map(apt => {
      const aptTime = apt.appointmentTime;
      if (!aptTime) return null;
      return timeToMinutes(aptTime);
    }).filter(time => time !== null);

    // Generate available time slots
    const availableTimes = [];
    let currentMinutes = startMinutes;

    while (currentMinutes < endMinutes && availableTimes.length < 10) {
      // Check if this time slot is available
      const isBooked = bookedTimes.some(bookedTime => 
        Math.abs(bookedTime - currentMinutes) < timeSlotDuration
      );

      if (!isBooked) {
        availableTimes.push({
          time: minutesToTime(currentMinutes),
          time_24h: `${Math.floor(currentMinutes / 60).toString().padStart(2, '0')}:${(currentMinutes % 60).toString().padStart(2, '0')}`,
          minutes: currentMinutes
        });
      }

      currentMinutes += timeSlotDuration;
    }

    res.json({
      success: true,
      available_times: availableTimes,
      total_available: availableTimes.length,
      operational_hours: {
        from: dayHours.from,
        to: dayHours.to
      },
      time_slot_duration: timeSlotDuration,
      date: date,
      day: dayOfWeek
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get next available times',
      error: error.message,
    });
  }
}
