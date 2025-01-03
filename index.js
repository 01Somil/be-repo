const fs=require("fs");
const data=JSON.parse(fs.readFileSync("data.json","utf-8"));
const products=data.products;

const express=require("express");
const server=express();
server.use(express.json());

const auth=(req,res,next)=>{
    if(req.query.password=="123")
        next();
    else    
        res.sendStatus(401);
}

// CREATE
server.post("/products",(req,res)=>{
    const data=req.body;
    products.push(data);
    res.status(201).send(data);
});


// READ
server.get("/products",(req,res)=>{
    res.status(200).send(products);
});

server.get("/products/:id",(req,res)=>{
    const id=+(req.params.id);
    const product=products.find((item)=>item.id===id)
    res.status(200).send(product);
});

// UPDATE
server.put("/products/:id",(req,res)=>{
    const id=+(req.params.id);
    const productIndex=products.findIndex((item)=>item.id===id);
    products.splice(productIndex,1,{...req.body,id:id});
    res.send(req.body);
})

server.patch("/products/:id",(req,res)=>{
    const id=+(req.params.id);
    const productIndex=products.findIndex((item)=>item.id===id);
    const product=products[productIndex];
    products.splice(productIndex,1,{...product,...req.body});
    res.send(req.body);
})

// DELETE
server.delete("/products/:id",(req,res)=>{
    const id=+(req.params.id);
    const productIndex=products.findIndex((item)=>item.id===id);
    const product=products[productIndex];
    products.splice(productIndex,1);
    res.send(product);
})


server.get("/demo",(req,res)=>{
    console.log("Demo1")
    //res.json(products);
    // res.send("Hello");
});

server.get("/demo",(req,res)=>{
    console.log("Demo2");
    res.json(products);
    // res.send("Hello");
});

server.get("/demos",auth,(req,res)=>{
    res.json(products);
    // res.send("Hello");
});

server.listen(8080,()=>{
    console.log("Server Started");
});