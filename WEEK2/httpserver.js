const express = require('express');
const fs=require('fs');
const path=require('path');

const app=express();
port=3000;

app.get('/files',(req,res)=>{
    
    const folderPath= path.join(__dirname,'files');

    fs.readdir(folderPath,(err, files) =>{

        if(err){
           return res.status(500).json({error:'failed to generate file list '});
        }

        res.status(200).json(files);
    });
});

//for reading from filename

app.get('/files/:filename',(req,res)=>{

    const filename=req.params.filename;
    const filePath=path.join(__dirname,'files',filename);

    fs.readFile(filePath,"utf-8",(err,data)=>{

        if(err){

            return res.status(404).json({error:'file not found'});      

        }
        res.status(200).send(data);
    });
});

app.use((req,res)=>{
    res.status(404).send('route not found');

});

module.exports=app;

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});