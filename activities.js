import express from 'express';

const app = express();
import multer from "multer";
import path from "path";
// connectDB();

const router = express.Router();

import mongoose from "mongoose"
// import connectDB from './appdb.js';
const activitySchema = mongoose.Schema(
    {

        image: {
            data: String,
            contentType: String
        },
        activity: {
            type: String,
            required: true,
        },

        isDeleted: {
            type: Boolean,
            default: false
        }

    })
const activity = mongoose.model('activity', activitySchema);
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

    if (req.query.activity) {
        filter.activity = req.query.activity
    }

    let list = await billdetails.find(filter)
    console.log("successfully")
    res.send(list);
})



router.get("/:id", async (req, res) => {
    try {
        let activity = await activity.find({ _id: req.params.id, isDeleted: false })
        //     .

        if (activity) {
            res.json(activity);
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
            const newImage = new activity({
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                },
                activity: req.body.activity,




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
            activity.findOneAndUpdate({ _id: req.params.id }, {
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                },
                activity: req.body.activity,



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
            activity.deleteOne({ _id: req.params.id }, {
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                },
                activity: req.body.activity,
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
    activity.deleteMany({}).then((result) => {
        res.send(result);
    })
});


export default router;
// const port=4000;
// app.listen(port,()=>{
//     console.log(`server is running at ${port}`);
//     console.log(image);
// });
