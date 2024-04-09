"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', function (req, res, next) { {
    res.render('index', { title: 'home', page: 'home', displayName: '' });
} });
router.get('/404', function (req, res, next) { {
    res.render('404', { title: '404', page: '404', displayName: '' });
} });
router.get('/about', function (req, res, next) { {
    res.render('about', { title: 'About', page: 'about', displayName: '' });
} });
router.get('/contact', function (req, res, next) { {
    res.render('contact', { title: 'Contact', page: 'contact', displayName: '' });
} });
router.get('/contact-list', function (req, res, next) { {
    res.render('contact-list', { title: 'Contact List', page: 'contact-list', displayName: '' });
} });
router.get('/edit', function (req, res, next) { {
    res.render('edit', { title: 'Edit', page: 'edit', displayName: '' });
} });
router.get('/login', function (req, res, next) { {
    res.render('login', { title: 'Login', page: 'login', displayName: '' });
} });
router.get('/product', function (req, res, next) { {
    res.render('product', { title: 'Product', page: 'product', displayName: '' });
} });
router.get('/register', function (req, res, next) { {
    res.render('register', { title: 'Register', page: 'register', displayName: '' });
} });
router.get('/service', function (req, res, next) { {
    res.render('service', { title: 'services', page: 'service', displayName: '' });
} });
exports.default = router;
//# sourceMappingURL=index.js.map