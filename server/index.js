const express = require('express');
const app = express();
const chalk = require('chalk');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 8000;


const SuperstarModel = require('./models/Superstars');


mongoose.connect("mongodb+srv://mo_aliyaan:password-123@crud.k0o3f.mongodb.net/WWE?retryWrites=true&w=majority", { useUnifiedTopology: true }, {useNewUrlParser: true});


app.use(express.json())
app.use(cors())


// routes
app.post('/insert', async(req,res) => {
    const superStarName = req.body.superStarName
    const superStarAge =req.body.superStarAge
    const newSuperStar = new SuperstarModel({superstarname: superStarName, age:superStarAge});

    try{
        await newSuperStar.save();
        res.send('Data Inserted')    
        
    }
    catch(err){
        console.log(err)
    }

})

// to read all the data
app.get('/read', async (req,res) =>{
    SuperstarModel.find({}, ((err, result) =>{
        if(err){
            console.log(err)
        }
        res.send(result);
    }))
})

// to delete a particular document...
app.delete('/remove/:id', async (req,res) =>{
    const id = req.params.id;
    await SuperstarModel.findByIdAndRemove(id).exec();

    
        res.send("Deleted");
    
    
})

// to update the data
app.put('/update', async (req,res) =>{
    const updatedName = req.body.updatedName;
    const id = req.body.id;

    try{
    await SuperstarModel.findById(id ,(err,newName) =>{
        if(err) throw err;
        newName.superstarname = updatedName;
        newName.save();
    })
}

    catch(err){
        console.log(err)
    }
})
    



app.listen(port, (err) =>{
    if(err) throw err;
    console.log(chalk.blue(`Server is running at port ${port}`));
})