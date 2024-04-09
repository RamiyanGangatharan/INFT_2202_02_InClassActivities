import express = require('express');
import app from "../config/app";
import {Router} from "express";
import contacts from "../model/contacts";
const router:Router = express.Router();

/* GET home page. */
router.get
    ('/', function (req, res, next)
    {{res.render('index', {title: 'home', page: 'home', displayName: ''});}})
router.get('/404', function (req, res, next)
{{res.render('404', {title: '404', page: '404', displayName: ''});}})
router.get('/about', function (req, res, next)
{{res.render('about', {title: 'About', page: 'about', displayName: ''});}})
router.get('/contact', function (req, res, next)
{{res.render('contact', {title: 'Contact', page: 'contact', displayName: ''});}})
router.get('/contact-list', function (req, res, next)
{
    {
        contacts.find().then(function (contacts: any):void
        {
            console.log(contacts)
        }).catch(function (err: string):void{
            console.error("Encountered an error reading from the database" + err)
    })
        res.render('contact-list', {title: 'Contact List', page: 'contact-list', displayName: ''});}})
router.get('/edit', function (req, res, next)
{{res.render('edit', {title: 'Edit', page: 'edit', displayName: ''});}})
router.get('/login', function (req, res, next)
{{res.render('login', {title: 'Login', page: 'login', displayName: ''});}})
router.get('/product', function (req, res, next)
{{res.render('product', {title: 'Product', page: 'product', displayName: ''});}})
router.get('/register', function (req, res, next)
{{res.render('register', {title: 'Register', page: 'register', displayName: ''});}})
router.get('/service', function (req, res, next)
{{res.render('service', {title: 'services', page: 'service', displayName: ''});}})

export default router;