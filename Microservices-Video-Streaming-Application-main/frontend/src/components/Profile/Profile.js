import { useState, useEffect } from "react";
import VideosHero from "../Videos/VideoHero/VideoHero";
import { useSelector, useDispatch } from "react-redux/es/exports";
const Profile = () => {
  const [profile, setProfile] = useState({ username: "", email: "" });

  const [storage, setStorage] = useState(0);
  const [bandwidth, setBandwidth] = useState(0);
  const user = useSelector((state) => state.users.userData);

  useEffect(() => {
    if (user.email) {
      setProfile({
        username: user.username,
        email: user.email,
      });
      setBandwidth(100000-user.usage.bandwidthDailyUsage)
    }
    if(user.storage.FreeStorage){
        setStorage(user.storage.FreeStorage)
      }
      if(user.usage.bandwidthDailyUsage){
      
      }
  }, [user]);
  return (
    <>
    <VideosHero storage={storage} bandwidth={bandwidth} profile={profile}/>
    </>
  );
};

export default Profile;
