<script setup>
import { computed, nextTick, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import { blankEvent, useCalendar } from "@/views/apps/calendar/useCalendar";
import BusinessLayout from "@/layouts/components/BusinessLayout.vue";
import { useCalendarStore } from "@/views/apps/calendar/useCalendarStore";
import { ref } from 'vue'
import AddBookingModal from '@/views/apps/calendar/AddBookingModal.vue'
import SlotBookingModal from "@/views/apps/calendar/SlotBookingModal.vue";
import CalendarEventHandler from "@/views/apps/calendar/CalendarEventHandler.vue";

// Components

const store = useCalendarStore();

// 👉 Event
const event = ref(structuredClone(blankEvent));
const isEventHandlerSidebarActive = ref(false);
const selectAll = ref(false);
const teamButtonLabel = ref('Custom')

watch(isEventHandlerSidebarActive, (val) => {
  if (!val) event.value = structuredClone(blankEvent);
});

const { isLeftSidebarOpen } = useResponsiveLeftSidebar();

// 👉 useCalendar
const {
  refCalendar,
  calendarOptions: baseCalendarOptions,
  addEvent,
  updateEvent,
  removeEvent,
  jumpToDate,
  refetchEvents,
} = useCalendar(event, isEventHandlerSidebarActive, isLeftSidebarOpen);

// Reload calendar function
const reloadCalendar = async () => {
  isLoading.value = true;
  try {
    await refetchEvents();
    // Small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    console.error("Error reloading calendar:", error);
  } finally {
    isLoading.value = false;
  }
};

// 👉 Custom calendar options with no header toolbar
const calendarOptions = computed(() => ({
  ...baseCalendarOptions,
  headerToolbar: false, // Remove default header toolbar
  initialView: selectedView.value, // Use the selected view
  firstDay: 1,
  views: {
    timeGridDay: {
      dayHeaderFormat: { weekday: "long" },
      allDaySlot: false,
      headerToolbar: false,
    },
    timeGridThreeDay: {
      type: "timeGrid",
      duration: { days: 3 },
      buttonText: "3 day",
      dayHeaderFormat: { day: "numeric", weekday: "long" },
      allDaySlot: false, // Remove all-day slot
      headerToolbar: false,
    },
    timeGridWeek: {
      dayHeaderFormat: { day: "numeric", weekday: "short" },
      allDaySlot: false,
      headerToolbar: false,
      firstDay: 1
    },
    dayGridMonth: {
      dayHeaderFormat: { weekday: "long" },
      allDaySlot: false,
      headerToolbar: false,
    },
  },
  eventContent: function (arg) {
    const status = arg.event.extendedProps.status;
    const tickHtml = `
  <span style="
    float: right;
    background-color: #28a745;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 6px;
  ">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" stroke-width="3" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 12l5 5l10 -10" />
    </svg>
  </span>
`;

    // Compose HTML with time on top, title below, tick on right if completed
    let html = `
    <div >
      <div style="flex-grow: 1;">
        <div style=" color:black; font-weight: 600;"> <span>${new Date(arg.event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
            ${new Date(arg.event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
            <div style="display: flex; justify-content: space-between; align-items: center;  margin-top:4px;">
               <div style=" color:#6c757d;">${arg.event.title}</div>
        ${status === 'completed' ? tickHtml : ''}
              </div>
       
      </div>
    </div>
  `;

    return { html };
  },
  eventMouseEnter(info) {
    const { status, client, teamMemeber, service, blockedTime } = info.event.extendedProps;

    // Status color mapping
    const statusColors = {
      completed: "#28a745",
      booked: "#007bff",
      blocked: "#212529",
      "blocked-slot": "#212529"
    };

    const headerColor = statusColors[status] || "#6c757d";

    // Build tooltip HTML based on status
    let bodyContent = "";

    if (status === "completed" || status === "booked") {
      bodyContent = `
      <div style="font-size:11px; color:#6c757d; margin-bottom:4px;">CLIENT</div>
      <div style="display:flex; align-items:center; gap:8px;">
        <img src="${client.avatar}" alt="${client.name}" style="width:28px; height:28px; border-radius:50%;">
        <div>
          <div style="font-size:13px; color:black; font-weight:500;">${client.name}</div>
          <div style="font-size:11px; color:#6c757d;">+39 351 195 5891</div>
        </div>
      </div>

      <div style="font-size:11px; color:gray; margin:10px 0 4px;">TEAM MEMBER</div>
      <div style="display:flex; align-items:center; gap:8px;">
        <img src="${teamMemeber.avatar}" alt="${teamMemeber.name}" style="width:28px; height:28px; border-radius:50%;">
        <div style="font-size:13px; color:black; font-weight:500;">${teamMemeber.name}</div>
      </div>

      <div style="font-size:11px; color:gray; margin:10px 0 4px;">SERVICE</div>
      <div style="font-size:13px; color:black; font-weight:500;">
        ${service.type} • ${service.duration}
      </div>
    `;
    }
    else if (status === "blocked" || status === "blocked-slot") {
      bodyContent = `
      <div style="font-size:11px; color:#6c757d; background-color:#ffff; margin-bottom:4px;">TEAM MEMBER</div>
      <div style="display:flex; align-items:center; gap:8px;">
        <img src="${teamMemeber.avatar}" alt="${teamMemeber.name}" style="width:28px; height:28px; border-radius:50%;">
        <div style="font-size:13px; color:black; font-weight:500;">${teamMemeber.name}</div>
      </div>

      <div style="font-size:11px; color:gray; margin:10px 0 4px;">BLOCKED TIME</div>
      <div style="font-size:13px; color:black; font-weight:500;">
        ${blockedTime || "N/A"}
      </div>
    `;
    }

    // Tooltip container
    const tooltip = document.createElement("div");
    tooltip.className = "event-tooltip";
    tooltip.style.position = "static";
    tooltip.style.top = "100px";
    tooltip.style.left = "0px";
    tooltip.style.padding = "0";
    tooltip.style.margin = "0"
    tooltip.style.background = "#ffff";
    tooltip.style.border = "1px solid #ccc";
    tooltip.style.borderRadius = "8px";
    tooltip.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
    tooltip.style.width = "240px";
    tooltip.style.fontFamily = "sans-serif";
    tooltip.style.overflow = "hidden";
    tooltip.style.zIndex = "99";
    tooltip.innerHTML = `
    <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      background:${headerColor};
      color:#fff;
      padding:6px 10px;
      font-size:13px;
      font-weight:bold;
    ">
      <span>${new Date(info.event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
            ${new Date(info.event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      <span style="text-transform:uppercase;">${status.replace("-", " ")}</span>
    </div>
    <div style="padding:10px;">${bodyContent}</div>
  `;
    document.body.appendChild(tooltip);
    const tooltipRect = tooltip.getBoundingClientRect();
    const eventRect = info.el.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let top = eventRect.bottom;
    let left = eventRect.left;
    if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width - 70;
    }
    if (top + tooltipRect.height > viewportHeight) {
      top = eventRect.top - tooltipRect.height;
    }

    tooltip.style.position = "fixed";
    tooltip.style.top = `${top}px`;
    tooltip.style.zIndex = "9999";
    tooltip.style.left = `${left}px`;
    // const el = document.querySelector('.fc-timegrid-slot-label');
    // if (el) {
    //   el.style.setProperty('width', '200px', 'important');
    //   el.style.setProperty('min-width', '200px', 'important');
    // }

  },
  eventMouseLeave(info) {
    const tooltip = document.body.querySelector(".event-tooltip");
    if (tooltip) tooltip.remove();
  },
  allDaySlot: false,
  slotMinTime: "00:00:00",
  slotMaxTime: "24:00:00",
  // datesSet(info) {
  //   if (!calendarApiRef.value) {
  //     calendarApiRef.value = info.view.calendar;
  //   }

  //   const headerEl = document.querySelector('.fc-col-header');
  //   if (!headerEl) return;

  //   // Prevent multiple button inserts
  //   // if (document.querySelector('.custom-nav-buttons')) return;

  //   const btnWrapper = document.createElement('div');
  //   btnWrapper.className = 'custom-nav-buttons';
  //   btnWrapper.style.display = 'inline-flex';
  //   btnWrapper.style.alignItems = 'center';
  //   btnWrapper.style.marginRight = '10px';

  //   // Create Previous Button
  //   const prevBtn = document.createElement('button');
  //   prevBtn.textContent = 'Prev';
  //   prevBtn.style.marginRight = '6px';
  //   prevBtn.style.padding = '4px 10px';
  //   prevBtn.style.cursor = 'pointer';
  //   // prevBtn.onclick = () => {
  //   //   handlePrevPeriod();
  //   // };

  //   // Create Next Button
  //   const nextBtn = document.createElement('button');
  //   nextBtn.textContent = 'Next';
  //   nextBtn.style.padding = '4px 10px';
  //   nextBtn.style.cursor = 'pointer';
  //   // nextBtn.onclick = () => {
  //   //   handleNextPeriod();
  //   // };

  //   btnWrapper.appendChild(prevBtn);
  //   btnWrapper.appendChild(nextBtn);

  //   // Insert buttons before the dates header
  //   headerEl.parentNode.insertBefore(btnWrapper, headerEl);
  // },
}));

