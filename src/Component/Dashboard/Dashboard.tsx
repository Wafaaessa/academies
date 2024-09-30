
import React from "react";
import dash from "../../assests/dashborad.png";
import arrow from "../../assests/expand-arrows 1.png";
import threeusers from "../../assests/3 User.png";
import cloud from "../../assests/cloud-storage-svgrepo-com 1.png";
import threecolor from "../../assests/3Users.png";

import "./../UserProfile/UserProfile.css";
import "./Dashboard.css";
import {
  Search,
  Users,
  User,
  Clock,
  Mail,
  FolderMinus,
} from "react-feather";


const Dashboard: React.FC = () => {

const timelineData = [
  { event: "You signed in", time: "3 hours ago" },
  { event: "You signed out", time: "Yesterday" },
  { event: "You signed in", time: "Yesterday" },
  { event: "You signed out", time: "07/08/2024" },
  { event: "You added a new course “Chimestry”", time: "07/08/2024" },
  { event: "You deleted a course “Semester one”", time: "07/08/2024" },
  { event: "You added a student “+201069981295”", time: "07/08/2024" },
  { event: "You blocked a student “+201113843331” ", time: "07/08/2024" },
  { event: "You deleted an instructor “+201020304050”", time: "07/08/2024" },
  { event: "You added a student “+201069981295”", time: "07/08/2024" },
  { event: "You blocked a student “+201113843331” ", time: "07/08/2024" },
  { event: "You deleted an instructor “+201020304050”", time: "07/08/2024" },
  { event: "You canceled a subscription", time: "07/08/2024" },
  { event: "You invited a friend", time: "6 days ago" },
  { event: "You shared a document", time: "1 week ago" },
  { event: "You signed in", time: "3 hours ago" },
  { event: "You signed out", time: "Yesterday" },
  { event: "You signed in", time: "Yesterday" },
  { event: "You signed out", time: "07/08/2024" },
  { event: "You added a new course “Chimestry”", time: "07/08/2024" },
  { event: "You deleted a course “Semester one”", time: "07/08/2024" },
  { event: "You added a student “+201069981295”", time: "07/08/2024" },
  { event: "You blocked a student “+201113843331” ", time: "07/08/2024" },
  { event: "You deleted an instructor “+201020304050”", time: "07/08/2024" },
  { event: "You added a student “+201069981295”", time: "07/08/2024" },
  { event: "You blocked a student “+201113843331” ", time: "07/08/2024" },
  { event: "You deleted an instructor “+201020304050”", time: "07/08/2024" },
  { event: "You canceled a subscription", time: "07/08/2024" },
  { event: "You invited a friend", time: "6 days ago" },
  { event: "You shared a document", time: "1 week ago" },
  { event: "You signed in", time: "3 hours ago" },
  { event: "You signed out", time: "Yesterday" },
  { event: "You signed in", time: "Yesterday" },
  { event: "You signed out", time: "07/08/2024" },
  { event: "You added a new course “Chimestry”", time: "07/08/2024" },
  { event: "You deleted a course “Semester one”", time: "07/08/2024" },
  { event: "You added a student “+201069981295”", time: "07/08/2024" },
  { event: "You blocked a student “+201113843331” ", time: "07/08/2024" },
  { event: "You deleted an instructor “+201020304050”", time: "07/08/2024" },
  { event: "You added a student “+201069981295”", time: "07/08/2024" },
  { event: "You blocked a student “+201113843331” ", time: "07/08/2024" },
  { event: "You deleted an instructor “+201020304050”", time: "07/08/2024" },
  { event: "You canceled a subscription", time: "07/08/2024" },
  { event: "You invited a friend", time: "6 days ago" },
  { event: "You shared a document", time: "1 week ago" },
  { event: "You signed in", time: "3 hours ago" },
  { event: "You signed out", time: "Yesterday" },
  { event: "You signed in", time: "Yesterday" },
  { event: "You signed out", time: "07/08/2024" },
  { event: "You added a new course “Chimestry”", time: "07/08/2024" },
  { event: "You deleted a course “Semester one”", time: "07/08/2024" },
  { event: "You added a student “+201069981295”", time: "07/08/2024" },
  { event: "You blocked a student “+201113843331” ", time: "07/08/2024" },
  { event: "You deleted an instructor “+201020304050”", time: "07/08/2024" },
  { event: "You added a student “+201069981295”", time: "07/08/2024" },
  { event: "You blocked a student “+201113843331” ", time: "07/08/2024" },
  { event: "You deleted an instructor “+201020304050”", time: "07/08/2024" },
  { event: "You canceled a subscription", time: "07/08/2024" },
  { event: "You invited a friend", time: "6 days ago" },
  { event: "You shared a document", time: "1 week ago" },
  { event: "You signed in", time: "3 hours ago" },
  { event: "You signed out", time: "Yesterday" },
  { event: "You signed in", time: "Yesterday" },
  { event: "You signed out", time: "07/08/2024" },
  { event: "You added a new course “Chimestry”", time: "07/08/2024" },
  { event: "You deleted a course “Semester one”", time: "07/08/2024" },
  { event: "You added a student “+201069981295”", time: "07/08/2024" },
  { event: "You blocked a student “+201113843331” ", time: "07/08/2024" },
  { event: "You deleted an instructor “+201020304050”", time: "07/08/2024" },
  { event: "You added a student “+201069981295”", time: "07/08/2024" },
  { event: "You blocked a student “+201113843331” ", time: "07/08/2024" },
  { event: "You deleted an instructor “+201020304050”", time: "07/08/2024" },
  { event: "You canceled a subscription", time: "07/08/2024" },
  { event: "You invited a friend", time: "6 days ago" },
  { event: "You shared a document", time: "1 week ago" },
  { event: "You signed in", time: "3 hours ago" },
  { event: "You signed out", time: "Yesterday" },
  { event: "You signed in", time: "Yesterday" },
  { event: "You signed out", time: "07/08/2024" },
  { event: "You added a new course “Chimestry”", time: "07/08/2024" },
  { event: "You deleted a course “Semester one”", time: "07/08/2024" },
  { event: "You added a student “+201069981295”", time: "07/08/2024" },
  { event: "You blocked a student “+201113843331” ", time: "07/08/2024" },
  { event: "You deleted an instructor “+201020304050”", time: "07/08/2024" },
  { event: "You added a student “+201069981295”", time: "07/08/2024" },
  { event: "You blocked a student “+201113843331” ", time: "07/08/2024" },
  { event: "You deleted an instructor “+201020304050”", time: "07/08/2024" },
  { event: "You canceled a subscription", time: "07/08/2024" },
  { event: "You invited a friend", time: "6 days ago" },
  { event: "You shared a document", time: "1 week ago" },
];

const hasData = timelineData.length > 0; 

  return (
    <>
      {/* search top */}
      <div className="search-container mt-4 ms-4">
        <div className="search-top">
          <input type="text" placeholder="Search" className="search-input" />
          <div className="search-icon">
            <Search size={20} />
          </div>
        </div>
      </div>

      {hasData ? (
        <div className="dashboard-layout" data-testid="dash-page">
          {/* الجزئين في المنتصف تحت بعض */}
         {/* الجزء الاول من المنتصف */}
          <div className="middle-sections ms-4 mb-5">
            <div className="middle-section ">
              <h2>Overview</h2>

              <div className="overview-grid  ">
                {/* المربع الأول */}
                <div className="overview-box">

                  <img src={threeusers} alt="Total Students"  className="icon-style" />
                  <h1>500</h1>
                  <h4>Total Students</h4>
                </div>

                {/* المربع الثاني */}
                <div className="overview-box box2 section2">
                  <Users
                    size={30}
                    color={"rgba(109, 100, 232, 1)"}
                    className="icon-style"
                   aria-label="total instructors"
                  />
                  <h1>60</h1>
                  <h4>Total Instructors</h4>
                </div>

                {/* المربع الثالث */}
                <div className="overview-box box3 section3">
                  <FolderMinus
                    size={30}
                    color={"rgba(224, 27, 132, 1)"}
                    className="icon-style"
                     aria-label="total Courses"
                  />
                  <h1>60</h1>
                  <h4>Total Courses</h4>
                </div>

                {/* المربع الرابع */}
                <div className="overview-box box4 section4">
                  <Mail
                    size={30}
                    color={"rgba(255, 193, 7, 1)"}
                    className="icon-style"
                    aria-label="Invitations left"
                  />
                  <h1>100</h1>
                  <h4>Invitations left</h4>
                </div>

                {/* المربع الخامس */}
                <div className="overview-box box5 section5">
                  <Clock
                    size={30}
                    color={"rgba(129, 206, 246, 1)"}
                    className="icon-style"
                    aria-label="Live minutes left"

                  />
                  <h1>60</h1>
                  <h4>Live minutes left</h4>
                </div>

                {/* المربع السادس */}
                <div className="overview-box box6 section6">
            
                <img src={cloud} alt="GB"  className="icon-style" />

                  <h1>50</h1>
                  <h4>GB left</h4>
                </div>
              </div>
            </div>
            {/* الجزء الثاني من المنتصف */}
            <div className="middle-section middle-section2">
              <h2>Quick Actions</h2>
              <div className="quick-actions ms-3 ">
                {/* زر إضافة مستخدم */}
                <button className="action-button ">
                  <User size={20} className="fa-plus" /> Add User
                </button>
                {/* زر إضافة مجموعة */}
                <button className="action-button ">
                  {/* <Users size={20} className="fa-plus" /> Add Group */}
                  <img src={threecolor} alt="add group"   className="fa-plus " style={{width:"18px", height:"18px"}}/>Add Group

                </button>
                {/* زر إضافة دورة */}
                <button className="action-button">
                  <FolderMinus size={20} className="fa-plus" /> Add Course
                </button>
              </div>
            </div>
          </div>

          {/* الجزء الأيمن */}
          <div className="right-section">
            <h1>
              Timeline
              <img src={arrow} alt="timeline" className="fa-plus mx-3" />
            </h1>

            <div className="box-right">
            <div className="timeline-scroll">

            {timelineData.map((item, index) => {
              
              const dotColor = item.event.includes("deleted") ? "rgba(254, 156, 212, 1)" : ""; 

              return (
                <div key={index}>
                  <div>
                  <div className="k position-relative">
                    <div className="timeline-dot-line position-absolute">
                      <div
                        className="timeline-dot"
                        style={{ backgroundColor: dotColor }} 
                      ></div>
                      <div className="timeline-line"></div>
                    </div>
                  </div>
                  <div className="timeline-details d-flex justify-content-between ">
                    <p className="group1 ">{item.event}</p>
                    <p className="group2">{item.time}</p>
                  </div>
                </div>
                </div>

              );
            })}
          </div>
        </div>
        </div>
        </div>

      ) : (
        // "No results found"
        <div className="payment-content dash-photo" data-testid="dash-page">
          <div className="photo-container">
            <img src={dash} alt="Files" />
          </div>
          <p>No results found</p>
        </div>
      )} 
    </>
  );
};

export default Dashboard;
