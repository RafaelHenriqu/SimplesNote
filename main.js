const JWT = require("jsonwebtoken")
require("dotenv").config()


// MySQL Config //

const MySQL = require("mysql2").createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    port:process.env.port,
    database:process.env.database
})


// Functions //

function JsonWebToken(Next,UserID,res){
    const Token = JWT.sign({
        UserID:UserID
    },process.env.Secret,{expiresIn:"1h"})
    res.cookie("Token",Token)
    Next()
}


function Verify_Accont(req, res, next) {
    const token = req.cookies.Token;
    
    if (!token) {
        return res.redirect("/Login");
    }

    try {
        const decoded = JWT.verify(token, process.env.Secret);
        req.user = decoded;  
        next(); 
    } catch (err) {
        return res.redirect("/Login");
    }
}



// Express Config //
const Express = require("express")
const { console } = require("inspector")
const App = Express()

App.use(Express.urlencoded({extended:true}))
App.use(require("cookie-parser")())
App.use(Express.static(`${__dirname}/public`))
App.use(Express.json()); 

// Route //


App.get("/",Verify_Accont,(req,res)=>{

    res.sendFile(`${__dirname}/index.html`)
    
})

App.get("/Login",(req,res)=>{
    res.sendFile(`${__dirname}/Public/View/Login.html`)
})

App.get("/Register",(req,res)=>{
    res.sendFile(`${__dirname}/Public/View/Register.html`)
})

App.post("/Register",(req,res)=>{
    let Senha = Buffer.from(req.body.Password,'utf-8').toString("base64")
    MySQL.query(`INSERT INTO users (Name,Password,Email) values (?,?,?)`,[req.body.Username,Senha,req.body.Email],(error,result,fields)=>{
        if (!error){
            res.redirect("/Login")
        }
    })
})

App.post("/Login", (req, res, next) => {
    MySQL.query(`SELECT * FROM users`, (Error, Result, Fields) => {
        let Senha = Buffer.from(req.body.Password, 'utf-8').toString("base64");
        const user = Result.find(e => req.body.Username == e.Name && Senha == e.Password);

        if (user) {
            JsonWebToken(next, user.UserID, res);
            return res.redirect("/");
        } else {
            return res.redirect("/Login");
        }
    });
});


App.get("/Add_Note",(req,res)=>{
    res.sendFile(`${__dirname}/Public/View/Add.html`)
})

App.post("/Add_Note",(req,res)=>{
    const Title = req.body.Title
    const Description = req.body.Desc
    MySQL.query("INSERT INTO notes (Title,Desc_SQL,UserID) values (?,?,?)",[Title,Description,JWT.verify(req.cookies.Token,process.env.Secret).UserID],(error,result,fields)=>{
        if (!error){
            res.redirect("/")
            
        }else{
            const UserID = JWT.verify(req.cookies.Token,process.env.Secret).UserID
            console.log(UserID)
            //console.log(`Title: ${Title} Description: ${Description} UserID: ${UserID}`)
             res.redirect("/")
        }
    })

    // JWT.verify(req.cookies.Token,process.env.Secret).UserID
})

App.get("/Notes",(req,res)=>{
    MySQL.query("SELECT * FROM notes",(error,result,Fields)=>{
        res.json(result)
    })
})


App.post("/Remove_Note",(req,res,next)=>{
    MySQL.query("DELETE FROM notes where ID = ?",[req.body.id])
    return res.redirect("/")
})


App.get("/Edit_Note/:Id",(req,res)=>{
    res.cookie("Note_ID",req.params.Id)
    res.sendFile(`${__dirname}/Public/View/Edit.html`)
})

App.post("/Edit_Note",(req,res)=>{
    const {Title,Desc} = req.body
    MySQL.query("UPDATE notes SET Title = ?,Desc_SQL = ? where ID = ?",[Title,Desc,req.cookies.Note_ID])
    res.redirect("/")
})


App.listen(5000,()=>{
    console.log("Starting!")
})