// 👉 Custom calendar controls
const selectedView = ref("timeGridWeek");
const selectedEmployees = ref([
  "john doe",
  // "jane smith",
  // "mike johnson",
  // "sarah wilson",
  // "david brown",
]);
const isTeamDropdownOpen = ref(false);
// const dateRange = ref({
//   start: new Date().toISOString().split("T")[0],
//   end: new Date().toISOString().split("T")[0],
// });
const getCurrentWeekRange = () => {
  const now = new Date();
  const day = now.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return {
    start: monday.toISOString().split("T")[0],
    end: sunday.toISOString().split("T")[0],
  };
};
const dateRange = ref(getCurrentWeekRange());
const isDatePickerOpen = ref(false);
const isLoading = ref(false);

// Date Range Picker Logic
const tempStartDate = ref(null);
const tempEndDate = ref(null);
const currentMonth = ref(new Date());
const currentMonth2 = ref(
  new Date(new Date().setMonth(new Date().getMonth() + 1))
);

// Week days
const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Computed properties for calendar
const currentMonthYear = computed(() => {
  return currentMonth.value.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
});

const currentMonthYear2 = computed(() => {
  return currentMonth2.value.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
});

const calendarDays = computed(() => {
  return generateCalendarDays(currentMonth.value);
});

const calendarDays2 = computed(() => {
  return generateCalendarDays(currentMonth2.value);
});
const toLocalDateString = (date) => {
  // returns yyyy-mm-dd in local time, no timezone shift
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


// Generate calendar days
const generateCalendarDays = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days = [];
  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    days.push({
      date: toLocalDateString(currentDate),
      day: currentDate.getDate(),
      currentMonth: currentDate.getMonth() === month,
    });
  }
  return days;
};

