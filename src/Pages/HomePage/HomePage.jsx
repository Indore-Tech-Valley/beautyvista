import React from 'react'
import Banner1 from '../../components/Banner1/Banner1'
import Appointment from '../../components/Appoinment/Appoinment'
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs'
import Category from '../../components/Category/Category'
import ServicesSlider from '../../components/ServicesSlider/ServiceSlider'
import OurServices from '../OurServices/OurServices'
import OurCategories from '../OurCategories/OurCategories'
const HomePage = () => {
  return (
    <div className=''>
<Banner1/>
<WhyChooseUs/>
<Appointment/>
<ServicesSlider/>
<Category/>

    </div>
  )
}

export default HomePage
