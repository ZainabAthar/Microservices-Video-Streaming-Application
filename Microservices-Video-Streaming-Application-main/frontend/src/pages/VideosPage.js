import Videos from "../components/Videos/Videos";
import MainNavigation from "../components/MainNavigation/MainNavigation";
import { useIsAuthenticated } from "react-auth-kit";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
          <Videos />
        </>
      ) : ""}
    </>
  );
};

export default VideosPage;
