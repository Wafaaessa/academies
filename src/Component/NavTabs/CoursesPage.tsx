/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import "./../UserProfile/UserProfile.css";
import "./../UsersPage/UsersPage.css";

import think from "../../assests/Thinking 1.png";

interface Course {
  id: number;
  name: string;
  role: string;
  enrolledDate: string;
}

interface CoursesPageProps {
  fromDate: string;
  toDate: string;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ fromDate, toDate }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Accounting", role: "Student", enrolledDate: "2024-01-01" },
    { id: 2, name: "Marketing", role: "Teacher", enrolledDate: "2024-02-01" },
    {
      id: 3,
      name: "Human Resources",
      role: "Student",
      enrolledDate: "2024-08-07",
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  // Convert date strings to Date objects for comparison
  const parseDate = (dateString: string) => new Date(dateString);

  // Filter courses based on the selected date range
  const filteredCourses = courses.filter((course) => {
    const enrolledDate = parseDate(course.enrolledDate);
    const from = fromDate ? parseDate(fromDate) : null;
    const to = toDate ? parseDate(toDate) : null;

    if (from && to) {
      return enrolledDate >= from && enrolledDate <= to;
    } else if (from) {
      return enrolledDate >= from;
    } else if (to) {
      return enrolledDate <= to;
    }
    return true;
  });

  const handleRemoveCourse = (course: Course) => {
    setCourseToDelete(course);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (courseToDelete) {
      setCourses(courses.filter((course) => course.id !== courseToDelete.id));
      setCourseToDelete(null);
    }
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setCourseToDelete(null);
    setModalOpen(false);
  };

  return (
    <div>
      <table className="courses-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Role</th>
            <th>Enrolled Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.role}</td>
              <td>
                <div className="minus">
                  {course.enrolledDate}
                  <button
                    onClick={() => handleRemoveCourse(course)}
                    className="remove-course-btn"
                  >
                    <i className="fa-solid fa-user-minus"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredCourses.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No courses found for the selected date range.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {modalOpen && courseToDelete && (
        <div id="deleteModal" className="modal-overlay">
          <div className="modal-content2">
            <div className="photo-container mt-5">
              <img src={think} alt="Payment" />
            </div>
            <p className="sure text-center">
              Are you sure you want to remove this user?
            </p>
            <p className="step text-center">This step cannot be undone.</p>
            <div className="modal-actions ">
              <div className="row mb-3 mt-3">
                <div className="col-md-6 text-center">
                  <button
                    onClick={handleCloseModal}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-md-6 text-center">
                  <button onClick={handleDelete} className="btn btn-primary">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