// Date selection logic
const selectDate = (date) => {
  if (!tempStartDate.value || (tempStartDate.value && tempEndDate.value)) {
    // First click or reset
    tempStartDate.value = date;
    tempEndDate.value = null;
  } else {
    // Second click
    tempEndDate.value = date;
    // Ensure start is before end
    if (new Date(tempStartDate.value) > new Date(tempEndDate.value)) {
      const temp = tempStartDate.value;
      tempStartDate.value = tempEndDate.value;
      tempEndDate.value = temp;
    }
  }
};

const isDateSelected = (date) => {
  return tempStartDate.value === date || tempEndDate.value === date;
};

const isDateInRange = (date) => {
  if (!tempStartDate.value || !tempEndDate.value) return false;
  const currentDate = new Date(date);
  const startDate = new Date(tempStartDate.value);
  const endDate = new Date(tempEndDate.value);
  return currentDate > startDate && currentDate < endDate;
};

const isStartDate = (date) => {
  return tempStartDate.value === date;
};

const isEndDate = (date) => {
  return tempEndDate.value === date;
};

// Month navigation
const previousMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.setMonth(currentMonth.value.getMonth() - 1)
  );
};

const nextMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.setMonth(currentMonth.value.getMonth() + 1)
  );
};

const previousMonth2 = () => {
  currentMonth2.value = new Date(
    currentMonth2.value.setMonth(currentMonth2.value.getMonth() - 1)
  );
};

const nextMonth2 = () => {
  currentMonth2.value = new Date(
    currentMonth2.value.setMonth(currentMonth2.value.getMonth() + 1)
  );
};

const applyDateRange = () => {
  if (tempStartDate.value && tempEndDate.value) {
    dateRange.value = {
      start: tempStartDate.value,
      end: tempEndDate.value,
    };
    isDatePickerOpen.value = false;
    handleCalendarDateRangeChange();
  }
};

const cancelDateRange = () => {
  isDatePickerOpen.value = false;
  tempStartDate.value = null;
  tempEndDate.value = null;
};

const openDateRangePicker = () => {
  // Initialize temp date range with current date range
  if (dateRange.value.start && dateRange.value.end) {
    tempStartDate.value = dateRange.value.start;
    tempEndDate.value = dateRange.value.end;
  } else {
    tempStartDate.value = null;
    tempEndDate.value = null;
  }
  isDatePickerOpen.value = true;
};

// Employee options for team selection
const employeeOptions = [
  {
    title: "All Team",
    value: "all team",
    avatar: "/images/avatars/avatar-1.png",
  },
  {
    title: "John Doe",
    value: "john doe",
    avatar: "/images/avatars/avatar-1.png",
  },
  {
    title: "Jane Smith",
    value: "jane smith",
    avatar: "/images/avatars/avatar-2.png",
  },
  {
    title: "Mike Johnson",
    value: "mike johnson",
    avatar: "/images/avatars/avatar-1.png",
  },
  {
    title: "Sarah Wilson",
    value: "sarah wilson",
    avatar: "/images/avatars/avatar-2.png",
  },
  {
    title: "David Brown",
    value: "david brown",
    avatar: "/images/avatars/avatar-1.png",
  },
];
// View options with 3-day view
const viewOptions = [
  // { title: "Day", value: "timeGridDay" },
  // { title: "3 Day", value: "timeGridThreeDay" },
  { title: "Week", value: "timeGridWeek" },
  // { title: "Month", value: "dayGridMonth" },
];

