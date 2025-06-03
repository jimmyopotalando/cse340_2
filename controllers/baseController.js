// controllers/baseController.js

/**
 * Controller to build and render the home page.
 */
const buildHome = async (req, res) => {
  try {
    res.render("index", {
      title: "Welcome to the Vehicle Inventory App",
      message: "Explore our inventory and manage vehicle records efficiently.",
    });
  } catch (error) {
    console.error("Error rendering home page:", error);
    res.status(500).render("errors/500", {
      title: "Server Error",
    });
  }
};

module.exports = {
  buildHome,
};
