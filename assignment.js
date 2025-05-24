const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

// this function will know returns promise and there is 1. .then and .catch syntax to provide the map the callbacks 2. async await
function promisedReadFileFromDirectory(path) {
    return new Promise(function(resolve, reject) {
        // error first callbacks
        fs.readdir(path, function(err, files) {
            if(err) {
                reject(err);
                return
            }
            resolve(files);
        })
    })
}

function detectOnlyFiles(filePath, file) {
    // file will be an single fileName
    // we will be using Promise.all()
    const finalPath = path.join(filePath, file);
    return new Promise(function(resolve, reject) {
        fs.stat(finalPath, function(err, stats) {
            if(err) {
                reject(err);
                return
            }

            // stats is an object that has properties of file
            resolve({
                isFile: stats.isFile(),
                fileName: file
            });
        })
    })
}

app.get("/files", async function(req, res) {
    console.log(__dirname) // represent the starting point of the node application from the root
    const filePath = path.join(__dirname, "files")
    // syntax 1
    // promisedReadFileFromDirectory("./files").then(function(allFiles) {

    // }).catch(function(err) {

    // })

    // syntax 2 using async await
    try {
        const data = await promisedReadFileFromDirectory(filePath); // ./ syntax is reading the files according the relative path of the directory 
        console.log(data);
        // since we only need the files not other directory present inside the ./files we will be using fs.stat() to only get the files. this is also asynchronous function

        const booleanArrayWithFileName = await Promise.all(data.map(file => detectOnlyFiles(filePath,file)));
        console.log(booleanArrayWithFileName)
        const result = booleanArrayWithFileName.filter(file => file.isFile === true);
        res.status(200).json({
            result
        })
    } catch(err) {
        console.log(err);
        res.status(404).json({
            message: err
        })
    }

})

app.listen(3000)

// always use path.join() to make the path relative to the macOS fileSystem


// route-handler with route parameters -> the user will send the fileName to whose content to be read
app.get("/files/:fileName", async function(req, res) {
    // the user will send the request to route as localhost:3000/files/a.txt(this can be variable but only structure of the route so only be like otherwise it will be send to some other route that exist)
    const fileName = req.params.fileName;
    const finalPath = path.join(__dirname, "files" ,fileName);
    try {
        const readData = await promiseReadFile(finalPath);

        res.status(200).json({
            data: readData
        })
    } catch (error) {
        res.status(404).send("File not found");
    }

    // first check if this exist in the folder
})

function promiseReadFile(file) {
    return new Promise(function(resolve, reject) {
        fs.readFile(file, "utf-8", function(err, data) {
            if(err) {
                reject(err);
                return
            }
            resolve(data);
        })
    })
}

// we will be using middlewares using app.use() at top because we want to call for every route-handler 
// the middlewares matches with each route (either present or not) send from the client and hence it runs for every request => will be creating a route-handler if client sends a request with no route mention in the application it will be re-directed to the default express not found route, will be implementing ours
app.use((function(req, res) {
    res.json(404).json({
        msg: "Route not found"
    })
})) // we can specify the path for which we want to call, but if empty it will by default match all the routes