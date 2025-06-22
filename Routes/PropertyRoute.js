const express = require('express');
const propertyController = require('../controllers/PropertyController');
const multerMiddleware = require('../middleware/multer');
const authMiddleware = require('../middleware/auth');

const router = express.Router();


router.post('/create', authMiddleware.auth, multerMiddleware.array('images', 5), propertyController.createProperty);
router.get('/getAllProperties', propertyController.getAllProperties);
router.get('/getPropertyByID/:id', propertyController.getPropertyByID);
router.put('/updateProperty/:id', authMiddleware.auth, multerMiddleware.array('images', 5), propertyController.updateProperty);
router.delete('/deleteProperty/:id', authMiddleware.auth, propertyController.deleteProperty);

module.exports = router;
