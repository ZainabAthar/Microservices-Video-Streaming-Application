import NewVideo from "./NewVideo/NewVideo";
import { useState,useEffect } from "react";
import ExistingVideos from "./ExistingVideos/ExistingVideos";
import VideosHero from "./VideoHero/VideoHero";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux/es/exports";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const user = useSelector((state) => state.users.userData);
  useEffect(() => {
    if(user.gallery.videos[0]){
      setVideos(user.gallery.videos)
    }
    console.log(user)
  }, [user]);

  return (
    <>
      <NewVideo/>
      <ExistingVideos videos={videos} />
      <Footer/>

    </>
  );
};

export default Videos;
