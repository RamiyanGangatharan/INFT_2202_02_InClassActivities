"use strict";

import express from 'express'
import path from 'path';

//variables
const router = express.Router(); //create new router
const app = express(); //initialize app object
const port = process.env.PORT || 3000; //set port

//config
app.use(router); // register the router within the app
app.set("views", path.join(__dirname, "./views/")); // set directory for views
app.set("view engine", "ejs");// set the view engine to EJS

//static config: serving static files, presentation tier (css, js, images)
app.use(express.static(path.join(__dirname, "./client/"))); // server static files from client directory
app.use(express.static(path.join(__dirname, "./node_modules/"))); // server static files from node_modules directory

//middleware
router.get(`/`, function (req, res, next)
{
    res.render(`index`, {title: "hello World!"})
})


app.listen(port, () =>
{
    console.log(`server running at http://localhost:${port}/`);
})