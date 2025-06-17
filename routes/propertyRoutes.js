const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const authmiddleware = require("../middleware/auth");
const multer = require("../middleware/multer");

router.post("/create", authmiddleware.auth, multer.array("images", 5), propertyController.createProperty);
router.get("/getAllProperties", propertyController.getAllProperties);
router.put("/updateProperty/:id", authmiddleware.auth, propertyController.updateProperty);
router.delete("/deleteProperty/:id", authmiddleware.auth, propertyController.deleteProperty);

module.exports = router;
