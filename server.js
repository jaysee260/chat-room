const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
fetch.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./"));


const { services } = require("./config");

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
    // checks whitelist and gets token from jwt-factory
});

app.post("/signup", async (req, res) => {
    var payload = req.body;
    console.log({ payload });
    /***
     * @todo REFACTOR
     * ideally we'd call something like this in this route
     * 
     * _userRegistrationService.createUser(payload);
     * 
     * and be done, thus abstracting away all
     * of the business logic and config values
     */
    const { userRegistration } = services;
    const { endpoint, api } = userRegistration;
    const createUserEndpoint = endpoint + api.actions.createUser

    var request = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };

    var response;
    try {
        response = await fetch(createUserEndpoint, request);
        response = await response.json();
    } catch (error) {
        console.log("there was an error");
        console.log(error);
    }

    console.log(response);
    res.json({ response });
})


app.listen(3000, () => {
    console.log("running on port 3000");
})