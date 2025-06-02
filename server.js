// server.js

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const static = require("./routes/static");
const invRoute = require("./routes/inventoryRoute");
const baseController = require("./controllers/baseController");
const utilities = require("./utilities");

const app = express();

// Set up static files and view engine
app.use(express.static("public"));
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/layout");

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    const nav = await utilities.getNav();

    // Global nav setup
    app.use((req, res, next) => {
      res.locals.nav = nav;
      next();
    });

    // Routes
    app.use(static);
    app.use("/inventory", invRoute);
    app.get("/", baseController.buildHome); // Use the home controller

    // 404 handler
    app.use((req, res, next) => {
      res.status(404).render("errors/404", {
        title: "Page Not Found",
      });
    });

    // Error handler
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).render("errors/500", {
        title: "Server Error",
      });
    });

    console.log(`✅ Server is running on port ${port}`);
  } catch (err) {
    console.error("❌ Server failed to start:", err);
  }
});
