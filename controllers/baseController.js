// controllers/baseController.js

// Render the home page
const buildHome = (req, res) => {
    res.render("index", {
      title: "Welcome",
      message: "Welcome to the Vehicle Inventory App",
    });
  };
  
  // Export the function
  module.exports = {
    buildHome,
  };
  