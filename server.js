/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const static = require("./routes/static")
 
const app = express()
 
/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at view root
 
/* ***********************
 * Routes
 *************************/
app.use(static)
//Index route
app.get("/", function(req, res){
  res.render("index",{title: "Home"})
})
 
/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST
 
/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
 



const express = require('express');
const app = express();
const utilities = require('./utilities');

// other setup code...

async function startServer() {
  const nav = await utilities.getNav();

  // Make nav available to all views
  app.use((req, res, next) => {
    res.locals.nav = nav;
    next();
  });

  // Start listening
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
}

startServer();

