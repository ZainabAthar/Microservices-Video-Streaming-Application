import MainNavigation from "../components/MainNavigation/MainNavigation";
import { useIsAuthenticated } from "react-auth-kit";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile/Profile"
import Footer from "../components/Footer/Footer";
const VideosPage = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated() ? (
        <>
          <MainNavigation />
          <Profile />
          <Footer/>
        </>
      ) : ""}
    </>
  );
};

export default VideosPage;
