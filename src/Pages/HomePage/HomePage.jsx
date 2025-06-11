import React from 'react'
import Banner1 from '../../components/Banner1/Banner1'
import Appointment from '../../components/Appoinment/Appoinment'
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs'
import Category from '../../components/Category/Category'
import ServicesSlider from '../../components/ServicesSlider/ServiceSlider'
import OurServices from '../OurServices/OurServices'
import OurCategories from '../OurCategories/OurCategories'
import WelcomeCompo1 from '../../components/WelcomeComponent/WelcomeCompo1'
import WorkingHour from '../../components/WorkingHourComponent/WorkingHour'
import CallToAction from '../../components/CallToAction/callToAction'
import HealthBenefits from '../../components/HealthBenefits/HealthBenefits'
const HomePage = () => {
  return (
    <div className=''>
<Banner1/>
<WorkingHour/>
<WelcomeCompo1/>
<WhyChooseUs/>
<Appointment/>
<ServicesSlider/>
<Category/>
<CallToAction/>
<HealthBenefits/>

    </div>
  )
}

export default HomePage
