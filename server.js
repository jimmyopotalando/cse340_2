// server.js
const inventoryRoutes = require("./routes/invRoute")
app.use("/inv", inventoryRoutes)



const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const staticRoutes = require("./routes/static");
const invRoutes = require("./routes/invRoute");
const baseController = require("./controllers/baseController");
const utilities = require("./utilities");

const app = express();

// Set up view engine and static files
app.use(express.static("public"));
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/layout");

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  try {
    const nav = await utilities.getNav();

    // Inject nav into all responses
    app.use((req, res, next) => {
      res.locals.nav = nav;
      next();
    });

    // Define routes
    app.use(staticRoutes);
    app.use("/inventory", invRoutes);
    app.get("/", baseController.buildHome);

    // 404 handler
    app.use((req, res, next) => {
      res.status(404).render("errors/404", {
        title: "Page Not Found",
      });
    });

    // Error handler
    app.use((err, req, res, next) => {
      console.error("❌ Server error:", err);
      res.status(500).render("errors/500", {
        title: "Server Error",
      });
    });

    // Start listening
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1); // Ensure render detects a failed deployment
  }
}

startServer();
