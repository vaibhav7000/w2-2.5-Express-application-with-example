const express = require("express"); // provides us the function to create the http server
const app = express(); // calling that function and returns us object that has the power to start the http server / remote room

// think of networking applications (http server) as remote room (which can be accessed using other application connected over the internet) where the different services are provided using different routes and the user / client /frontend can use these applications by sending the request, the remote room do some calculations on the top and send the request

// base route
app.get("/", function(req,res) {
  res.send("Providing services using http server");
})

// make the http server / remote room accessable to the world (if deployed on the public IPs), if locally we can send request to this remote-room using listen
app.listen(3000, function() {
  console.log("the server is started at 3000 port");
})


// Since the remote room is created through NodeJS in JS => all the request that will be coming to the sever will be treated as a single threaded nature => only 1 request will be using the the functionality other will be waiting in the waiting queue (created using Nodejs)

// http servers (networking applications) are used to expose  your logic ( openAI have their code base / machine learning model on the machine uses http servers to expose the machine learing logic  ) to the whole world

// app.get() (route handlers) -> kind of sub-rooms present inside the main-room, exposes the specific functionality, the request will come according to the route handler


function sum(n) {
  let ans = 0;
  for(let index = 1; index <= n; index++) {
    ans += index
  }

  return ans;
}

// defining the route-handler (sub-rooms where specific functionalities would be implemented)
app.get("/sum", function(req,res) {
  const n = req.query.n; // syntax to get the value
  if(!n) {
    res.json({
      err: "Pass a valid number"
    })
    return
  }
  const result = sum(n);

  res.json({
    sum: result
  })

  // sending the user data as query-params (after the route ?n=10&m=20 multiple params)
})