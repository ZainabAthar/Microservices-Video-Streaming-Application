const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { storage, cloudinary } = require("../cloudinary/index.js");
const multer = require("multer");
const upload = multer({ storage: storage });
const { Gallery } = require("../models/GallerySchema");
const formidable = require('formidable');
const path =require("path");
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "Authorization token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const fileExtension = path.extname(file.originalFilename).toLowerCase();
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv', '.webm', '.ogg'];
    const resourceType = videoExtensions.includes(fileExtension) ? 'video' : 'image';

    cloudinary.uploader.upload(
      file.filepath,
      { resource_type: resourceType, folder: 'photogallery' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

router.get("/:userId", verifyToken, async (req, res) => {
  const userId = req.params.userId;

  try {
    const userGallery = await Gallery.findOne({ userId });

    if (!userGallery) {
      return res.status(404).json({ error: 'User gallery not found' });
    }

    res.status(200).json({ gallery: userGallery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user gallery' });
  }
});

router.post("/add/:userId", async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async(err, fields, files) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error occurred during file upload");
      return;
    }

    const userId = req.params.userId;
    const videos = Object.values(files.videos); 
    try {
      const videoLinks = [];
      const totalSizeKB = videos.reduce((acc, video) => acc + video.size, 0) / 1024; 
      const userGallery = await Gallery.findOne({ userId });

      if (!userGallery) {
        return res.status(404).json({ error: 'User gallery not found' });
      }

      if (totalSizeKB > userGallery.freeStorage) {
        return res.status(400).json({ error: 'video size exceeds available storage' });
      }
      if(totalSizeKB > userGallery.freeBandwidth){
        return res.status(400).json({ error: 'video size exceeds available bandwidth for today' });
        
      }
      const validExtensions = [
        '.mp4', 
        '.avi', 
        '.mov', 
        '.mkv', 
        '.wmv', 
        '.flv', 
        '.webm', 
        '.ogg', 
        '.3gp', 
        '.mpeg', 
        '.mpg', 
        '.m4v', 
        '.asf', 
        '.vob', 
        '.rm', 
        '.rmvb', 
        '.ts'
      ];
      
      
      for (const video of videos) {
        const fileExtension = path.extname(video.originalFilename).toLowerCase();
      console.log(fileExtension)
      if (!validExtensions.includes(fileExtension)) {
        console.log("hereeee in invlid extension")
        return res.status(400).json({ error: 'Invalid file extension.' });
      }
      }
      const videosEv=[];
      for (const video of videos) {
        const uploadedvideo = await uploadToCloudinary(video);
        const newvideo = {
          title: video.originalFilename,
          size: video.size/1024,
          videoLink: uploadedvideo.secure_url,
          publicId:uploadedvideo.public_id,
          type: uploadedvideo.resource_type,
        };
        videoLinks.push(uploadedvideo.secure_url);
        userGallery.videos.push(newvideo);
        userGallery.freeStorage-=newvideo.size;
        userGallery.freeBandwidth-=newvideo.size;
        videosEv.push(newvideo)
      }





     
      


      
      await userGallery.save();
      const gallery=userGallery;
      try{
        await axios.post(`${process.env.EVENT_SERV}/events`, {
           type: "videosAdded",
           data: {
            userId,
            videosEv,
            gallery: gallery
           },
          });
        }
        catch(error){
          console.log(error)
      }
      res.status(200).json({ links: videoLinks, gallery: gallery });
    }catch(error){
      
      console.error(error);
      res.status(500).json({ error: 'Failed to upload videos' });
    }
  });
  });

  router.delete("/:userId/:videoId", verifyToken, async (req, res) => {
    const userId = req.params.userId;
    const videoId = req.params.videoId;
    try {
      const userGallery = await Gallery.findOne({ userId });
  
      if (!userGallery) {
        return res.status(404).json({ error: "User gallery not found" });
      }
  
      const videoToDelete = userGallery.videos.id(videoId);
      if (!videoToDelete) {
        return res.status(404).json({ error: "video not found" });
      }
  
      const videoSize = videoToDelete.size;
      await cloudinary.uploader.destroy(videoToDelete.publicId);
  
      const videoDocument = videoToDelete.toObject(); 
      userGallery.videos.pull({ _id: videoDocument._id });
      await userGallery.save();
      console.log(videoSize)
      try{
        await axios.post(`${process.env.EVENT_SERV}/events`, {
           type: "videoRemoved",
           data: {
            userId,
            videoId,
            videoSize,
            gallery: userGallery
           },
          });
        }
        catch(error){
          console.log(error)
        }
        res.status(200).json({ message: "video deleted successfully", gallery: userGallery });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ error: "Failed to delete video" });
    }
  });

module.exports = router;
