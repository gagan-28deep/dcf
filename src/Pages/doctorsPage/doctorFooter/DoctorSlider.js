import React from "react";
import Slider from "react-slick";
import Card from "react-bootstrap/Card";
import ImageSlider from "./ImageSlider";
const DoctorSlider = () => {
  const docArr = [
    "https://doctonet.in/wp-content/uploads/2022/09/14.jpg",
    "https://doctonet.in/wp-content/uploads/2022/09/10.jpg",
  ];
  // return (
  //   <Slider>
  //     {docArr.map((el) => {
  //       return (
  //         <Card>
  //           <img src={el} alt="Title" />
  //         </Card>
  //       );
  //     })}
  //   </Slider>
  // );
  //   return (
  //     <ImageSlider
  //       images=
  //       {docArr.map((el) => {
  //         return (
  //           <Card>
  //             <img src={el} alt="Title" />
  //           </Card>
  //         );
  //       })}
  //     />
  //   );
  return (
    <div>
      {docArr.map((el) => {
        return (
          <Card>
            <img src={el} alt="Image" />
          </Card>
        );
      })}
    </div>
  );
};

export default DoctorSlider;
