import React, { useContext } from 'react'
import HeroSection from '../components/Hero'
import Compairing from '../components/Compairing'
import HowtoUse from '../components/HowtoUse'
import WhyUseIt from '../components/WhyWeuseIt'
import About from '../components/About'
import Contact from '../components/Conatct'
import { AdminContext } from '../context/AdminContext'
import AdminLogin from '../components/AdminLogin'
const HomeRoute = () => {
  const {isAdminClicked , setIsAdminClicked} = useContext(AdminContext);
  return (
    <div className="">
      {isAdminClicked && <AdminLogin isOpen={isAdminClicked} setIsOpen={setIsAdminClicked}/>}
      <HeroSection/>
      <Compairing/>
      <HowtoUse/>
      <WhyUseIt/>
      <About/>
      <Contact/>
    </div>
  )
}

export default HomeRoute
