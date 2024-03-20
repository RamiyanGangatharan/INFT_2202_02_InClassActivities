import express = require('express');
import app from "../app";
import {Router} from "express";
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next)
{res.send('respond with a resource');});

export default Router;
