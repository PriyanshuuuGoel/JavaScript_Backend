const http = require('http');

const server = http.createServer((req,res)=>{
    res.end(`Hello Coder Army`);
});



server.listen(4000 , ()=>{
    console.log(`I am listening at port number 4000`);
})