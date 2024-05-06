const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('^/$|/index(.html)?', (req, res) =>{
    res.sendFile(path.join(__dirname, "views", "index.html"))
});
app.get('/about(.html)?', (req, res) =>{
    res.sendFile(path.join(__dirname, "views", "about.html"))
});
app.get('/contact-us(.html)?', (req, res) =>{
    res.sendFile(path.join(__dirname, "views", "contact-us.html"))
});
app.get('/new-page(.html)?', (req, res) =>{
    res.sendFile(path.join(__dirname, "views", "new-page.html"))
})
app.get('/old-page(.html)?', (req, res) =>{
    res.redirect(301, '/new-page.html')
})

app.get("/hello(.html)?", (req, res, next) => {
    console.log("Attempted to load hello.html");
    next();
}, (req, res) =>{
    res.send("Hello World");
});

// Route Handlers

const one = (req, res, next) => {
    console.log("One..");
    next();
}
const two = (req, res, next) => {
    console.log("Two..");
    next();
}
const three = (req, res) => {
    console.log("Three...");
    res.send("Finished")
}

app.get("/chain(.html)?", [one, two, three])

app.get("/*", (req, res) =>{
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})


app.listen(PORT, () =>{
    console.log(`The express server is open at http://localhost:${PORT}`)
});