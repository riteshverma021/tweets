let express = require("express");
let app = express() ;
const { v4: uuidv4 } = require('uuid')
const path = require("path");
const exp = require("constants");
var methodOverride = require('method-override')

//port
let post = 8080;




//set
app.set("views engine" , "ejs")
app.set("views" , path.join(__dirname,"views"))



//use
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'))






//listen
app.listen(post,()=>{
    console.log("server is working.....");
    
})


let tweets = [
    {    id : uuidv4(),
        content : "We Wanted To be adults so bad.  Now look at us. just fucking look. ",
        user : "clayglimson32" 

    },
    {
        id : uuidv4(),
        content : "People who can,t communicate think ecerything is an argument ",
        user : "rohitsharma43" 


    },
    {
        id : uuidv4(),
        content : "I make bitches laugh just to see if they missing teeth",
        user : "rohitsharma43" 
    }


]




//sending
//index pages
app.get("/tweets",(req,res)=>{

    res.render("index.ejs",{ tweets })

});
  

//add page
app.get("/tweets/new",(req,res)=>{
res.render("new.ejs")

} )
app.post("/tweets", (req,res)=>{
    let {user , content} = req.body;
    let { id } = uuidv4();
    tweets.push({ id , content , user})
    res.redirect("/tweets")
    
})

//see details page;

app.get("/tweets/:id",(req,res)=>{
let { id } = req.params;
let tweet = tweets.find((p)=> id === p.id)

res.render("show.ejs" , { tweet })

})

//edit tweet;

app.get("/tweets/:id/edit",(req,res)=>{
 
    let { id } = req.params;
let tweet = tweets.find((p)=> id === p.id)
res.render("edit.ejs" ,{ tweet }  )

})

app.patch("/tweets/:id",(req,res)=>{
let { id } = req.params;
let newcontent = req.body.content;
let tweet =  tweets.find((p)=> id === p.id);
tweet.content = newcontent;
res.redirect("/tweets")


})

//delete tweet

app.delete("/tweets/:id",(req,res)=>{
    let { id } = req.params;
   tweets = tweets.filter((p)=> id !== p.id)
   res.redirect("/tweets")
})
