import express from 'express';

const app = express();
import multer from "multer";
import path from "path";
// connectDB();

const router = express.Router();

import mongoose from "mongoose";
// import connectDB from './appdb.js';
const quickSchema = mongoose.Schema(
    {
        image: {
            data: String,
            contentType: String
        },
        quick: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false
        }

    })
const quick = mongoose.model('quick', quickSchema);
// studentlistSchema.plugin(Studentlist);


const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: Storage,

}).single('testImage');
router.get('/', async (req, res) => {

    let filter = { isDeleted: false }

    if (req.query.quick) {
        filter.quick = req.query.quick
    }

    let list = await quick.find(filter)
    console.log("successfully")
    res.send(list);
})



router.get("/:id", async (req, res) => {
    try {
        let quick = await quick.find({ _id: req.params.id, isDeleted: false })
        //     .

        if (quick) {
            res.json(quick);
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (error) {
        res.json({ message: 505 });
    }
});

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newImage = new quick({
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                },
                quick: req.body.quick,


            })
            newImage.save()
                .then(() => res.send('successfully uploaded')).catch(err => console.log(err))
        }
    })

})
router.put('/:id', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            quick.findOneAndUpdate({ _id: req.params.id }, {

                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                },
                quickk: req.body.quick,


            })

                .then(result => {
                    res.status(200).json({
                        updated_image: result
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                })

        }
    })

})
router.delete('/:id', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            gate.deleteOne({ _id: req.params.id }, {

                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                },
                quick: req.body.quick,


            })

                .then(result => {
                    res.status(200).json({
                        deleted_image: result
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                })

        }
    })


})


router.delete("/", async (req, res) => {
    quick.deleteMany({}).then((result) => {
        res.send(result);
    })
});


export default router;
// const port=4000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
//     console.log(image);
// });
