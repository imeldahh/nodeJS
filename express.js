const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors")
// const corsConfig = require("./config/corsConfig");
const { logger } = require("./middleware/eventLogger");
const errorLogger = require("./middleware/errorLogger")

const PORT = process.env.PORT || 5000;

app.use(logger);

const whiteList = ['http://www.mysite.com', "https://www.google.com"];
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 ) {
            callback(null, true);
        }
        else{
            callback(new Error("You are not allowed to visit this page by CORS"));
        }
    },
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use("^/", express.static(path.join(__dirname, "/public")));

app.use("^/", require("./routes/root"));
app.use("/students", require(path.join(__dirname, "routes", "api", "students.js")))

app.all("*", (req, res) =>{
    res.status(404);
    if(req.accepts("html")){
        res.sendFile(path.join(__dirname, "views", "404.html"))
    }else if(req.accepts("application/json")){
        res.send({error: "Page is not found"})
    }else{
        res.send("Page is not found")
    }
})

app.use(errorLogger);

app.listen(PORT, () =>{
    console.log(`The express server is open at http://localhost:${PORT}`)
});