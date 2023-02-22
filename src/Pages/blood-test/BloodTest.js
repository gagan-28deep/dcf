import React from "react";
import BloodTestCardsData from "./bloodTestCards/BloodTestCardsData";
import BloodFacilities from "./bloodTestFacilities/BloodFacilities";
import BloodHeader from "./bloodTestHEader/BloodHeader";
import BloodTestLabs from "./bloodTestLAbs/BloodTestLabs";
import BloodTestTesting from "./bloodTestTesting/BloodTestTesting";
import WhyChooseUs from "./whychooseUs/WhyChooseUs";

const BloodTest = () => {
  return (
    <>
      <BloodHeader />
      <BloodTestTesting />
      <BloodTestCardsData />
      <WhyChooseUs/>
      <BloodTestLabs />
      <BloodFacilities />
    </>
  );
};

export default BloodTest;
