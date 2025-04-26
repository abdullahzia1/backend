import admin from "firebase-admin";
import multer from "multer";
import dotenv from "dotenv";
import Product from "../models/productModel.js";

dotenv.config();

// Firebase Service Account Configuration
const serviceAccount = {
  type: process.env.FIREBASE_SERVICE_type,
  project_id: process.env.FIREBASE_SERVICE_project_id,
  private_key_id: process.env.FIREBASE_SERVICE_private_key_id,
  private_key: process.env.FIREBASE_SERVICE_private_key.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_SERVICE_client_email,
  client_id: process.env.FIREBASE_SERVICE_client_id,
  auth_uri: process.env.FIREBASE_SERVICE_auth_uri,
  token_uri: process.env.FIREBASE_SERVICE_token_uri,
  auth_provider_x509_cert_url:
    process.env.FIREBASE_SERVICE_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.FIREBASE_SERVICE_client_x509_cert_url,
  universe_domain: process.env.FIREBASE_SERVICE_universe_domain,
};

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASECONFIG_storageBucket,
});

const bucket = admin.storage().bucket();

// Multer configuration for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Function to handle file upload
const uploadFile = (req, res) => {
  const { id: productId } = req.params;

  const file = bucket.file(Date.now() + "_" + req.file.originalname);
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on("error", (err) => {
    console.error(err);
    res.status(500).json({ error: "Upload error" });
  });

  stream.on("finish", async () => {
    await file.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { image: publicUrl },
        { new: true } // Returns the updated document
      );

      return res
        .status(201)
        .json({ message: "Image Uploaded Successfully", image: publicUrl });
    } catch (err) {
      res.status(500).json({ error: "Error saving image URL to database" });
    }
  });

  stream.end(req.file.buffer);
};

// Export the multer upload middleware and the upload function
export const uploadMiddleware = upload.single("image");
export { uploadFile };
