// creating http server using express / remote-room
const express = require("express");
const app = express();
const port = 3000;
const storage = []; // will store the kidney data for each user in the form of array of objects, where each object will specify the user

app.listen(port, function() {
    console.log("The HTTP server is setup!!")
})
// middlewares are functions that have access to the req, res, next and should be called before the main route-handler function, gnerally used for authenticating, getting the data present inside the req, res
// middleware that we want to call before each request goes to the route-handler (body-parser)
app.use(express.json()) // return a function that have 

// defining route-handler (sub-rooms present inside the remote-room) where specific functionalities will be avaiable
// The client will made request to the route-handler based on the business-logic
app.get("/", function(req,res) {
    res.send("Welcome to the Http server")
})

app.get("/checkKidney", function(req,res) {
    const userName = req.query.userName

    try {
        if(!storage.length) {
            throw new Error("Currently there is no user") // this will be present inside the err.message
        }

        if(!userName) {
            throw new Error("Pass a valid userName")
        }

        const findOne = storage.find(user => user.userName === userName);

        if(!findOne) {
            throw new Error("No user is present with this userName");
        }

        res.json({
            noOfKidneys: findOne.totalKidneys.length,
            kidneyHealths: findOne.totalKidneys.map(kidney => kidney.health),
        })
    } catch(err) {
        
        res.json({
            message: err.message,
        })
    }
})

app.post("/addKidney", function(req, res) {
    try {
        const userName = req.query.userName;
        const totalKidneys = req.body.allKidneys;

        if(!userName) {
            throw new Error("Pass a valid userName")
        }

        if(!totalKidneys && !totalKidneys.length) {
            throw new Error("Pass a valid kidneys")
        }

        storage.push({
            userName,
            totalKidneys
        })

        res.json({
            message: "user added successfully"
        })

    } catch (error) {
        res.json({
            message: err.message,
        })
    }
})

app.put("/replaceKidney", function(req, res) {
    try {
        const userName = req.query.userName;
        if(!userName) {
            throw new Error("Pass a valid userName")
        }

        const kidneyReplace = req.body.replace;

        if(!kidneyReplace && kidneyReplace["kidney"]) {
            throw new Error("Pass a valid kidney that want to replace")
        }

        storage.forEach(user => user.totalKidneys.forEach(singleKidney => singleKidney.kidney ===  kidneyReplace.kidney ? singleKidney.health = kidneyReplace.health  : null))

        res.json({
            message: "Update your kidney successfully"
        })
    } catch (err) {
        res.json({
            message: err.message,
        })
    }
})

app.delete("/deleteUser", function(req, res) {
    try {
        const userName = req.query.userName;
        if(!userName) {
            throw new Error("Pass a valid userName"); // this should act as middleware because everytime we need to check this before hitting the main functionalty
        }

        if(!storage.length) {
            throw new Error("Currently there is no user") // this will be present inside the err.message
        }

        // splice method is powerful for array (add, delete, the original array)
        // findIndex is similar to indexOf but accepts a callback function
        let index = storage.findIndex(user => user.userName === userName);

        if(index < 0) {
            throw new Error("No user found with this");
        }

        storage.splice(index,1) // we can elements too

        res.json({
            message: "User successfully deleted"
        })

    } catch (error) {
        // this send the Content-Type as application/json in the response headers and user can check whether it string or JSON format using Content-Type
        res.json({
            message: err.message,
        })

        // res.statusCode this is default NodeJS http module property for setting the statusCode, 
        // res.status -> express provided to set the status code and also provides chaining
    }
})

// generally for the post request we send the data inside the body
// fetch -> is used in nodeJS application to send request to the http server
// instead of using the in-house-storage we will be using databases
// Default status code for every route-handler is 200

// There are two types of parameters 1. Query Params (specified using ? this in req get as req.query.variableName) 2. Route Params (: this in the req can get as req.params.variableName that we mentioned in the route) -> These are the part of the route and gets mapped according to the user send the request


// route-handler with route parameters -> the user will send the fileName to whose content to be read
app.get("/files/:fileName", function(req, res) {
    // the user will send the request to route as localhost:3000/files/a.txt(this can be variable but only structure of the route so only be like otherwise it will be send to some other route that exist)
    const fileName = req.params.fileName;

    // first check if this exist in the folder
})

function promiseReadFile(path) {
    return new Promise(function(resolve, reject) {
        fs.read
    })
}