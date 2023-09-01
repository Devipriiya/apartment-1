import express from 'express';

const app = express();
import multer from "multer";
import path from "path";
// connectDB();

const router = express.Router();

import mongoose from "mongoose";
// import connectDB from './appdb.js';
const gateSchema = mongoose.Schema(
    {
        image: {
            data: String,
            contentType: String
        },
        gate: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false
        }

    })
const gate = mongoose.model('gate', gateSchema);
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

    if (req.query.gate) {
        filter.gate = req.query.gate
    }

    let list = await gate.find(filter)
    console.log("successfully")
    res.send(list);
})



router.get("/:id", async (req, res) => {
    try {
        let gate = await gate.find({ _id: req.params.id, isDeleted: false })
        //     .

        if (gate) {
            res.json(gate);
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
            const newImage = new gate({
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                },
                name: req.body.name,


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
            gate.findOneAndUpdate({ _id: req.params.id }, {

                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                },
                name: req.body.name,


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
                name: req.body.name,


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
    gate.deleteMany({}).then((result) => {
        res.send(result);
    })
});


export default router;
// const port=4000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
//     console.log(image);
// });
