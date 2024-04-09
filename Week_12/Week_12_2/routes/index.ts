import express = require('express');
import app from "../config/app";
import {Router} from "express";
import contacts from "../model/contacts";
import Contact = core.Contact;
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
        contacts.find().then(function (data: any):void
        {
            console.log(contacts)
            res.render('contact-list', {title: 'Contact List', contacts:data, page: 'contact-list', displayName: ''});
        }).catch(function (err: string):void{
            console.error("Encountered an error reading from the database" + err)
    });
        }})
router.get('/edit:id', function (req, res, next)
{
    let id = req.params.id;

    Contact.FindById(id).then(function (contactToEdit: any){
        res.render('index', {title: 'Edit Contact', page: 'edit', contact:  contactToEdit, displayName: ''});
    }).catch(function (err: any){
        console.error(err);
        res.end();
    })
});

/**
 * POST REQUESTS
 */

router.post('/edit/:id', function(req, res, next)
{
    let id = req.params.id;
    let updateContact = new Contact(
        {
            "_id" : id,
            "FullName": req.body.fullName,
            "ContactNumber": req.body.contactNumber,
            "EmailAddress": req.body.emailAddress
        }
    );
    Contact.updateOne({_id: id}, updateContact).then(function (){
        res.redirect('/contact-list');
    }).catch(function (err: any){
        console.error(err)
        res.end();
    })
})


router.post('/add/:id', function(req, res, next)
{
    let newContact = new Contact({
        "_id": id,
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    Contact.create({newContact}, updateContact).then(function (){
        res.redirect('/contact-list');
    }).catch(function (err: any){
        console.error(err);
        res.end();
    })
})

router.get('/login', function (req, res, next)
{{res.render('login', {title: 'Login', page: 'login', displayName: ''});}})
router.get('/product', function (req, res, next)
{{res.render('product', {title: 'Product', page: 'product', displayName: ''});}})
router.get('/register', function (req, res, next)
{{res.render('register', {title: 'Register', page: 'register', displayName: ''});}})

router.get('/add', function (req, res, next)
{{res.render('index', {title: 'Add Contact', page: 'edit', contact: '', displayName: ''});}})
router.get('/service', function (req, res, next)
{{res.render('service', {title: 'services', page: 'service', displayName: ''});}})

export default router;