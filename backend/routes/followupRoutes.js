import express from "express";
import followupController from "../controllers/followupController.js";

const router = express.Router();

// Define the 'stats' route separately, not as part of the '/:id' parameter.
router.route("/stats").get(followupController.getCustomerStats);

// Other routes remain as they are...
router
  .route("/")
  .get(followupController.getFollowups)
  .post(followupController.createFollowup);

router
  .route("/:id")
  .get(followupController.getFollowupById)
  .put(followupController.updateFollowup)
  .delete(followupController.deleteFollowup);

router.route("/:id/notes").post(followupController.addNote);

router.route("/:id/lastCalled").patch(followupController.updateLastCalled);

// PATCH request to update services
router.patch("/:id/services", followupController.updateServices);


export default router;
