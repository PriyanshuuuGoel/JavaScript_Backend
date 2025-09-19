

const { error } = require('console');
const fs = require('fs');


let a = 10;
let b = "Hello Coder Army";
console.log(b);

function mult(a,b){
    return a * b ;
}


// fs.readFile("./data.json" , "utf-8" , (error,response)=>{
//     console.log(response);
// }) 

//! par chul ha yahi nikal ha data , toh readFileSync use karo , yaha ya JS ko rukwayega data fetch karega aur fir aga badega 
const data = fs.readFileSync("./data.json" , "utf-8" );
console.log(data);

setTimeout(()=>{
    console.log("I come after 5 sec");
},1000)

console.log(a);
console.log(mult(7,77));

