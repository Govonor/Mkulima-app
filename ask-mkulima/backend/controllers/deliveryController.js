const Delivery = require("../models/Delivery");

exports.createDeliveryRequest = async (req, res) => {
  try {
    const delivery = new Delivery(req.body);
    await delivery.save();
    res.status(201).json(delivery);
  } catch (err) {
    res.status(500).json({ error: "Failed to create delivery" });
  }
};

exports.getDeliveryStatus = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ error: "Could not get delivery status" });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ error: "Failed to update delivery status" });
  }
};
