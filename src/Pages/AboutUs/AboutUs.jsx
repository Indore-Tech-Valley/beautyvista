import React from "react";
import BreadcrumbBanner from "../../components/BreadcrumbBanner/BreadcrumbBanner";
import WelcomeCompo1 from "../../components/WelcomeComponent/WelcomeCompo1";
import Expertise from "../../components/Expertise/Expertise";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import CallToAction from "../../components/CallToAction/CallToAction";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 md:pt-0 pt-12">
      {/* Breadcrumb */}
      <BreadcrumbBanner
        title="About Us"
        path="Home"
        image="https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-1147811403-612x612-1.jpg"
      />
<WelcomeCompo1/>
<Expertise/>
<CallToAction/>
<WhyChooseUs/>

      {/* Main Content */}
   
    </div>
  );
};

export default AboutUs;
