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
const selectAll = ref(true);

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
  customButtons: {
    myPrevButton: {
      text: 'Prev',
      click: function () {
        calendar.prev();  // call calendar API prev()
      }
    },
    myNextButton: {
      text: 'Next',
      click: function () {
        calendar.next();  // call calendar API next()
      }
    },
    myRefreshButton: {
      text: 'Refresh',
      click: function () {
        // Your custom refresh action
        alert('Refresh clicked!');
      }
    }
  },
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
    background-color: #198754;
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

  // eventMouseEnter(info) {
  //   const { status, client, teamMemeber, service } = info.event.extendedProps;

  //   const tooltip = document.createElement("div");
  //   tooltip.className = "event-tooltip";
  //   tooltip.style.position = "absolute";
  //   tooltip.style.top = "110%";
  //   tooltip.style.left = "0";
  //   tooltip.style.padding = "0";
  //   tooltip.style.margin = "0"
  //   tooltip.style.background = "#fff";
  //   tooltip.style.border = "1px solid #ccc";
  //   tooltip.style.borderRadius = "8px";
  //   tooltip.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
  //   tooltip.style.width = "240px";
  //   tooltip.style.fontFamily = "sans-serif";
  //   tooltip.style.overflow = "hidden";

  //   tooltip.innerHTML = `
  //   <!-- Header -->
  //   <div style="
  //     display:flex;
  //     justify-content:space-between;
  //     align-items:center;
  //     background:${status === 'completed' ? '#28a745' : '#6c757d'};
  //     color:#fff;
  //     padding:6px 10px;
  //     font-size:13px;
  //     font-weight:bold;
  //   ">
  //     <span>${new Date(info.event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
  //           ${new Date(info.event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
  //     <span style="text-transform:uppercase;">${status}</span>
  //   </div>

  //   <!-- Client -->
  //   <div style="padding:10px;">
  //     <div style="font-size:11px; color:#6c757d; margin-bottom:4px;">CLIENT</div>
  //     <div style="display:flex; align-items:center; gap:8px;">
  //       <img src="${client.avatar}" alt="${client.name}" style="width:28px; height:28px; border-radius:50%;">
  //       <div>
  //         <div style="font-size:13px; font-weight:500;">${client.name}</div>
  //         <div style="font-size:11px; color:#6c757d;">+39 351 195 5891</div>
  //       </div>
  //     </div>

  //     <!-- Team Member -->
  //     <div style="font-size:11px; color:#6c757d; margin:10px 0 4px;">TEAM MEMBER</div>
  //     <div style="display:flex; align-items:center; gap:8px;">
  //       <img src="${teamMemeber.avatar}" alt="${teamMemeber.name}" style="width:28px; height:28px; border-radius:50%;">
  //       <div style="font-size:13px; font-weight:500;">${teamMemeber.name}</div>
  //     </div>

  //     <!-- Service -->
  //     <div style="font-size:11px; color:#6c757d; margin:10px 0 4px;">SERVICE</div>
  //     <div style="font-size:13px; font-weight:500;">
  //       ${service.type} • ${service.duration}
  //     </div>
  //   </div>
  // `;

  //   info.el.appendChild(tooltip);
  // },
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

  },
  eventMouseLeave(info) {
    const tooltip = document.body.querySelector(".event-tooltip");
    if (tooltip) tooltip.remove();
  },
  allDaySlot: false, // Remove all-day slot globally
  slotMinTime: "00:00:00", // Start from midnight
  slotMaxTime: "24:00:00", // End at midnight
}));

// 👉 Custom calendar controls
const selectedView = ref("timeGridWeek");
const selectedEmployees = ref([
  "john doe",
  "jane smith",
  "mike johnson",
  "sarah wilson",
  "david brown",
]);
const isTeamDropdownOpen = ref(false);
const dateRange = ref({
  start: new Date().toISOString().split("T")[0],
  end: new Date().toISOString().split("T")[0],
});
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
      date: currentDate.toISOString().split("T")[0],
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
    // Update date range to today
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
    // Update date range based on current view
    updateDateRangeFromCalendar();
  }
};

