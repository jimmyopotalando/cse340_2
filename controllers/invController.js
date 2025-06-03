const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

async function buildByInvId(req, res, next) {
  try {
    const invId = parseInt(req.params.invId);
    if (isNaN(invId)) {
      return res.status(400).send("Invalid vehicle ID");
    }

    const data = await invModel.getInventoryById(invId);
    if (!data) {
      return next(); // Triggers 404 if no vehicle found
    }

    const viewHtml = utilities.buildVehicleDetailView(data);

    res.render("inventory/detail", {
      title: `${data.inv_make} ${data.inv_model}`,
      viewHtml,
      nav: await utilities.getNav(), // Optional if already set globally
    });
  } catch (error) {
    console.error("Error in buildByInvId:", error);
    next(error);
  }
}

module.exports = {
  buildByInvId,
};
