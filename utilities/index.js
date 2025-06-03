// utilities/index.js

const invModel = require("../models/invModel"); // Adjust path if needed

/**
 * Build the vehicle detail HTML view.
 */
function buildVehicleDetailView(vehicle) {
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(vehicle.inv_price);

  const miles = new Intl.NumberFormat().format(vehicle.inv_miles);

  return `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}" />
      <div class="vehicle-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Mileage:</strong> ${miles} miles</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
      </div>
    </div>
  `;
}

/**
 * Generate a navigation bar from classification data.
 */
async function getNav() {
  try {
    const data = await invModel.getClassifications(); // Must return an array of classifications
    let nav = `<ul>`;
    nav += `<li><a href="/" title="Home page">Home</a></li>`;
    data.forEach((row) => {
      nav += `
        <li>
          <a href="/inventory/type/${row.classification_id}" title="See our ${row.classification_name} vehicles">
            ${row.classification_name}
          </a>
        </li>`;
    });
    nav += `</ul>`;
    return nav;
  } catch (error) {
    console.error("❌ Error generating nav:", error);
    return `<ul><li><a href="/">Home</a></li></ul>`;
  }
}

module.exports = {
  buildVehicleDetailView,
  getNav,
};
