var app = require('express')();

var http = require('http').Server(app);

var io = require('socket.io')(http);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/user.html")
});

users = [];
//whenever someone connects io.on gets executed

io.on('connection', function (socket) {
    console.log("A user has Joined the Chat");

    //
    socket.on("setUsername", function (data) {
        console.log(data);
         // The indexOf() method returns the position of the first occurrence of a value in a string.

    // The indexOf() method returns -1 if the value is not found.
        if (users.indexOf(data) > -1) {
               // socket.emit allows you to emit or fire events on the server and client
            socket.emit("userExists", data + "ChatID is already Taken! Try Another");
        }
        else {
            //push method is used to add data into users array
            users.push(data);
            socket.emit("userSet", { username: data });
        }
    })
    socket.on("msg", function (data) {
        io.sockets.emit("newmsg", data);
    });
});
http.listen(3000, function () {
    console.log('app listening at http://localhost:3000')
})