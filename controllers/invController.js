const invModel = require('../models/inventory-model');
const utilities = require('../utilities/');

async function buildByInvId(req, res, next) {
  try {
    const invId = parseInt(req.params.invId);
    const data = await invModel.getInventoryById(invId);
    if (!data) {
      return next(); // Triggers 404 error if not found
    }
    const viewHtml = utilities.buildVehicleDetailView(data);
    res.render('inventory/detail', {
      title: `${data.inv_make} ${data.inv_model}`,
      nav: await utilities.getNav(),
      viewHtml
    });
  } catch (error) {
    next(error); // Pass to error middleware
  }
}

module.exports = { buildByInvId };
