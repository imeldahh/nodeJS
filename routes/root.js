const express = require("express");
const router = express.Router();
const path = require("node:path");

router.get('^/$|/index(.html)?', (req, res) =>{
    res.sendFile(path.join(__dirname, "..", "views", "index.html"))
});
router.get('/about(.html)?', (req, res) =>{
    res.sendFile(path.join(__dirname, "..", "views", "about.html"))
});
router.get('/contact-us(.html)?', (req, res) =>{
    res.sendFile(path.join(__dirname, "..", "views", "contact-us.html"))
});
router.get('/new-page(.html)?', (req, res) =>{
    res.sendFile(path.join(__dirname, "..", "views", "new-page.html"))
})
router.get('/old-page(.html)?', (req, res) =>{
    res.redirect(301, '/new-page.html')
});

module.exports = router;