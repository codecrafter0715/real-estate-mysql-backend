const Property = require("../models/property");

const createProperty = async (req, res) => {
  const { title, description, price, location } = req.body;
  const images = req.files ? req.files.map(file => file.filename) : [];

  if (!req.user.isAdmin)  
    res.status(401).send({ message: "Not Authorized" });
  try {
    await Property.create({ 
      title, 
      description, 
      image: JSON.stringify(images), 
      price, 
      location });
    res.send({ 
      success:true,
      message: "Property created" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.send(properties);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateProperty = async (req, res) => {
  const { title, description, price, location } = req.body;
  if (!req.user.isAdmin) return res.status(401).send({ message: "Not Authorized" });
  try {
    await Property.update({ title, description, price, location }, { where: { id: req.params.id } });
    res.send({ message: "Property updated" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteProperty = async (req, res) => {
  if (!req.user.isAdmin) return res.status(401).send({ message: "Not Authorized" });
  try {
    await Property.destroy({ where: { id: req.params.id } });
    res.send({ message: "Property deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
    createProperty,
    getAllProperties,
    updateProperty,
    deleteProperty

}