const handleNextPeriod = () => {
  const calendarApi = refCalendar.value?.getApi();
  if (calendarApi) {
    calendarApi.next();
    // Update date range based on current view
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
      end.setDate(end.getDate() - 1); // Adjust for FullCalendar's exclusive end
      dateRange.value = {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
      };
    } else if (view.type === "dayGridMonth") {
      const start = new Date(view.currentStart);
      const end = new Date(view.currentEnd);
      end.setDate(end.getDate() - 1); // Adjust for FullCalendar's exclusive end
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
  } else {
    // If not all selected, uncheck 'all team'
    if (newVal.includes("all team")) {
      selectedEmployees.value = newVal.filter(val => val !== "all team");
    }
    selectAll.value = false;
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
              <!-- Left side controls -->
              <div class="d-flex flex-wrap align-center gap-4">
                <!-- Today button -->
                <!-- <VBtn variant="outlined" @click="goToToday"> Today </VBtn> -->
                <div class="refresh-view-group" style="
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            border-radius: 100px;
            overflow: hidden;
            height: 36px;
          ">
                  <!-- Left: Refresh Button -->
                  <!-- <VBtn
                :icon="isLoading ? 'tabler-loader-2' : 'tabler-refresh'"
                variant="plain"
                density="comfortable"
                :loading="isLoading"
                style="border-right: 1px solid #ccc; border-radius: 0; min-width: 36px; height: 100%;"
                @click="handleReload"
              /> -->

                  <!-- Right: View Selector -->
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
                <VMenu v-model="isTeamDropdownOpen" :close-on-content-click="false">
                  <template #activator="{ props }">

                    <VBtn v-bind="props" variant="outlined" class="icon-button1"
                      style="background-color: white;display: flex;justify-content: space-between;"
                      prepend-icon="tabler-users">
                      All Team Members
                      <VIcon size="15" :class="{ 'rotate-180': isTeamDropdownOpen }" style="margin-left: 10px;"
                        icon="tabler-chevron-down" />
                    </VBtn>
                  </template>

                  <VCard min-width="250">
                    <VCardTitle class="text-h6 pa-4">
                      <!-- All Team Button -->
                      <div class="d-flex align-center justify-space-between">
                        <VCheckbox v-model="selectAll" label="All Team Members" @click="selectAllEmployees"
                          color="primary" hide-details density="compact" />

                        <!-- <VBtn
                          variant="text"
                          size="small"
                          color="primary"
                          @click="selectAllEmployees"
                        > -->
                        <!-- All Team Members
                        </VBtn> -->

                        <!-- Clear All Button -->
                        <!-- <VBtn
                          variant="text"
                          size="small"
                          color="error"
                          @click="clearAllEmployees"
                        >
                          Clear All
                        </VBtn> -->
                      </div>
                      <!-- Select Employees -->
                    </VCardTitle>
                    <!-- <VCardText>
                      <div class="d-flex flex-column gap-2">
                        <VCheckbox v-for="employee in employeeOptions.filter(
                          (emp) => emp.value !== 'all team'
                        )" :key="employee.value" v-model="selectedEmployees" :value="employee.value"
                          :label="employee.title" />
                      </div>
                    </VCardText> -->
                    <VCardText style="padding: 0 16px">
                      <div class="d-flex flex-column gap-2 pb-4">
                        <!-- Employee Checkboxes -->
                        <VCheckbox v-for="employee in employeeOptions.filter(
                          (emp) => emp.value !== 'all team'
                        )" :key="employee.value" v-model="selectedEmployees" :value="employee.value" density="compact">
                          <template #label>
                            <div class="d-flex align-center justify-between w-100">
                              <div class="d-flex align-center gap-2 ms-2">
                                <VAvatar :image="employee.avatar" size="24" />
                                <span>{{ employee.title }}</span>
                              </div>
                              <VIcon v-if="
                                selectedEmployees.includes(employee.value)
                              " icon="tabler-check" size="17" color="secondary" style="margin-left: auto;" />
                            </div>

                          </template>
                        </VCheckbox>
                      </div>
                    </VCardText>
                  </VCard>
                </VMenu>
              </div>

            </div>
          </div>

          <!-- Right button -->
          <VBtn v-bind="props" append-icon="tabler-chevron-down" color="primary"
            style="border-radius: 0.5rem; margin-bottom: 0.5rem">
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

      <VList style="border-radius: 15px !important;">
        <VListItem @click="openAppointmentModal"
          style="padding-top: 4px !important; padding-bottom: 4px !important; padding-left: 4px !important; border-radius: 10px !important;">
          <VListItemTitle>
            <VBtn icon="tabler-calendar" variant="text" size="small" color="black" />
            Book An Appointment
          </VListItemTitle>
        </VListItem>
        <VListItem @click="handleBookedSlot"
          style="padding-top: 4px !important; padding-bottom: 4px !important; padding-left: 4px !important; border-radius: 10px !important;">
          <VListItemTitle>
            <VBtn icon="tabler-calendar-x" variant="text" size="small" color="black" />
            Blocked Slot
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

.fc-timegrid-col-header {
  background-color: #f0f0f0;
  /* your desired background color */
  border-bottom: 1px solid #ccc;
  /* optional bottom border */
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

.fc-event-lower {
  z-index: 10 !important;
  /* Ensure your tooltip can go over it */
  background-color: red !important;
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

  .employee-column-calendar {
    width: 100px;
    background-color: var(--v-theme-surface);
    border-right: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    padding: 8px;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 40px; // Below the integrated header
    bottom: 0;
    z-index: 1;

    .employee-list-calendar {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 8px; // Reduced space since we have integrated header
    }

    .employee-item-calendar {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 8px;
      border-radius: 8px;
      transition: all 0.2s ease;
      min-height: 60px; // Match calendar row height

      &:hover {
        background-color: rgba(var(--v-theme-on-surface), 0.08);
      }

      .employee-avatar-calendar {
        flex-shrink: 0;
        width: 48px !important;
        height: 48px !important;
      }

      .employee-name-calendar {
        font-size: 11px;
        font-weight: 500;
        color: rgba(var(--v-theme-on-surface), 0.87);
        text-align: center;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
      }
    }
  }

  // .event-tooltip {
  //   position: absolute;
  //   z-index: 999;
  // }

  .calendar-main {
    flex: 1;
    margin-left: 100px; // Push calendar to the right to make space for employee column
    // width: 100%;
    // overflow: auto;

    .fc {
      // height: 100%;

      // Ensure the calendar header extends properly
      .fc-header-toolbar {
        margin-bottom: 0;
      }

      .fc-timegrid-axis {
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