// Format date range for display
const formattedDateRange = computed(() => {
  const start = new Date(dateRange.value.start);
  const end = new Date(dateRange.value.end);

  if (start.getTime() === end.getTime()) {
    return start.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const startFormatted = start.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  const endFormatted = end.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return `${startFormatted} - ${endFormatted}`;
});

// 👉 Methods
const goToToday = () => {
  const calendarApi = refCalendar.value?.getApi();
  if (calendarApi) {
    calendarApi.today();
    const today = new Date();
    dateRange.value = {
      start: today.toISOString().split("T")[0],
      end: today.toISOString().split("T")[0],
    };
  }
};

const handleViewChange = (newView) => {
  selectedView.value = newView;
  const calendarApi = refCalendar.value?.getApi();
  if (calendarApi) {
    calendarApi.changeView(newView);
  }
};

const handleCalendarDateRangeChange = () => {
  const calendarApi = refCalendar.value?.getApi();
  if (calendarApi && dateRange.value.start) {
    calendarApi.gotoDate(new Date(dateRange.value.start));
  }
};


const handlePrevPeriod = () => {
  const calendarApi = refCalendar.value?.getApi();
  if (calendarApi) {
    calendarApi.prev();
    updateDateRangeFromCalendar();
  }
};

const handleNextPeriod = () => {
  const calendarApi = refCalendar.value?.getApi();
  if (calendarApi) {
    calendarApi.next();
    updateDateRangeFromCalendar();
  }
};

const updateDateRangeFromCalendar = () => {
  const calendarApi = refCalendar.value?.getApi();
  if (calendarApi) {
    const currentDate = calendarApi.getDate();
    const view = calendarApi.view;

    if (view.type === "timeGridDay") {
      const start = new Date(currentDate);
      dateRange.value = {
        start: start.toISOString().split("T")[0],
        end: start.toISOString().split("T")[0],
      };
    } else if (
      view.type === "timeGridWeek" ||
      view.type === "timeGridThreeDay"
    ) {
      const start = new Date(view.currentStart);
      const end = new Date(view.currentEnd);
      end.setDate(end.getDate() - 1);
      dateRange.value = {
        start: toLocalDateString(start),
        end: toLocalDateString(end),
      };
    } else if (view.type === "dayGridMonth") {
      const start = new Date(view.currentStart);
      const end = new Date(view.currentEnd);
      end.setDate(end.getDate() - 1);
      dateRange.value = {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
      };
    }
  }
};

const handleReload = () => {
  reloadCalendar();
};

const handleAddEvent = () => {
  isEventHandlerSidebarActive.value = true;
};

const handleTeamChange = () => {
  // Handle team selection changes
  // This can be used to filter events or update the employee column
  console.log("Selected teams:", selectedEmployees.value);
};

// const selectAllEmployees = () => {
//   const allSelected =
//     selectedEmployees.value.length === employeeOptions.length - 1;

//   if (allSelected) {
//     selectedEmployees.value = [];
//     selectAll.value = false;
//   } else {
//     selectedEmployees.value = employeeOptions
//       .filter((emp) => emp.value !== "all team")
//       .map((emp) => emp.value);
//     selectAll.value = true;
//   }
// };
const selectAllEmployees = () => {
  if (selectAll.value) {
    selectedEmployees.value = [];
    selectAll.value = false;
  } else {
    selectedEmployees.value = employeeOptions.map(emp => emp.value);
    selectAll.value = true;
  }
};

const removeEmployee = (empVal) => {
  selectedEmployees.value = selectedEmployees.value.filter(val => val !== empVal)
}

watch(selectedEmployees, (newVal) => {
  const allEmployeesExceptAllTeam = employeeOptions
    .filter(emp => emp.value !== "all team")
    .map(emp => emp.value);

  // Check if all individual employees are selected
  const allSelected = allEmployeesExceptAllTeam.every(empVal => newVal.includes(empVal));

  if (allSelected) {
    // If all individual employees selected, check 'all team'
    if (!newVal.includes("all team")) {
      selectedEmployees.value = [...newVal, "all team"];
    }
    selectAll.value = true;
    teamButtonLabel.value = 'All Team Members'
  } else {
    // If not all selected, uncheck 'all team'
    if (newVal.includes("all team")) {
      selectedEmployees.value = newVal.filter(val => val !== "all team");
    }
    selectAll.value = false;
    teamButtonLabel.value = 'Custom'
  }
});



const clearAllEmployees = () => {
  // Clear all employees
  selectedEmployees.value = [];
};

// SECTION Sidebar

// 👉 Check all
const checkAll = computed({
  /*GET: Return boolean `true` => if length of options matches length of selected filters => Length matches when all events are selected
SET: If value is `true` => then add all available options in selected filters => Select All
Else if => all filters are selected (by checking length of both array) => Empty Selected array  => Deselect All
*/
  get: () => store.selectedCalendars.length === store.availableCalendars.length,
  set: (val) => {
    if (val)
      store.selectedCalendars = store.availableCalendars.map((i) => i.label);
    else if (store.selectedCalendars.length === store.availableCalendars.length)
      store.selectedCalendars = [];
  },
});

const jumpToDateFn = (date) => {
  jumpToDate(date);
};

// Watch for calendar view changes to update date range
watch(selectedView, () => {
  nextTick(() => {
    updateDateRangeFromCalendar();
  });
});

// Watch for calendar navigation to update date range
onMounted(() => {
  nextTick(() => {
    const calendarApi = refCalendar.value?.getApi();
    if (calendarApi) {
      calendarApi.on("datesSet", updateDateRangeFromCalendar);
    }
  });
});

// Changes

const isAppointmentModalOpen = ref(false)

// const isAppointmentModalOpen = ref(false);

const openAppointmentModal = () => {
  isAppointmentModalOpen.value = true;
};


const isSlotBookingModalOpen = ref(false);
const handleBookedSlot = () => {
  isSlotBookingModalOpen.value = true;
};


</script>

<template>
  <BusinessLayout>
    <!-- Custom Calendar Header -->
    <VMenu location="bottom end" offset-y>
      <template #activator="{ props }">
        <div class="d-flex flex-wrap justify-end justify-md-space-between align-start w-100">
          <!-- v style="
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: start;
            width: 100%;
          " -->

          <!-- Left button -->
          <div>
            <div class="d-flex align-center justify-md-space-between mb-4 calendar-custom-header">
              <div class="d-flex flex-wrap align-center gap-4">
                <div class="refresh-view-group" style="
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            border-radius: 100px;
            overflow: hidden;
            height: 36px;
          ">
                  <VSelect v-model="selectedView" :items="viewOptions" density="compact" variant="plain" hide-details
                    style="min-width: 50px; background-color: white; height: 100%;" menu-icon="tabler-chevron-down"
                    @update:model-value="handleViewChange" class="custom-view-select">
                    <template #selection="{ item }">
                      <div style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  width: 100%;
                ">
                        <span style="font-size: 14px">{{ item?.title || item }}</span>
                      </div>
                    </template>
                  </VSelect>
                </div>
                <!-- Date range selector -->
                <div class="date-range-group" style="
                    display: flex;
                    align-items: center;
                    border: 1px solid #ccc;
                    border-radius: 20px;
                    overflow: hidden;
                    height: 36px;
                    background-color: white;
                  ">
                  <VBtn icon="tabler-chevron-left" variant="text" size="small" style="
                      border-radius: 0;
                      border: none;
                      /* border-right: 1px solid #ccc; */
                      min-width: 36px;
                      height: 100%;
                      color: #666;
                    " @click="handlePrevPeriod" />

                  <VBtn variant="outlined" style="
                     border-radius: 0;
                      border: none;
                      height: 100%;
                      color: #666;
                      padding-left: 10px;
                      padding-right: 10px;
                    " @click="openDateRangePicker">
                    {{ formattedDateRange }}
                  </VBtn>

                  <VBtn icon="tabler-chevron-right" variant="text" size="small" style="
                      border-radius: 0;
                      border: none;
                      /* border-left: 1px solid #ccc; */
                      min-width: 36px;
                      height: 100%;
                      color: #666;
                    " @click="handleNextPeriod" />
                </div>

                <!-- Team filter -->
                <div style="display: flex; align-items: center; gap: 8px; ">
                  <div>
                    <VMenu v-model="isTeamDropdownOpen" :close-on-content-click="false">
                      <template #activator="{ props }">

                        <!-- <VBtn v-bind="props" variant="outlined" class="icon-button1"
                          style="background-color: white;display: flex;justify-content: space-between;"
                          prepend-icon="tabler-user">

                          {{ teamButtonLabel }}
                          <VIcon size="15" :class="{ 'rotate-180': isTeamDropdownOpen }" style="margin-left: 10px;"
                            icon="tabler-chevron-down" />
                        </VBtn> -->
                        <VBtn v-bind="props" variant="outlined" class="icon-button1"
                          style="background-color: white; display: flex; justify-content: space-between;">

                          <template #prepend>
                            <!-- <VIcon size="20" icon="tabler-user" /> -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                              fill="none">
                              <path
                                d="M16 17.5H14.5V16C14.5 15.4033 14.2629 14.831 13.841 14.409C13.419 13.9871 12.8467 13.75 12.25 13.75H7.75C7.15326 13.75 6.58097 13.9871 6.15901 14.409C5.73705 14.831 5.5 15.4033 5.5 16V17.5H4V16C4 15.0054 4.39509 14.0516 5.09835 13.3483C5.80161 12.6451 6.75544 12.25 7.75 12.25H12.25C13.2446 12.25 14.1984 12.6451 14.9017 13.3483C15.6049 14.0516 16 15.0054 16 16V17.5ZM10 10.75C9.40905 10.75 8.82389 10.6336 8.27792 10.4075C7.73196 10.1813 7.23588 9.84984 6.81802 9.43198C6.40016 9.01412 6.06869 8.51804 5.84254 7.97208C5.6164 7.42611 5.5 6.84095 5.5 6.25C5.5 5.65905 5.6164 5.07389 5.84254 4.52792C6.06869 3.98196 6.40016 3.48588 6.81802 3.06802C7.23588 2.65016 7.73196 2.31869 8.27792 2.09254C8.82389 1.8664 9.40905 1.75 10 1.75C11.1935 1.75 12.3381 2.22411 13.182 3.06802C14.0259 3.91193 14.5 5.05653 14.5 6.25C14.5 7.44347 14.0259 8.58807 13.182 9.43198C12.3381 10.2759 11.1935 10.75 10 10.75ZM10 9.25C10.7956 9.25 11.5587 8.93393 12.1213 8.37132C12.6839 7.80871 13 7.04565 13 6.25C13 5.45435 12.6839 4.69129 12.1213 4.12868C11.5587 3.56607 10.7956 3.25 10 3.25C9.20435 3.25 8.44129 3.56607 7.87868 4.12868C7.31607 4.69129 7 5.45435 7 6.25C7 7.04565 7.31607 7.80871 7.87868 8.37132C8.44129 8.93393 9.20435 9.25 10 9.25Z"
                                fill="#99A0AE" />
                            </svg>
                          </template>

                          {{ teamButtonLabel }}

                          <VIcon size="15" :class="{ 'rotate-180': isTeamDropdownOpen }" style="margin-left: 10px;"
                            icon="tabler-chevron-down" />
                        </VBtn>
                      </template>

                      <VCard min-width="300" class="mt-1" style="border-radius: 14px !important">
                        <VCardTitle class="text-h6 pt-4">
                          <div class="d-flex align-center justify-space-between">
                            <VCheckbox v-model="selectAll" label="All Team Members" class="checkbox-label-space"
                              @click="selectAllEmployees" color="primary" hide-details density="compact"
                              style="font-weight: 500;" />
                          </div>
                        </VCardTitle>
                        <VCardText style="padding: 0 16px; ">
                          <div class="d-flex flex-column gap-2 pb-4 card-row">
                            <VCheckbox v-for="employee in employeeOptions.filter(
                              (emp) => emp.value !== 'all team'
                            )" :key="employee.value" v-model="selectedEmployees" :value="employee.value"
                              density="compact">
                              <template #label>
                                <div class="d-flex align-center justify-space-between w-100">
                                  <div class="d-flex align-center gap-2 ms-2">
                                    <VAvatar :image="employee.avatar" size="24" />
                                    <span>{{ employee.title }}</span>
                                  </div>
                                  <VIcon v-if="selectedEmployees.includes(employee.value)" icon="tabler-check" size="17"
                                    color="secondary" class="position-absolute"
                                    style="right: 8px; top: 50%; transform: translateY(-50%);" />
                                </div>
                              </template>
                            </VCheckbox>
                          </div>
                        </VCardText>
                      </VCard>
                    </VMenu>
                  </div>

                </div>
                <div style="display: flex; flex-wrap:wrap ;  gap: 6px;">
                  <template v-for="empVal in selectedEmployees.filter(val => val !== 'all team')" :key="empVal">
                    <VChip small class="d-flex bg-white align-center custom-chip">
                      <VAvatar :image="employeeOptions.find(e => e.value === empVal)?.avatar" size="16" class="me-2" />
                      {{employeeOptions.find(e => e.value === empVal)?.title}}
                      <VIcon icon="tabler-x" size="14" class="chip-close" @click.stop="removeEmployee(empVal)" />
                    </VChip>
                  </template>
                </div>
              </div>

            </div>
          </div>

          <!-- Right button -->
          <VBtn class="add-btn" v-bind="props" append-icon="tabler-chevron-down" color="primary"
            style="border-radius: 8px; padding-left: 15px; padding-right: 15px; font-weight: 300; margin-bottom: 0.5rem">
            Add
          </VBtn>
          <!-- <VBtn
              append-icon="tabler-chevron-down"
              @click="handleAddEvent"
            >
              Add
            </VBtn> -->
        </div>
      </template>

      <VList style="border-radius: 15px !important; margin-top: 2px !important;">
        <VListItem @click="openAppointmentModal"
          style="padding-top: 3px !important; padding-bottom: 3px !important; padding-left: 3px !important; border-radius: 10px !important;"
          class="custom-list">
          <VListItemTitle class="d-flex align-center gap-2 ps-1 pe-1 " style="font-weight: 500 !important;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 5h16a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1H4a1 1 0 0 1 -1-1V6a1 1 0 0 1 1-1z" />
              <path d="M16 3v4" />
              <path d="M8 3v4" />
              <path d="M4 11h16" />
            </svg>
            Book an appointment
          </VListItemTitle>
        </VListItem>
        <VListItem @click="handleBookedSlot"
          style="padding-top: 3px !important; padding-bottom: 3px !important; padding-left: 3px !important; border-radius: 10px !important; ">
          <VListItemTitle class="d-flex align-center gap-2 ps-1 pe-1" style="font-weight: 500 !important;">
            <!-- Your exact SVG icon -->
            <svg xmlns="http://www.w3.org/2000/svg" lass="icon icon-tabler icon-tabler-calendar" width="20" height="20"
              viewBox="0 0 20 20" fill="none">
              <path
                d="M8.25 4.5V3H6.75V4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V17.25C3 17.6642 3.33579 18 3.75 18H17.25C17.6642 18 18 17.6642 18 17.25V5.25C18 4.83579 17.6642 4.5 17.25 4.5H14.25V3H12.75V4.5H8.25ZM4.5 9.75H16.5V16.5H4.5V9.75ZM4.5 6H6.75V6.75H8.25V6H12.75V6.75H14.25V6H16.5V8.25H4.5V6ZM8.90897 10.4733L10.5 12.0644L12.0909 10.4733L13.1516 11.5339L11.5606 13.1251L13.1516 14.7159L12.091 15.7766L10.5 14.1857L8.90891 15.7766L7.84832 14.7158L9.43927 13.1251L7.84827 11.5339L8.90897 10.4733Z"
                fill="#525866" />
            </svg>
            Blocked slot
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <VCard>
      <!-- <VCard title="Appointments - Calendar"> -->
      <VCardText class="pa-0">
        <!-- Date Range Picker Dialog -->
        <VDialog v-model="isDatePickerOpen" max-width="600">
          <VCard>
            <VCardText class="pa-0">
              <div class="date-range-picker">
                <div class="calendar-container">
                  <div class="calendar-section">
                    <div class="calendar-header">
                      <VBtn icon="tabler-chevron-left" variant="text" size="small" @click="previousMonth" />
                      <span class="calendar-title">{{ currentMonthYear }}</span>
                      <VBtn icon="tabler-chevron-right" variant="text" size="small" @click="nextMonth" />
                    </div>
                    <div class="calendar-grid">
                      <div class="calendar-weekdays">
                        <div v-for="day in weekDays" :key="day" class="weekday">
                          {{ day }}
                        </div>
                      </div>
                      <div class="calendar-days">
                        <div v-for="date in calendarDays" :key="date.date" class="calendar-day" :class="{
                          'other-month': !date.currentMonth,
                          selected: isDateSelected(date.date),
                          'in-range': isDateInRange(date.date),
                          'start-date': isStartDate(date.date),
                          'end-date': isEndDate(date.date),
                        }" @click="selectDate(date.date)">
                          {{ date.day }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="calendar-section">
                    <div class="calendar-header">
                      <VBtn icon="tabler-chevron-left" variant="text" size="small" @click="previousMonth2" />
                      <span class="calendar-title">{{
                        currentMonthYear2
                      }}</span>
                      <VBtn icon="tabler-chevron-right" variant="text" size="small" @click="nextMonth2" />
                    </div>
                    <div class="calendar-grid">
                      <div class="calendar-weekdays">
                        <div v-for="day in weekDays" :key="day" class="weekday">
                          {{ day }}
                        </div>
                      </div>
                      <div class="calendar-days">
                        <div v-for="date in calendarDays2" :key="date.date" class="calendar-day" :class="{
                          'other-month': !date.currentMonth,
                          selected: isDateSelected(date.date),
                          'in-range': isDateInRange(date.date),
                          'start-date': isStartDate(date.date),
                          'end-date': isEndDate(date.date),
                        }" @click="selectDate(date.date)">
                          {{ date.day }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </VCardText>
            <VCardActions class="pa-4">
              <VSpacer />
              <VBtn variant="text" @click="cancelDateRange"> Cancel </VBtn>
              <VBtn color="primary" @click="applyDateRange" :disabled="!tempStartDate || !tempEndDate">
                Apply
              </VBtn>
            </VCardActions>
          </VCard>
        </VDialog>

        <!-- `z-index: 0` Allows overlapping vertical nav on calendar -->
        <VLayout style="z-index: 0">
          <VMain>
            <VCard flat>
              <!-- Custom Calendar with Employee Column -->
              <div v-if="
                selectedView === 'timeGridWeek' ||
                selectedView === 'timeGridThreeDay'
              " class="calendar-with-employee-column">
                <!-- Employee Column -->
                <div class="employee-column-calendar">
                  <div class="employee-list-calendar">
                    <!-- <div v-for="employee in employeeOptions.filter(
                      (emp) =>
                        emp.value !== 'all team' &&
                        selectedEmployees.includes(emp.value)
                    )" :key="employee.value" class="employee-item-calendar">
                      <VAvatar size="32" class="employee-avatar-calendar">
                        <VImg :src="employee.avatar" :alt="employee.title" />
                      </VAvatar>
                      <span class="employee-name-calendar">{{
                        employee.title
                      }}</span>
                    </div> -->
                  </div>
                </div>

                <!-- Calendar -->
                <div class="calendar-main">
                  <!-- <div class="calendar-wrapper"> -->
                  <FullCalendar ref="refCalendar" :options="calendarOptions"
                    class="custom-calendar-with-tall-headers" />
                  <!-- </div> -->
                </div>
              </div>

              <!-- Regular Calendar (for Day and Month views) -->
              <div v-else>
                <FullCalendar ref="refCalendar" :options="calendarOptions" class="custom-calendar-with-tall-headers" />
              </div>
            </VCard>
          </VMain>
        </VLayout>
      </VCardText>
      <!-- <CalendarEventHandler v-model:is-drawer-open="isEventHandlerSidebarActive" :event="event" @add-event="addEvent"
        @update-event="updateEvent" @remove-event="removeEvent" /> -->
    </VCard>

    <!-- Appointment Modal -->
    <AddBookingModal v-model="isAppointmentModalOpen" />
    <SlotBookingModal v-model="isSlotBookingModalOpen" />
  </BusinessLayout>
