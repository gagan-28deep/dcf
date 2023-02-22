import DocImage from "./docPageImage/DocImage";
import DocPageVideo from "./docPageVideo/DocPageVideo";
import DocFacilities from "./docPageFacilities/DocFacilities";
import MultiImages from "./multiImages/MultiImages";
import DoctorFooter from "./doctorFooter/DoctorFooter";
const DoctorsPage = () => {
  const docArr = [
    "https://doctonet.in/wp-content/uploads/2022/09/14.jpg",
    "https://doctonet.in/wp-content/uploads/2022/09/10.jpg",
  ];
  return (
    <>
      <DocImage />
      <DocPageVideo />
      <DocFacilities />
      <MultiImages />
      <DoctorFooter />
    </>
  );
};

export default DoctorsPage;
