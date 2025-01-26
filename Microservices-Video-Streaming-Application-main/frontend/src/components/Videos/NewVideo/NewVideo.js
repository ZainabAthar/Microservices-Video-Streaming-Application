import { useState, useRef } from 'react';
import { useAuthUser } from 'react-auth-kit'
import { useEffect } from 'react';
import styles from './NewVideo.module.css';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from "react-redux/es/exports";
import { setVideosData } from "../../../store/slices/UserSlice";
import axios, { AxiosError } from "axios";
const NewVideo = ({ onVideoAdded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const auth = useAuthUser()
  const fileInputRef = useRef(null);
  const ref = useRef(null);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedFiles.length > 0) {
      // Trigger form submission
      videoUploadHandler({ preventDefault: () => { } });
    }
  }, [selectedFiles]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const videoUploadHandler = async (event) => {
    event.preventDefault();
    ref.current.continuousStart();

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('videos', selectedFiles[i]); // This might cause issues
    }

    try {
      const token = auth().token;
      const userId = auth().userId;
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const url = `${process.env.REACT_APP_GALLERY_BACKEND}/videos/add/${userId}`;

      const config = {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      const response = await axios.post(url, formData, config);
      console.log(response)
      const data=response.data;
      console.log(data)
      
      dispatch(setVideosData({data}))
      toast.success('Video added successfully!');
      ref.current.complete();

    } catch (error) {
      console.log(error)
      // toast.error("Storage alert! Check your usage.");
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      ref.current.complete();
    }
  };

  return (
    <>
      <LoadingBar color='#FFB700' ref={ref} />
      <form encType="multipart/form-data" onSubmit={videoUploadHandler}>
      <input
        ref={fileInputRef}
        id="file"
        name="file"
        type="file"
        multiple
        onChange={handleFileChange}
        className={styles.fileInput}
      />
      <label htmlFor="file" className={styles.fileLabel}>
        <span className={styles.plusIcon}>+</span>
        <span>Choose files</span>
      </label>
      </form>
    </>
  );
};

export default NewVideo;