</template>

<style lang="scss">
@use "@core/scss/template/libs/full-calendar";

.calendars-checkbox {
  .v-label {
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
    opacity: var(--v-high-emphasis-opacity);
  }
}

.add-btn .v-btn__append {
  padding-left: 10px;
}

.fc-col-header-cell-cushion {
  text-transform: uppercase;
}

.fc-timegrid-col-header {
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
}

.chip-close {
  cursor: pointer;
  margin-left: 4px;
  color: #666;
}

// .custom-list:hover {
//   background-color: #F5F7FA !important; /* bg color on hover */
// }
.custom-list.v-list-item:hover,
.custom-list.v-list-item.v-list-item--active {
  background-color: transparent !important;
}


/* Add right border to each day header cell */
.fc-timegrid-col-header-cell {
  border-right: 1px solid #ddd;
  /* right border color */
}

/* Optional: remove border on last cell so it looks neat */
.fc-timegrid-col-header-cell:last-child {
  border-right: none;
}

.calendar-add-event-drawer {
  &.v-navigation-drawer:not(.v-navigation-drawer--temporary) {
    border-end-start-radius: 0.375rem;
    border-start-start-radius: 0.375rem;
  }

  &.v-navigation-drawer--temporary:not(.v-navigation-drawer--active) {
    transform: translateX(-110%) !important;
  }
}

