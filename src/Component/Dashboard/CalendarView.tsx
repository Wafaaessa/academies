import React, { useEffect, useState } from "react";
import {
  Calendar,
  momentLocalizer,
  Event as BigCalendarEvent,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Papa from "papaparse";
import "./CalendarView.css";
import {
  FaCheckCircle,
  FaHourglassStart,
  FaPlayCircle,
  FaStopCircle,
} from "react-icons/fa";

const localizer = momentLocalizer(moment);

interface Session {
  session_id: string;
  session_name: string;
  session_description: string | null;
  session_date: string;
  session_status: string;
  session_type: string;
  course_id: string;
  course_name: string;
}

interface CustomEvent extends BigCalendarEvent {
  sessionData: Session;
}

const CalendarView: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [events, setEvents] = useState<CustomEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [sessionDetails, setSessionDetails] = useState<Session | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    Papa.parse("/data.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const sessionsData = results.data as Session[];
        setSessions(sessionsData);

        const eventsData = sessionsData.map((session) => ({
          title: session.session_name,
          start: new Date(session.session_date),
          end: new Date(session.session_date),
          sessionData: session,
        }));
        setEvents(eventsData);
      },
    });
  }, []);
  /////////////////////////////StatusIcon////////////////////////////////////////

  const getStatusIcon = (status: string) => {
    const iconStyle = { marginLeft: " 10px" };

    switch (status.toLowerCase()) {
      case "completed":
        return <FaCheckCircle color="green" style={iconStyle} />;
      case "coming":
        return <FaHourglassStart color="orange" style={iconStyle} />;
      case "active":
        return <FaPlayCircle color="blue" style={iconStyle} />;
      case "ended":
        return <FaStopCircle color="red" style={iconStyle} />;
      default:
        return null;
    }
  };
  /////////////////////////////DateSelect////////////////////////////////////////

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // setShowCalendar(false);

    const formattedDate = date.toLocaleDateString("en-CA");
    const sessionOnDate = sessions.find((session) => {
      if (!session.session_date) return false;
      const sessionDateOnly = session.session_date.split(" ")[0];
      return sessionDateOnly === formattedDate;
    });

    setSessionDetails(sessionOnDate || null);
  };
  /////////////////////////////EventSelect////////////////////////////////////////

  const handleEventSelect = (event: CustomEvent) => {
    setSessionDetails(event.sessionData);
  };
  /////////////////////////////RemoveTags////////////////////////////////////////

  const removeHtmlTags = (description: string | null) => {
    return description ? description.replace(/<[^>]*>/g, "") : "";
  };

  /////////////////////////////Agenda////////////////////////////////////////
  const eventAgenda = ({ event }: { event: CustomEvent }) => (
    <div>
      <p>
        <strong>{event.title}</strong>
      </p>
      <p>Course Name: {event.sessionData.course_name}</p>
      <p>
        Desc: {removeHtmlTags(event.sessionData.session_description) || "N/A"}
      </p>
      <p>Type: {event.sessionData.session_type}</p>
      <p>
        Status: {event.sessionData.session_status}
        {getStatusIcon(event.sessionData.session_status)}
      </p>
    </div>
  );

  return (
    <div className="container">
      <h4>Schedule a lecture</h4>
      <div className="button-container">
        <button
          className="button button-today "
          onClick={() => handleDateSelect(new Date())}
        >
          Today
        </button>
        <button
          className="button button-select-date "
          onClick={() => setShowCalendar(true)}
        >
          Select a Date
        </button>
        <button
          className="button button-tomorrow"
          onClick={() => handleDateSelect(new Date(Date.now() + 86400000))}
        >
          Tomorrow
        </button>
      </div>
      {/* calendar-container  */}
      <div className="calendar-container">
        {showCalendar && (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            className="calendar"
            onSelectSlot={({ start }) => handleDateSelect(start as Date)}
            onSelectEvent={handleEventSelect}
            selectable
            views={["day", "month", "agenda"]}
            components={{
              agenda: {
                event: eventAgenda,
              },
            }}
          />
        )}
        {/* session-details-container */}
        <div className="session-details-container">
          {selectedDate && (
            <p className="selected-date">
              Selected Date: {selectedDate.toDateString()}
            </p>
          )}

          {sessionDetails ? (
            <div className="session-details">
              <p>
                <strong>Session Name:</strong> {sessionDetails.session_name}
              </p>
              <p>
                <strong>Course Name:</strong> {sessionDetails.course_name}
              </p>
              <p>
                <strong>Desc:</strong>
                {removeHtmlTags(sessionDetails.session_description) || "N/A"}
              </p>
              <p>
                <strong>Type:</strong> {sessionDetails.session_type}
              </p>
              <p>
                <strong>Status:</strong> {sessionDetails.session_status}
                {getStatusIcon(sessionDetails.session_status)}
              </p>
            </div>
          ) : (
            <p className="no-event-message">No events on this day</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
