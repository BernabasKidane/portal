import { Router } from "express";
import multer, { diskStorage } from "multer";
import { uploadResource, getResourceCount, getAllResources, getPdfResources } from "../controllers/resourceController.js";

// Configure multer storage settings
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = Router();

// POST route to upload resource
router.post("/upload", upload.single("file"), uploadResource);

// GET route to get count of resources
router.get('/count', getResourceCount);

// GET route to get all resources
router.get('/', getAllResources); // New route for fetching all resources

// GET route to get all PDF resources
router.get('/pdf', getPdfResources);

// Export the router
export default router;