.custom-chip {
  --v-theme-background: white !important;
  background-color: white !important;
  padding: 0px 6px !important;
  height: 23px !important;
  font-size: 12px !important;
}

.calendar-date-picker {
  display: none;

  +.flatpickr-input {
    +.flatpickr-calendar.inline {
      border: none;
      box-shadow: none;

      .flatpickr-months {
        border-block-end: none;
      }
    }
  }

  &~.flatpickr-calendar .flatpickr-weekdays {
    margin-block: 0 4px;
  }
}

.rotate-180 {
  transform: rotate(180deg);
}

@media screen and (max-width: 1279px) {
  .calendar-add-event-drawer {
    border-width: 0;
  }
}

.icon-button1 {
  padding: 12px !important;
}

.custom-calendar-with-tall-headers {
  border-radius: 20px !important;
  overflow: hidden !important;
}

.fc-day-today {
  background-color: transparent !important;
}

body .fc .fc-col-header .fc-col-header-cell .fc-col-header-cell-cushion {
  background-color: rgb(var(--v-theme-bg-bgsoft)) !important;
  color: rgb(var(--v-theme-text-secondary)) !important;
}

// .custom-list{
//   background-color: rgb(var(--v-theme-bg-bgsoft)) !important;
// }
// .custom-list.v-list-item:hover {
//   background-color: var(--v-theme-bg-bgsoft) !important;
//   box-shadow: none !important;
//   outline: none !important;
// }

