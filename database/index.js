function buildVehicleDetailView(vehicle) {
    const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(vehicle.inv_price);
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
  
  module.exports = {
    // ... other exports
    buildVehicleDetailView,
  };
  