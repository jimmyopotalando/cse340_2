
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()
const static = require("./routes/static")
const invRoute = require("./routes/inventoryRoute") 
const baseController = require("./controllers/baseController") 
const utilities = require("./utilities")

const app = express()


app.use(express.static("public")) 
app.use(expressLayouts)
app.set("view engine", "ejs")
app.set("layout", "./layouts/layout") 


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


async function startServer() {
  try {
    const nav = await utilities.getNav()

    
    app.use((req, res, next) => {
      res.locals.nav = nav
      next()
    })

    
    app.use(static)
    app.use("/inventory", invRoute)

    
    app.get("/", (req, res) => {
      res.render("index", { title: "Home" })
    })

    

    
    app.use((req, res, next) => {
      res.status(404).render("errors/404", {
        title: "Page Not Found"
      })
    })

    
    app.use((err, req, res, next) => {
      console.error(err.stack)
      res.status(500).render("errors/500", {
        title: "Server Error"
      })
    })

    
    const port = process.env.PORT || 3000
    app.listen(port, () => {
      console.log(`App listening on http://localhost:${port}`)
    })

  } catch (err) {
    console.error("Server failed to start:", err)
  }
}

startServer()
