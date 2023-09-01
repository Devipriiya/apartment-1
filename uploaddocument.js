import express from "express";
// import connectDB from "./librarydb.js";
import multer from "multer";

import mongoose from "mongoose";
import connectDB from "./db.js";
const router =express.Router();
connectDB();
const app=express();
app.use(express.json());

const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')

const uploadSchema = mongoose.Schema(
    {

        image: {
            data: String,
            contentType: String
        },
        isDeleted: {
            type: Boolean,
            default: false
        }

    })
const uploaddocument = mongoose.model('uploaddocument', uploadSchema);



// const files={
//  files:[ {
//     file:{
//         data:"https://publuu.com/flip-book/107330/288496",
//        contentType:"file/pdf"
//     }
  
// },{
//     file:{
//         data:"https://publuu.com/fhjkj/576326948",
//        contentType:"file/pdf"
//     }


// },{
    
//         file:{
//             data:"https://publuu.com/flip-book/107330/288511",
//            contentType:"file/pdf"
//         }
    
        
    
// }
// ]
// }
// connectDB();

app.use(express.json());

app.set("view engine","ejs");


app.get('/document',(req,res) =>
{
    try{
        res.status(200).send(files);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



app.get('/upload/:id',(req,res)=>{
    console.log(req.params.id);
 Files.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            files:result
        })
    })
    .catch(err=> {
    console.log(err);
    res.status(505).json({
        error:err
    })
    }
  )
})

app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newFile = new uploaddocument({
                uploaddocument:req.body.uploaddocument
            })
            newFile.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

app.put('/upload/:id',(req,res)=>{
    console.log(req.params.id);
    uploaddocument.findOneAndUpdate({_id:req.params.id},{
        $set:{
            uploaddocument:req.body.uploaddocument
          

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_uploaddocument:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    app.delete('/upload/:id',(req,res)=>{
        console.log(req.params.id);
        uploaddocument.deleteOne({_id:req.params.id},{
            $set:{
               
                uploaddocument:req.body.uploaddocument
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_uploaddocument:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
       app.delete('/upload',(req,res)=>{
    
         uploaddocument.deleteMany({uploaddocument},(err,result)=>{
            if(err) throw err
            res.send(uploaddocument)
            })
        })



const port=4000;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
  
});