// /* Also disable ripple effect */
// .custom-list .v-ripple__container {
//   display: none !important;
// }


// Custom calendar header styles
.calendar-custom-header {
  .v-btn {
    text-transform: none;
  }

  .v-text-field {
    .v-field__input {
      min-height: 36px;
    }
  }

  .v-select {
    .v-field__input {
      min-height: 36px;
    }
  }
}

body .fc .fc-col-header .fc-col-header-cell .fc-col-header-cell-cushion {
  width: 100% !important;
  background-color: #f3f3f4;
  // border-right: 1px solid #ccc;
}

.checkbox-label-space .v-label {
  margin-inline-start: 0.5rem;
  /* same as ms-2 in Tailwind */
}

// Calendar with employee column
.calendar-with-employee-column {
  display: flex;
  flex-direction: column;
  height: 100%;

  .calendar-integrated-header {
    display: flex;
    height: 40px;
    background-color: var(--v-theme-surface);
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);

    .employee-header-section {
      width: 200px;
      flex-shrink: 0;
      // Remove styling to make it transparent
    }

    .calendar-header-section {
      flex: 1;
    }
  }

  // .employee-column-calendar {
  //   width: 100px;
  //   background-color: var(--v-theme-surface);
  //   border-right: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  //   padding: 8px;
  //   display: flex;
  //   flex-direction: column;
  //   position: absolute;
  //   left: 0;
  //   top: 40px; // Below the integrated header
  //   bottom: 0;
  //   z-index: 1;

  //   .employee-list-calendar {
  //     display: flex;
  //     flex-direction: column;
  //     gap: 12px;
  //     margin-top: 8px; // Reduced space since we have integrated header
  //   }

  //   .employee-item-calendar {
  //     display: flex;
  //     flex-direction: column;
  //     align-items: center;
  //     gap: 8px;
  //     padding: 8px;
  //     border-radius: 8px;
  //     transition: all 0.2s ease;
  //     min-height: 60px; // Match calendar row height

  //     &:hover {
  //       background-color: rgba(var(--v-theme-on-surface), 0.08);
  //     }

  //     .employee-avatar-calendar {
  //       flex-shrink: 0;
  //       width: 48px !important;
  //       height: 48px !important;
  //     }

  //     .employee-name-calendar {
  //       font-size: 11px;
  //       font-weight: 500;
  //       color: rgba(var(--v-theme-on-surface), 0.87);
  //       text-align: center;
  //       line-height: 1.2;
  //       white-space: nowrap;
  //       overflow: hidden;
  //       text-overflow: ellipsis;
  //       max-width: 100%;
  //     }
  //   }
  // }

  // .event-tooltip {
  //   position: absolute;
  //   z-index: 999;
  // }

  .calendar-main {
    flex: 1;
    // margin-left: 100px; // Push calendar to the right to make space for employee column
    // width: 100%;
    // overflow: auto;

    .fc {
      // height: 100%;

      // Ensure the calendar header extends properly
      .fc-header-toolbar {
        margin-bottom: 0;
      }

      .fc-timegrid-axis {
        width: 200px !important;
        border-right: none !important;
      }


      // Remove all-day section styling
      .fc-timegrid-slot-label.fc-timegrid-slot-label-lane {
        display: none;
      }

      .fc-timegrid-slot-label.fc-timegrid-slot-label-time {
        display: none;
      }

      // Make date column borders extend over employee column
      .fc-timegrid-col {
        border-left: 1px solid rgba(var(--v-theme-on-surface), 0.12) !important;

        &:first-child {
          border-left: none !important;
        }
      }

      // Extend the first column border to include employee column
      .fc-timegrid-col:first-child {
        border-left: 1px solid rgba(var(--v-theme-on-surface), 0.12) !important;
        margin-left: -200px; // Pull the border to the left to cover employee column
        padding-left: 200px; // Add padding to maintain content position
      }
    }
  }
}

