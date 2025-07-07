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


app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) return res.status(404).send({ error: 'Todo not found' });

  const { title, description, completed } = req.body;

  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  saveTodos();

  res.status(200).send({ message: 'Updated successfully' });
});



app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) return res.status(404).send({ error: 'Todo not found' });

  todos.splice(index, 1);
  saveTodos();

  res.status(200).send({ message: 'Deleted successfully' });
});

app.use((req, res) => {
  res.status(404).send({ error: 'Route not found' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

module.exports = app;
 