// import PageContent from "../components/PageContent.js";
import MainNavigation from "../components/MainNavigation/MainNavigation";
// import myImage from "../components/Images/stretched-5120-2880-1324823.jpeg";
// import classes from './HomePage.module.css';

// import myImage from "../../public/images/home.jpg";
import styles from './HomePage.module.css';

import './styles.css';
import Footer from '../components/Footer/Footer'
import HomeCards from "../components/HomeCards/HomeCards";
import Welcome from "../components/Welcome/Welcome";
import About from "../components/About/About";


const HomePage = () => {



  return (
    <>


      <MainNavigation />

      <Welcome/>

      <About />


      <HomeCards/>

      <Footer/>



    </>
  );
};

export default HomePage;