.fc-timegrid {
  table-layout: fixed !important;
  width: 100% !important;
}

td.fc-timegrid-slot.fc-timegrid-slot-label.fc-scrollgrid-shrink {
  padding: 30px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  border: none !important;
}


// Calendar container for side-by-side display
.calendar-container {
  display: flex;
  gap: 16px;
  overflow: hidden;
  position: relative;

  .calendar-section {
    flex: 1;
  }
}

// Custom calendar styling
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;

  .calendar-title {
    font-weight: 600;
    font-size: 14px;
  }
}

.calendar-grid {
  padding: 8px;

  .calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-bottom: 8px;

    .weekday {
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      color: #666;
      padding: 8px 4px;
    }
  }

  .calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;

    .calendar-day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s ease;

      &:hover {
        background-color: rgba(var(--v-theme-primary), 0.1);
      }

      &.other-month {
        color: #ccc;
      }

      &.selected {
        background-color: rgb(var(--v-theme-primary));
        color: white;
        font-weight: 600;
      }

      &.in-range {
        background-color: rgba(var(--v-theme-primary), 0.1);
        color: rgb(var(--v-theme-primary));
        font-weight: 500;
      }

      &.start-date {
        background-color: rgb(var(--v-theme-primary));
        color: white;
        font-weight: 600;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      &.end-date {
        background-color: rgb(var(--v-theme-primary));
        color: white;
        font-weight: 600;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.v-layout {
  overflow: visible !important;

  .v-card {
    overflow: visible;
  }
}

// Custom styling for the view selector
.custom-view-select {
  :deep(.v-field__input) {
    padding: 0 12px !important;
    min-height: 36px !important;
    align-items: center !important;
  }

  :deep(.v-field__append-inner) {
    padding-right: 8px !important;
    align-items: center !important;
    display: flex !important;
    height: 100% !important;
  }

  :deep(.v-field__field) {
    align-items: center !important;
  }

  :deep(.v-select__selection) {
    margin: 0 !important;
    align-items: center !important;
  }

  :deep(.v-field__append-inner .v-icon) {
    align-self: center !important;
    margin: 0 !important;
    line-height: 1 !important;
  }
}

// Calendar header button styling
.calendar-custom-header {
  .v-btn {
    border-radius: 10px !important;
  }

  // Add button styling
  .v-btn:has(.v-btn__append) {
    background-color: #000000 !important;
    color: white !important;
  }

  // All other buttons except Add button and grouped buttons
  .v-btn:not(:has(.v-btn__append)):not(.refresh-view-group .v-btn):not(.date-range-group .v-btn) {
    border: 1px solid #e0e0e0 !important;
    color: #666 !important;
  }

  // Refresh and view selector group styling
  .refresh-view-group {
    border-radius: 10px !important;
    overflow: hidden !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;

    .v-btn {
      border-radius: 0 !important;
      border: none !important;
      color: #666 !important;
    }

    .custom-view-select {
      :deep(.v-field) {
        border-radius: 0 !important;
        border: none !important;
      }
    }
  }

  // Date range group styling
  .date-range-group {
    border-radius: 10px !important;
    overflow: hidden !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;

    .v-btn {
      border-radius: 0 !important;
      color: #666 !important;
    }
  }

}
</style>
