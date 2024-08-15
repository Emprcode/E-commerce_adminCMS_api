import cloudinaryModule from "cloudinary";

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// const b64 = Buffer?.from(req.files[0].buffer).toString("base64");
// let dataURI = "data:" + req.files[0].mimetype + ";base64," + b64;
// if (req.files) {
//   const uploadedResponse = await cloudinary.uploader.upload(dataURI, {
//     upload_preset: "acexsports",
//   });
// }
