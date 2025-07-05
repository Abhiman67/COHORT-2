const express=require('express');
const fs=require('fs');
const path =require('path');

const app=express();
const port=3000;

let todos=[];
let idcounter=1;

app.get('/todos',(req,res)=>{

    res.status(200).json(todos);
});

app.get('/todos/:id',(req,res)=>{

    const id= parseInt(req.params.id);
    const todo =todos.find(t=>t.id===id);

    if(!todo){

        return res.status(404).json({
            error:'to do not foun'
        });
    }

    res.status(200).json(todo);
});

// create a todo

app.post('/todos',(req,res)=>{

    const {title,description}=req.body;

    if(!title || !description){

        return res.status(400).json({
            error:'title and description are required'
        });
    }

    const newTodo ={
        id:idcounter++,
        title,
        description,
        completed:false
    };

    todos.push(newTodo);
    saveTodos();

    res.status(201).json({id:newTodo.id,message:'todo created successfully'});

});




