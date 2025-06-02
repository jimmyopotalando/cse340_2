// controllers/baseController.js

/**
 * Controller to build and render the home page.
 */
const buildHome = (req, res) => {
    res.render("index", {
      title: "Welcome to the Vehicle Inventory App",
      message: "Explore our inventory and manage vehicle records efficiently."
    });
  };
  
  module.exports = {
    buildHome
  };
  