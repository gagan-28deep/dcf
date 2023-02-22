import React from "react";
import { Row, Col } from "react-bootstrap";
import { MdDashboard, MdOutlineMedicalServices } from "react-icons/md";
import {
  FaUserCheck,
  FaRegHospital,
  FaUserFriends,
  FaRegCalendarCheck,
  FaUserTie,
  FaCreditCard,
  FaRegStar,
  FaRegBell,
  FaRegImage,
  FaRegFilePdf,
  FaRegClone,
  FaRegCalendarAlt,
  FaVideo,
  FaTable,
  FaRegAddressBook,
  FaRegListAlt,
  FaFileInvoice,
} from "react-icons/fa";
import { TbDiscount2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { MdOutlineLocationOn, MdOutlineCommentBank } from "react-icons/md";
import "./Sidenav.css";
const Sidebar = (props) => {
  var sideNavData = [
    {
      title: "Dashboard",
      icon: <MdDashboard size={25} />,
      link: "/master/dashboard",
      type: "dashboard",
    },
    {
      title: "Staffs",
      icon: <FaUserFriends size={25} />,
      link: "/master/staff",
      type: "staff",
    },
    {
      title: "Clinics",
      icon: <FaRegHospital size={25} />,
      link: "/master/clinics",
      type: "clinic",
    },
    {
      title: "Doctors",
      icon: <MdOutlineMedicalServices size={25} />,
      link: "/master/doctors",
      type: "doctor",
    },
    {
      title: "Patients",
      icon: <FaUserCheck size={25} />,
      link: "/master/patients",
      type: "patient",
    },
    {
      title: "Invoice",
      icon: <FaFileInvoice size={25} />,
      link: "/master/invoice",
      type: "invoice",
    },
    {
      title: "Appointments",
      icon: <FaRegCalendarCheck size={25} />,
      link: "/master/appointments",
      type: "appointment",
    },
    // {
    //   title: "Clinic Managers",
    //   icon: <FaUserTie size={25} />,
    //   link: "/master/receptionist",
    //   type: "manager",
    // },
    {
      title: "Consultation",
      icon: <FaTable size={25} />,
      link: "/master/consulting",
      type: "consultation",
    },
    {
      title: "Doctor Query",
      icon: <FaTable size={25} />,
      link: "/master/doctorQuery",
      type: "doctorQuery",
    },
    {
      title: "Blood Tests",
      icon: <FaRegListAlt size={25} />,
      link: "/master/bloodTest",
      type: "bloodTest",
    },
    {
      title: "Lead Management",
      icon: <FaRegListAlt size={25} />,
      link: "/master/leadmanagement",
      type: "leadmanagement",
    },
    {
      title: "Appointments Payments",
      icon: <FaCreditCard size={25} />,
      link: "/master/patient-booking",
      type: "payment",
    },
    {
      title: "Reviews & Ratings",
      icon: <FaRegStar size={25} />,
      link: "/master/review-rating",
      type: "review",
    },
    {
      title: "Notification Management",
      icon: <FaRegBell size={25} />,
      link: "/master/notificationmanagement",
      type: "notification",
    },
    {
      title: "Banners",
      icon: <FaRegImage size={25} />,
      link: "/master/banner",
      type: "banner",
    },
    {
      title: "Reports",
      icon: <FaRegFilePdf size={25} />,
      link: "/master/reports",
      type: "report",
    },
    {
      title: "CMS",
      icon: <FaRegClone size={25} />,
      link: "/master/cms",
      type: "cms",
    },
    {
      title: "Holidays",
      icon: <FaRegCalendarAlt size={25} />,
      link: "/master/holidays",
      type: "holiday",
    },
    {
      title: "Videos Management",
      icon: <FaVideo size={25} />,
      link: "/master/videomanage",
      type: "video",
    },
    {
      title: "Discount Coupons",
      icon: <TbDiscount2 size={25} />,
      link: "/master/discounts",
      type: "coupon",
    },
    {
      title: "Contact Lists",
      icon: <FaRegAddressBook size={25} />,
      link: "/master/contactlist",
      type: "contact",
    },
    {
      title: "Manage Locations",
      icon: <MdOutlineLocationOn size={25} />,
      link: "/master/settings/location",
      type: "location",
    },
    {
      title: "Manage Specialization",
      icon: <MdOutlineCommentBank size={25} />,
      link: "/master/settings/specialization",
      type: "specialization",
    },
  ];

  let path = window.location.pathname.split("/", 3).join("/");

  const subadminpanel = [
    "dashboard",
    "doctor",
    "patient",
    "appointment",
    "invoice",
    "manager",
    "leadmanagement",
    "payment",
    "review",
    "report",
    "notification",
  ];

  sideNavData =
    localStorage.getItem("user_type") === "subadmin"
      ? sideNavData.filter((e) => subadminpanel.includes(e.type))
      : sideNavData;

  return (
    <div className="sidebar-offcanvas" id="sidebar" role="navigation">
      <Row>
        <Col md={3}>
          <ul className="nav flex-column sticky-top m-2 p-2">
            {sideNavData.map((el, id) => {
              return (
                <Link key={id} to={el.link} style={{ textDecoration: "none" }}>
                  <li
                    key={id}
                    className="nav-item pt-1 mb-2 rounded"
                    style={
                      path === el.link ? { backgroundColor: "#E4F1DD" } : {}
                    }
                  >
                    <Row className="mt-1">
                      <Col md={3} style={{ textAlign: "right" }}>
                        <span
                          style={
                            path === el.link
                              ? { color: "#76B757" }
                              : { color: "#858F94" }
                          }
                        >
                          {el.icon}
                        </span>
                      </Col>
                      <Col md={9} style={{ textAlign: "left" }}>
                        <span
                          className="ml-3"
                          style={
                            path === el.link
                              ? { color: "#76B757" }
                              : { color: "#858F94" }
                          }
                        >
                          {el.title}
                        </span>
                      </Col>
                    </Row>
                  </li>
                </Link>
              );
            })}
          </ul>
        </Col>
        <Col md={9}>
          <div
            style={{
              background: "#e9ecef",
              borderRadius: "7px",
              padding: "0.5%",
            }}
          >
            <div style={{ width: "98%", margin: "auto" }}>{props.children}</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Sidebar;
