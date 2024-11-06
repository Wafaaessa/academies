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
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import calendar from "../../assests/calendar.png";

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
  const [sessionDetails, setSessionDetails] = useState<Session[]>([]);

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

  /////////////////////////////DateSelect////////////////////////////////////////

  const handleDateSelect = (date: Date) => {


    const formattedDate = date.toLocaleDateString("en-CA");
    const sessionOnDate = sessions.filter((session) => {
      if (!session.session_date) return false;
      const sessionDateOnly = session.session_date.split(" ")[0];
      return sessionDateOnly === formattedDate;
    });

    setSessionDetails(sessionOnDate || null);
  };
  /////////////////////////////EventSelect////////////////////////////////////////

  const handleEventSelect = (event: CustomEvent) => {
    setSessionDetails([event.sessionData]);
  };

  /////////////////////////////CustomToolbar/////////////////////////////////////

  const CustomToolbar = (toolbar: any) => (
    <>
      <div className="toolbar-container">
        <div className="toolbar-label-section">
          <img src={calendar} alt="Calendar Icon" className="toolbar-img" />

          <span className="toolbar-label">{toolbar.label}</span>
        </div>
        <div className="toolbar-arrows">
          <button
            className="toolbar-button"
            onClick={() => toolbar.onNavigate("PREV")}
            aria-label="Previous"
          >
            <GoChevronLeft className="toolbar-icon" />
          </button>
          <button
            className="toolbar-button"
            onClick={() => toolbar.onNavigate("NEXT")}
            aria-label="Next"

          >
            <GoChevronRight className="toolbar-icon" />
          </button>
        </div>
      </div>
      <hr className="toolbar-hr" />
    </>
  );

  const CustomEvent = ({ event }: { event: CustomEvent }) => {
    return (
      <div
        style={{
          position: "relative",
          height: "5px",
          backgroundColor: "#CE3582",
          borderRadius: "50%",
          width: "5px",
          marginLeft: "25px",
        }}
      />
    );
  };

  return (
    <div className="container">
      {/* calendar-container  */}
      <h5>Latest Sessions  <span className="coming">Coming Session</span></h5>
      <div className="calendar-container">
        
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            className="calendar"
            onDrillDown={handleDateSelect}
            onSelectEvent={handleEventSelect}
            selectable
            views={["month"]}
            components={{
              event: CustomEvent,
              toolbar: CustomToolbar,
            }}
          />
      
        {/* session-details-container */}
        <div className="session-details-container">
          {sessionDetails.length > 0 ? (
            <div className="row">
              {sessionDetails.map((session, index) => {
                let cardClass = "card";
                let courseColorClass = "";
                let buttonColorClass = "";

                if (index < 3) {
                  cardClass += " first-three";

                  if (index === 0) {
                    courseColorClass = "purple1";
                  } else if (index === 1) {
                    courseColorClass = "pink2";
                    buttonColorClass = "button-pink";
                  } else if (index === 2) {
                    courseColorClass = "green3";
                    buttonColorClass = "button-light";
                  }
                } else {
                  cardClass +=
                    index % 3 === 0
                      ? " purple"
                      : index % 3 === 1
                      ? " pink"
                      : " green";
                }

                return (
                  <div
                    key={session.session_id}
                    className="col-md-4 session-card"
                  >
                    <div className={cardClass}>
                      <div className="paragraph mt-4">
                      <p
                        className={`course ${courseColorClass} dog-eared-corner`}
                      >
                        Course: {session.course_name}
                      </p>
                      <p className="session">Session: {session.session_name}</p>
                      <button className={`watch-button ${buttonColorClass}`} >
                        Watch
                      </button>

                      </div>
                    </div>
                  </div>
                );
              })}
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
