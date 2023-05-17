var app= require('express')();

var http=require('http').Server(app);

var io=require('socket.io')(http);

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html')
});

io.on('connection',function(socket)
{
    console.log("A user has Joined the Chat");
    socket.on("disconnect",function(){
        console.log("A user has left the Chat");
    })
})

http.listen(3000,function(){
    console.log('app listening at http://localhost:3000')
})