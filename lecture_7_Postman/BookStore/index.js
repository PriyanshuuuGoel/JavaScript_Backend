const express = require("express");

const app = express();



//! As current not know database so will use array to store data
const bookStore = [
    {id:1 , bookName:"Intelligence is Me" , author:"Abhinav Lamba"},
    {id:2 , bookName:"Mountain Rider" , author:"Aayush Tomar"},
    {id:3 , bookName:"Me a Playboy" , author:"Sarthak Saxsena"},
    {id:4 , bookName:"How make girl in" , author:"Ritik Sharma"},
    {id:5 , bookName:"Beyound Friend" , author:"Paras Jindal"}
]


//*  will parse data which will come from Postman in JSON format to JS Object
app.use(express.json());

app.get("/book",(req,res)=>{
    res.send(bookStore);
})

//! now want random data of the book by id 
app.get("/book/:id", (req,res)=>{
    console.log(req.params);  // { id: '4' }
    const id = parseInt(req.params.id); // id as a String are ha esliya int mai convert keya 
    const book = bookStore.find((info)=> info.id == id);
    res.send(book);
})


//! Now Post data
app.post("/postbook", (req,res)=>{
    bookStore.push(req.body);
    res.send("Data Saved Successfully");
})


app.listen(6000,()=>{
    console.log("Server is Ready and listening at port 6000")
})