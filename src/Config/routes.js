import React, { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import AdminNavbar from "../Admin/SideNav/AdminNavbar";
import BloodTest from "../Pages/blood-test/BloodTest";
import HomeCare from "../Pages/home-care";
import Physiotherapy from "../Pages/physiotherapy";
import Surgeries from "../Pages/surgeries";
const Dashboard = React.lazy(() =>
  import("../Admin/Pages/dashboard/Dashboard")
);
const Home = React.lazy(() => import("../Pages/Home/home"));
const AboutUs = React.lazy(() => import("../Pages/Cms/about"));
// const Consult = React.lazy(() => import("../Pages/consult"));
const Speciality = React.lazy(() => import("../Pages/speciality/speciality"));
const FindDoctor = React.lazy(() => import("../Pages/find-doctor"));
const Corporate = React.lazy(() => import("../Pages/corporate"));
const DoctorsPage = React.lazy(() => import("../Pages/doctorsPage/doctors"));
const BloodTestPage = React.lazy(() =>
  import("../Pages/bloodTestPage/BloodTest.js")
);
const TermsandCondition = React.lazy(() =>
  import("../Pages/Cms/termsandcondition")
);
const Privacypolicy = React.lazy(() => import("../Pages/Cms/privacy"));
const SearchDoc = React.lazy(() => import("../Pages/Search/searchdoc"));
const DoctorDetails = React.lazy(() => import("../Pages/consultDetail/index"));
const AdminSignin = React.lazy(() => import("../Admin/siginin/AdminSigin"));
const Staff = React.lazy(() => import("../Admin/Pages/staff/Staff"));
const Doctors = React.lazy(() => import("../Admin/Pages/doctors/Doctors"));
const Patients = React.lazy(() => import("../Admin/Pages/patients/Patients"));
const Invoice = React.lazy(() => import("../Admin/Pages/invoice/index"));
const Clinic = React.lazy(() => import("../Admin/Pages/clinic/Clinic"));
const Addstaff = React.lazy(() => import("../Admin/Pages/staff/AddStaff"));
const Appointments = React.lazy(() =>
  import("../Admin/Pages/appointement/Appointements")
);
const ClinicManagers = React.lazy(() =>
  import("../Admin/Pages/managers/Clinicmanagers")
);
const Payments = React.lazy(() => import("../Admin/Pages/payment/Payments"));
const Reviews = React.lazy(() => import("../Admin/Pages/reviews/Reviews"));
const Notification = React.lazy(() =>
  import("../Admin/Pages/notification/Notification")
);
const Banners = React.lazy(() => import("../Admin/Pages/banners/Banners"));
const AdminCms = React.lazy(() => import("../Admin/Pages/cms/Cms"));
const AdminContact = React.lazy(() => import("../Admin/Pages/contact/Contact"));
const Staffdetails = React.lazy(() =>
  import("../Admin/Pages/staff/Staffdetails")
);
const EditStaff = React.lazy(() => import("../Admin/Pages/staff/EditStaff"));
const Clinicdetails = React.lazy(() =>
  import("../Admin/Pages/clinic/Clinicdetails")
);
const Rooms = React.lazy(() => import("../Admin/Pages/rooms/Rooms"));
const AddClinic = React.lazy(() => import("../Admin/Pages/clinic/AddClinic"));
const Editclinic = React.lazy(() => import("../Admin/Pages/clinic/EditClinic"));
const RoomDetails = React.lazy(() =>
  import("../Admin/Pages/rooms/RoomDetails")
);
const AddRoom = React.lazy(() => import("../Admin/Pages/rooms/AddRoom"));
const Addcms = React.lazy(() => import("../Admin/Pages/cms/Addcms"));
const CmsDetails = React.lazy(() => import("../Admin/Pages/cms/CmsDetails"));
const Editcms = React.lazy(() => import("../Admin/Pages/cms/Editcms"));
const EditRoom = React.lazy(() => import("../Admin/Pages/rooms/EditRoom"));
const Adddoctor = React.lazy(() => import("../Admin/Pages/doctors/AddDoctors"));
const EditDoctor = React.lazy(() =>
  import("../Admin/Pages/doctors/EditDoctor")
);
const DoctordetailsAdmin = React.lazy(() =>
  import("../Admin/Pages/doctors/Doctordetails")
);
const Doctorsession = React.lazy(() =>
  import("../Admin/Pages/doctors/Doctorsession")
);
const AddInvoice = React.lazy(() =>
  import("../Admin/Pages/invoice/AddInvoice")
);
const EditInvoice = React.lazy(() =>
  import("../Admin/Pages/invoice/EditInvoice")
);
const ViewInvoice = React.lazy(() =>
  import("../Admin/Pages/invoice/ViewInvoice")
);
const AddPatient = React.lazy(() =>
  import("../Admin/Pages/patients/AddPatient")
);
const EditPatient = React.lazy(() =>
  import("../Admin/Pages/patients/EditPatient")
);
const PatientDetails = React.lazy(() =>
  import("../Admin/Pages/patients/PatientDetails")
);
const BookAppointment = React.lazy(() =>
  import("../Admin/Pages/patients/Bookappointment")
);
const AddManager = React.lazy(() =>
  import("../Admin/Pages/managers/Addmanager")
);
const ManagerDetails = React.lazy(() =>
  import("../Admin/Pages/managers/ManagerDetails")
);
const EditManager = React.lazy(() =>
  import("../Admin/Pages/managers/EditManager")
);
const ReviewDetails = React.lazy(() =>
  import("../Admin/Pages/reviews/ReviewDetails")
);
const AppointmentDetails = React.lazy(() =>
  import("../Admin/Pages/appointement/AppointmentDetails")
);
const BannerDetails = React.lazy(() =>
  import("../Admin/Pages/banners/BannerDetails")
);
const AddBanner = React.lazy(() => import("../Admin/Pages/banners/AddBanner"));
const EditBanner = React.lazy(() =>
  import("../Admin/Pages/banners/EditBanner")
);
const Reports = React.lazy(() => import("../Admin/Pages/reports/Reports"));
const ReportUtils = React.lazy(() => import("../Admin/Pages/reports/CliUtil"));
const OnlinePayments = React.lazy(() =>
  import("../Admin/Pages/reports/OnlinePayments")
);
const Coupons = React.lazy(() => import("../Admin/Pages/coupons/Coupons"));
const Consultation = React.lazy(() =>
  import("../Admin/Pages/consultation/Consultation")
);
const DoctorQuery = React.lazy(() =>
  import("../Admin/Pages/doctorQuery/doctorQuery.js")
);
const BLoodTest = React.lazy(() =>
  import("../Admin/Pages/bloodTest/bloodTest.js")
);
const VideoManagement = React.lazy(() =>
  import("../Admin/Pages/videomanagement/Videomanagement")
);
const HolidayManage = React.lazy(() =>
  import("../Admin/Pages/holidays/HolidaysManage")
);
const ContactUsDetails = React.lazy(() =>
  import("../Admin/Pages/contact/ContactDetails")
);
const AddclinicManager = React.lazy(() =>
  import("../Admin/Pages/clinic/Addclinicmanager")
);
const ManageLocation = React.lazy(() =>
  import("../Admin/Pages/settings/ManageLocation")
);
const AddLocation = React.lazy(() =>
  import("../Admin/Pages/settings/AddLocation")
);
const EditLocation = React.lazy(() =>
  import("../Admin/Pages/settings/EditLocation")
);
const ManageSpecialization = React.lazy(() =>
  import("../Admin/Pages/settings/ManageSpec")
);

const Leadmanagement = React.lazy(() =>
  import("../Admin/Pages/leadmanagement/LeadManagement")
);
const AddLeads = React.lazy(() =>
  import("../Admin/Pages/leadmanagement/Addleads")
);
const Editleads = React.lazy(() =>
  import("../Admin/Pages/leadmanagement/Editleads")
);
const LeadDetails = React.lazy(() =>
  import("../Admin/Pages/leadmanagement/LeadDetails")
);

const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/aboutus"
        element={
          <Suspense fallback={<Spinner />}>
            <AboutUs />
          </Suspense>
        }
      />
      <Route
        path="/video-consult"
        element={
          <Suspense fallback={<Spinner />}>
            <Speciality />
          </Suspense>
        }
      />
      <Route
        path="/find-doctor"
        element={
          <Suspense fallback={<Spinner />}>
            <FindDoctor />
          </Suspense>
        }
      />
      <Route
        path="/surgeries"
        element={
          <Suspense fallback={<Spinner />}>
            <Surgeries />
          </Suspense>
        }
      />
      <Route
        path="/physiotherapy"
        element={
          <Suspense fallback={<Spinner />}>
            <Physiotherapy />
          </Suspense>
        }
      />
      <Route
        path="/home-care"
        element={
          <Suspense fallback={<Spinner />}>
            <HomeCare />
          </Suspense>
        }
      />
      <Route
        path="/corporate"
        element={
          <Suspense fallback={<Spinner />}>
            <Corporate />
          </Suspense>
        }
      />
      <Route
        path="/doctorsQuery"
        element={
          <Suspense fallback={<Spinner />}>
            <DoctorsPage />
          </Suspense>
        }
      />
      <Route
        path="/blood-test"
        element={
          <Suspense fallback={<Spinner />}>
            <BloodTestPage />
          </Suspense>
        }
      />
      <Route
        path="/termsandcondition"
        element={
          <Suspense fallback={<Spinner />}>
            <TermsandCondition />
          </Suspense>
        }
      />
      <Route
        path="/privacy"
        element={
          <Suspense fallback={<Spinner />}>
            <Privacypolicy />
          </Suspense>
        }
      />
      <Route
        path="/doctor/search"
        element={
          <Suspense fallback={<Spinner />}>
            <SearchDoc />
          </Suspense>
        }
      />
      <Route
        path="/doctor-detail/:id/:name"
        element={
          <Suspense fallback={<Spinner />}>
            <DoctorDetails />
          </Suspense>
        }
      />
      {/* Admin */}
      <Route
        path="/admin-signin"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminSignin />
          </Suspense>
        }
      />
      <Route
        path="/master/dashboard"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Dashboard />
          </Suspense>
        }
      />
      <Route
        path="/master/staff"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Staff />
          </Suspense>
        }
      />
      <Route
        path="/master/staff/add-staff"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Addstaff />
          </Suspense>
        }
      />
      <Route
        path="/master/staff/view-staff/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Staffdetails />
          </Suspense>
        }
      />
      <Route
        path="/master/staff/edit-staff/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <EditStaff />
          </Suspense>
        }
      />
      <Route
        path="/master/doctors"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Doctors />
          </Suspense>
        }
      />
      <Route
        path="/master/doctors/add"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Adddoctor />
          </Suspense>
        }
      />
      <Route
        path="/master/doctors/view/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <DoctordetailsAdmin />
          </Suspense>
        }
      />
      <Route
        path="/master/doctors/session/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Doctorsession />
          </Suspense>
        }
      />
      <Route
        path="/master/doctors/edit/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <EditDoctor />
          </Suspense>
        }
      />
      <Route
        path="/master/patients"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Patients />
          </Suspense>
        }
      />
      <Route
        path="/master/invoice"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Invoice />
          </Suspense>
        }
      />
      <Route
        path="/master/invoice/add"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <AddInvoice />
          </Suspense>
        }
      />
      <Route
        path="/master/invoice/edit/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <EditInvoice />
          </Suspense>
        }
      />
      <Route
        path="/master/invoice/view/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <ViewInvoice />
          </Suspense>
        }
      />
      <Route
        path="/master/patients/add"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <AddPatient />
          </Suspense>
        }
      />
      <Route
        path="/master/patients/view/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <PatientDetails />
          </Suspense>
        }
      />
      <Route
        path="/master/patients/edit/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <EditPatient />
          </Suspense>
        }
      />
      <Route
        path="/master/patients/bookappointment/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <BookAppointment />
          </Suspense>
        }
      />
      <Route
        path="/master/patients/bookappointment/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <BookAppointment />
          </Suspense>
        }
      />
      <Route
        path="/master/clinics"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Clinic />
          </Suspense>
        }
      />
      <Route
        path="/master/clinics/clnic-view/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Clinicdetails />
          </Suspense>
        }
      />
      <Route
        path="/master/clinics/add-clinic"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <AddClinic />
          </Suspense>
        }
      />
      <Route
        path="/master/clinics/edit/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Editclinic />
          </Suspense>
        }
      />
      <Route
        path="/master/clinics/rooms"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Rooms />
          </Suspense>
        }
      />
      <Route
        path="/master/clinics/room/view/:clinicId/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <RoomDetails />
          </Suspense>
        }
      />
      <Route
        path="/master/clinics/room/addroom/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <AddRoom />
          </Suspense>
        }
      />
      <Route
        path="/master/clinics/room/edit/:clinicId/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <EditRoom />
          </Suspense>
        }
      />
      <Route
        path="/master/appointments"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Appointments />
          </Suspense>
        }
      />
      <Route
        path="/master/appointments/view/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <AppointmentDetails />
          </Suspense>
        }
      />
      {/* <Route
        path="/master/receptionist"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <ClinicManagers />
          </Suspense>
        }
      />
      <Route
        path="/master/receptionist/add"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <AddManager />
          </Suspense>
        }
      />
      <Route
        path="/master/receptionist/view/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <ManagerDetails />
          </Suspense>
        }
      />
      <Route
        path="/master/receptionist/edit/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <EditManager />
          </Suspense>
        }
      /> */}
      <Route
        path="/master/patient-booking"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Payments />
          </Suspense>
        }
      />
      <Route
        path="/master/review-rating"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Reviews />
          </Suspense>
        }
      />
      <Route
        path="/master/review-rating/view/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <ReviewDetails />
          </Suspense>
        }
      />
      <Route
        path="/master/notificationmanagement"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Notification />
          </Suspense>
        }
      />
      <Route
        path="/master/banner"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Banners />
          </Suspense>
        }
      />
      <Route
        path="/master/banner/view/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <BannerDetails />
          </Suspense>
        }
      />
      <Route
        path="/master/banner/add"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <AddBanner />
          </Suspense>
        }
      />
      <Route
        path="/master/banner/edit/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <EditBanner />
          </Suspense>
        }
      />
      <Route
        path="/master/reports"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Reports />
          </Suspense>
        }
      />
      <Route
        path="/master/reports/cliutil"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <ReportUtils />
          </Suspense>
        }
      />
      <Route
        path="/master/reports/online_pay"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <OnlinePayments />
          </Suspense>
        }
      />
      <Route
        path="/master/cms"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <AdminCms />
          </Suspense>
        }
      />
      <Route
        path="/master/cms/add"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Addcms />
          </Suspense>
        }
      />
      <Route
        path="/master/cms/view/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <CmsDetails />
          </Suspense>
        }
      />
      <Route
        path="/master/cms/edit/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Editcms />
          </Suspense>
        }
      />
      <Route
        path="/master/contactlist"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <AdminContact />
          </Suspense>
        }
      />
      <Route
        path="/master/discounts"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Coupons />
          </Suspense>
        }
      />
      <Route
        path="/master/consulting"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Consultation />
          </Suspense>
        }
      />
      <Route
        path="/master/doctorQuery"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <DoctorQuery />
          </Suspense>
        }
      />
      <Route
        path="/master/bloodTest"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <BLoodTest />
          </Suspense>
        }
      />
      <Route
        path="/master/leadmanagement"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Leadmanagement />
          </Suspense>
        }
      />
      <Route
        path="/master/leadmanagement/view/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <LeadDetails />
          </Suspense>
        }
      />
      <Route
        path="/master/leadmanagement/add"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <AddLeads />
          </Suspense>
        }
      />
      <Route
        path="/master/leadmanagement/edit/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <Editleads />
          </Suspense>
        }
      />
      <Route
        path="/master/videomanage"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <VideoManagement />
          </Suspense>
        }
      />
      <Route
        path="/master/holidays"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <HolidayManage />
          </Suspense>
        }
      />
      <Route
        path="/master/contactlist/view/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <ContactUsDetails />
          </Suspense>
        }
      />
      <Route
        path="/master/clinics/add-clinic-manager/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <AddclinicManager />
          </Suspense>
        }
      />
      <Route
        path="/master/settings/location"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <ManageLocation />
          </Suspense>
        }
      />
      <Route
        path="/master/settings/location/add"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <AddLocation />
          </Suspense>
        }
      />
      <Route
        path="/master/settings/location/edit/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <EditLocation />
          </Suspense>
        }
      />
      <Route
        path="/master/settings/specialization"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminNavbar />
            <ManageSpecialization />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Routing;
