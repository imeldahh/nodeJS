const path = require("node:path");
const { eventLogger } = require("./eventLogger");

const errorLogger = (error, req, res) => {
    // res.status(500);
    // res.send(error.message);
    // console.log(error.stack);
    eventLogger(`${error.name}: ${error.message}`, "errorLogs.txt");
}


module.exports = errorLogger;
