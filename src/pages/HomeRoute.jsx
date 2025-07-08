import React, { useContext } from 'react'
import HeroSection from '../components/Hero'
import Compairing from '../components/Compairing'
import HowtoUse from '../components/HowtoUse'
import WhyUseIt from '../components/WhyWeuseIt'
import About from '../components/About'
import Contact from '../components/Conatct'
import { AdminContext } from '../context/AdminContext'
import AdminLogin from '../components/AdminLogin'
import BlogsCard from '../components/BlogCard'
import { Link } from 'react-scroll'
const HomeRoute = () => {
  const {isAdminClicked , setIsAdminClicked} = useContext(AdminContext);
  return (
    <div className="">
      {isAdminClicked && <AdminLogin isOpen={isAdminClicked} setIsOpen={setIsAdminClicked}/>}
      <HeroSection/>
      <Compairing/>
      <Link to="blogs" smooth={true} duration={500}>
      <BlogsCard/>
      </Link>
      <HowtoUse/>
      <WhyUseIt/>
      <Link to="about" smooth={true} duration={500}>
      <About/>
      </Link>
      <About/>
      <Link to="contact" smooth={true} duration={500}>
      <Contact/>
      </Link>
    </div>
  )
}

export default HomeRoute
