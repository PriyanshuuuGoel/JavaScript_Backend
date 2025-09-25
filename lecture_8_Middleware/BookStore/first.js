const express = require("express");

const app = express();



//! As current not know database so will use array to store data
const bookStore = [
    {id:1 , bookName:"Intelligence is Me" , author:"Abhinav Lamba"},
    {id:2 , bookName:"Mountain Rider" , author:"Aayush Tomar"},
    {id:3 , bookName:"Me a Playboy" , author:"Sarthak Saxsena"},
    {id:4 , bookName:"How make girl in" , author:"Ritik Sharma"},
    {id:5 , bookName:"Beyound Friend" , author:"Paras Jindal"},
    {id:6, bookName:"Mountain Rider" , author:"Aayush Tomar"}
]


//*  will parse data which will come from Postman in JSON format to JS Object
app.use(express.json());


// app.get("/book",(req,res)=>{
    

//     res.send(bookStore);
// }) 


app.get("/book",(req,res)=>{

    console.log(req.query);

    // filter cheja array ka andar dalka deta ha 
    const book = bookStore.filter((info)=> info.author === req.query.author  && info.id === parseInt(req.query.id));
    res.send(book);
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

//! Now update data using patch
app.patch("/myPatch",(req,res)=>{
    console.log(req.body);

    const book = bookStore.find((info)=> info.id === req.body.id);

    if( req.body.author){
            book.author = req.body.author;
    }

    if (req.body.bookName){
        book.bookName = req.body.bookName;
    } 

    res.send("Patch Updated sucessfully");
})


//! Now update the entire data using put Method

app.put("/myPut",(req,res)=>{
    console.log(req.body);

    const book = bookStore.find((info)=> info.id === req.body.id);
    book.author = req.body.author;
    book.bookName = req.body.bookName;
    
    res.send("Put Updated sucessfully");

})


//! Now Delete the data

app.delete("/myBook/:id",(req,res)=>{
    console.log(req.params);
    const id = parseInt(req.params.id); // data as a String thee , esliya parseInt keya 

    // now find the index of the book which you want to delete
    const index = bookStore.findIndex((info)=> info.id === id);

    bookStore.splice(index,1);
    res.send("Deleted Successfully");
})

app.listen(6000,()=>{
    console.log("Server is Ready and listening at port 6000")
})




