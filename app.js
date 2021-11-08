const express =require("express");//import express package
const app=express();//create new instance from express package
const PORT=5000;

const fs=require('fs');
app.use(express.json());

app.get("/getContent",(req,res)=>{
    fs.readFile("./movies.json",(err,data)=>{
        const content=JSON.parse(data.toString());
        res.status(200).json(content)
    })
})
app.get("/getContentById",(req,res)=>{
    const id=req.body.id;
    fs.readFile("./movies.json",(err,data)=>{
        const content=JSON.parse(data.toString());
        const item=content.find(item=>item.id==id)
        res.status(200).json(item);
    })
})
//write in json file
const accessFile=(content)=>{
    fs.writeFile("./movies.json",JSON.stringify(content),(err,data)=>{
        console.log("appended on file");
    })
}
//create new item
app.post("/writeOnFile",(req,res)=>{
    fs.readFile("./movies.json",(err,data)=>{
            const content=JSON.parse(data.toString());
            console.log(content);
            content.push({id:content.length,name:"anyThing",isDeleted:false,isFav:false})
            accessFile(content);
            res.status(200).json(content)
        })
})
//make isDeleted=true soft deleted
app.post("/deleFromFile",(req,res)=>{
    const id=req.body.id
    fs.readFile("./movies.json",(err,data)=>{
        const content=JSON.parse(data.toString());
        console.log(content);
        const funded=content.find(item=>item.id==id);
        const index=content.indexOf(funded);
        content.splice(index,1,{id:id,name:funded.name,isDeleted:true,isFav:false})
        accessFile(content);
        res.status(200).json(content)
    })
})
//update specific item
app.post("/updateFileContent",(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    fs.readFile("./movies.json",(err,data)=>{
        const content=JSON.parse(data.toString());
        console.log(content);
        const funded=content.find(item=>item.id==id);
        const index=content.indexOf(funded);
        content.splice(index,1,{id:id,name:name,isDeleted:false,isFav:false})
        accessFile(content);
        res.status(200).json(content)
    })
})



//open file it will be open file if the file name is exist or it will be create it
// fs.open("mmm.md","w",(err)=>{
//     console.log("opend");
// });
//read json file
// fs.readFile("movies.json",(err,data)=>{
//     console.log(data.toString());
// })
// fs.writeFile("movies.json","//I will add this text to file movies",(err,data)=>{
//     console.log("done");
// })
//append in json file and it will remove content of the file
// fs.appendFile("movies.json","//I will add this text to file movies",(err,data)=>{
//     console.log("done");
// })
// fs.unlink("movies.json",(err)=>{
//     console.log("deleted");
// })
//rename file
// fs.rename("movies.json","mynewNameforFile.json",(err)=>{
//     console.log(err);
// })
// const movie=[{id:1,name:"Jery",isFav:false,isDeleted:false},
// {id:2,name:"tot",isFav:true,isDeleted:true},{id:3,name:"tot",isFav:true,isDeleted:true}]

// app.get("/movies",(req,res)=>{
//     res.json(movie);
//     res.status(200);
// })
// app.get("/moviesById",(req,res)=>{
//     const id=req.body.id;
//     const movieId=movie.find(item=>item.id==id)
//     res.json(movieId);
//     res.status(200);
// })
// app.post("/create",(req,res)=>{
//     const name=req.body.name;
//     //const newMovie={id:movie.length,name,isFav:false,isDeleted:false};
//     movie.push({id:movie.length,name,isFav:false,isDeleted:false});
//     res.json(movie);
// })
// app.post("/fav",(req,res)=>{
//     const id=req.body.id;
//     const funded=movie.find(item=>item.id==id)
//     const index=movie.indexOf(funded);
//     movie.splice(index,1,{id:id,name:funded.name,isDeleted:funded.isDeleted,isFav:true});
//     res.json(movie);
// })
// app.put("/update",(req,res)=>{
//     const id=req.body.id;
//     const name=req.body.name;
//     const updatedMovie=movie.find(item=>item.id==id);
//     const index=movie.indexOf(updatedMovie)
//     const newObj={id:id,name:name,isDeleted:false,isFav:false}
//     movie.splice(index,1,newObj);
//     res.json(movie);
// })

// app.delete("/delete",(req,res)=>{
//     const id=req.body.id;
//     const updatedMovie=movie.find(item=>item.id==id);
//     const index=movie.indexOf(updatedMovie);
//     const newObj={id:id,name:updatedMovie.name,isDeleted:true,isFav:false};
//     movie.splice(index,1,newObj);
//     res.json(movie);
// })








app.listen(PORT,()=>{
    console.log(`our server is running on port :${PORT}`);
})