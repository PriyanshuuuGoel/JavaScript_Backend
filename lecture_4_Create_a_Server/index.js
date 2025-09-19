const http = require('http');

const server = http.createServer((req,res)=>{
   
      if( req.url === "/"){
        res.end(`Hello Coder Army`);
      }
      else if( req.url === "/contact"){
        res.end(`This is our contact`);
      }
      else if ( req.url === "/about"){
        res.end(`This is about us.`)
      }
      else{
        res.end("I am listenting at port number 5000");
      }

});


server.listen(5000,()=>{
    console.log(`port number 5000`);
})