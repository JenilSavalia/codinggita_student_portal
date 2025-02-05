// Connecting with Cloudinary
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'db1eybiaj',
    api_key: '551227958826176',
    api_secret: 'A6k3tkjC1Bnt4GFEYAJRD8bs3HM'
});

const react = "./Navbar_Logo.png";
const video = "./Video-229.mp4";
// function to upload image , and return image url

const uploadImage = async (react) => {
  try {
    const results = await cloudinary.uploader.upload(react);
    console.log("Image URL: ", results.secure_url);
    return results.secure_url;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const uploadVideo = async (video) => {
  try {
    const results = await cloudinary.uploader.upload(video, {
      resource_type: "video",
    });
    console.log("Video: ", results.secure_url);
    return results.secure_url;
  } catch (error) {
    console.error(error);
    return null;
  }
};
uploadImage(react);
uploadVideo(video);


