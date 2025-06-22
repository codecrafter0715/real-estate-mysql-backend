const Property = require("../models/PropertyModel");

const createProperty = async (req, res) => {
  console.log(req.body); 
  console.log(req.files); 

  const { title, price, location, description, type } = req.body;

  // Check if req.files is defined and is an array
//   if (!req.files || !Array.isArray(req.files)) {
//     return res.status(400).send({ message: "No images uploaded" });
//   }

  // Use req.files to get multiple uploaded files
  const images = req.files.map((file) => file.filename); // Store filenames of all uploaded images

  try {
    if (!req.user.isAdmin) {
      return res.status(401).send({ message: "Not Authorized" });
    }

    const existingProperty = await Property.findOne({
      where: { title, location },
    });
    if (existingProperty) {
      return res.status(400).send({
        message: "Property already exists with this title and location",
      });
    }

    const newProperty = await Property.create({
      title,
      price,
      location,
      description,
      type,
      image: images, 
    });
    console.log("New Property Created:", newProperty); 

    res.status(201).send({
      success: true,
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error("Error creating property:", error); 
    res.status(500).send({ success: false, error: error.message });
  }
};


const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();

    const modifiedProperties = properties.map((property) => ({
      id: property.id,
      title: property.title,
      price: property.price,
      location: property.location,
      description: property.description,
      type: property.type,
      image:
        property.image && property.image.length > 0
          ? property.image.map((img) => `http://localhost:7000/uploads/${img}`) // Map to full URLs
          : null,
    }));

    res.status(200).send({ properties: modifiedProperties, success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};


const getPropertyByID = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findOne({ where: { id } });
    if (!property) {
      return res.status(404).send({ error: "Property not found" });
    } else {
      res.status(200).send({ property, success: true });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, location, description, type } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!req.user.isAdmin) {
      return res.status(401).send({ message: "Not Authorized" });
    }

    const updateData = { title, price, location, description, type };
    if (image) updateData.image = image; // only update image if uploaded

    const [updated] = await Property.update(updateData, { where: { id } });

    if (updated) {
      res
        .status(200)
        .send({ message: "Property updated successfully", success: true });
    } else {
      res.status(404).send({ error: "Property not found", success: false });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user.isAdmin) {
      return res.status(401).send({ message: "Not Authorized" });
    }

    const deleted = await Property.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send({ error: "Property not found" });
    } else {
      res
        .status(200)
        .send({ message: "Property deleted successfully", success: true });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Export all functions using CommonJS
module.exports = {
  createProperty,
  getAllProperties,
  getPropertyByID,
  updateProperty,
  deleteProperty,
};
