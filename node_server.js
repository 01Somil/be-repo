const http=require("http");
const fs=require("fs");

const index=fs.readFileSync("index.html",'utf-8');
const data=JSON.parse(fs.readFileSync("data.json","utf-8"));
const product=data.products[0];


const server=http.createServer((req,res)=>{
    //console.log("Server Started");
    switch(req.url)
    {
        case "/":
            res.setHeader("Content-Type","text/html");
            res.end(index);
            break;
        case "/api":
            res.setHeader("Content-Type","application/json");
            res.end(JSON.stringify(data));
            break;
        case "/products":
            res.setHeader("Content-Type","text/html");
            let modifiedIndex=index.replace('**title**',product.title);
            res.end(modifiedIndex);
            break;
        default:
            res.writeHead(404,"Page Not Found!!");
            res.end();
    }
});

server.listen(8080);