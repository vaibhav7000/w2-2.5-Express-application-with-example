const express = require("express"); // provides us the function to create the http server
const app = express(); // calling that function and returns us object that has the power to start the http server

// think of networking applications (http server) as remote room (which can be accessed using other application connected over the internet) where the different services are provided using different routes and the user / client /frontend can use these applications by sending the request, the remote room do some calculations on the top and send the request

// base route
app.get("/", function(req,res) {
  res.send("Providing services using http server");
})

app.listen(3000, function() {
  console.log("the server is started at 3000 port");
})


// Since the remote room is created through NodeJS in JS => all the request that will be coming to the sever will be treated as a single threaded nature => only 1 request will be using the the functionality other will be waiting in the waiting queue (created using Nodejs)

// http servers (networking applications) are used to expose  your logic ( openAI have their code base / machine learning model on the machine uses http servers to expose the machine learing logic  ) to the whole world