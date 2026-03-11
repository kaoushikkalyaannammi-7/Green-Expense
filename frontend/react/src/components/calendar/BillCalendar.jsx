import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function BillCalendar({ events, onDateClick, onEventClick }) {
  return (
    <div className="calendar-container">

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}

        initialView="dayGridMonth"

        height="auto"
        contentHeight="auto"

        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: ""
        }}

        events={events}

        dateClick={(info) => onDateClick(info.dateStr)}

        eventClick={(info) =>
          onEventClick(info.event.extendedProps.bill)
        }

        dayMaxEvents={2}

        eventColor="#16a34a"

      />

    </div>
  );
}