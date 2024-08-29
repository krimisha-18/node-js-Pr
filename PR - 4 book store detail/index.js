const express = require('express');

const port = 9000;

const app = express();

//database attechement 
const db = require('./config/db');

//model aatechmenet
const UserModel = require('./models/UserModel');

const fs = require('fs');

app.set('view engine', 'ejs');

app.use(express.urlencoded());

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//file upload

const multer = require('multer');
const unlinkSync = require('fs');

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const uniqname = `${Date.now()}-${Math.random() * 100000}`;
        cb(null, `${file.fieldname}-${uniqname}`)
    }
})

const uploadFile = multer({ storage: st }).single('image');

app.get('/', (req, res) => {
    UserModel.find({})
        .then((user) => {
            return res.render('table', {
                users: user
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

app.get('/add', (req, res) => {
    return res.render('form')
})

//record insert in mongodb
app.post('/insertRecord', uploadFile, (req, res) => {
    const { name, price, pages, author, image } = req.body;
    UserModel.create({
        name: name,
        price: price,
        pages: pages,
        author: author,
        image: req.file.path
    })
        .then(() => {
            console.log("Record added");
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
});

//delete record
app.get('/deleteRecord', (req, res) => {
    let id = req.query.deleteId;

    //unlink file in folder
    UserModel.findById(id)
        .then((single) => {
            fs.unlinkSync(single.image)
        }).catch((err) => {
            console.log(err);
            return false

        })

    UserModel.findByIdAndDelete(id)
        .then((response) => {
            console.log("record delete");
            return res.redirect('/')
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

//edit record
app.get('/editRecord', (req, res) => {
    let id = req.query.editId;
    UserModel.findById(id)
        .then((single) => {
            return res.render('edit', {
                single
            });
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

//update record
app.post('/updateRecord', uploadFile, (req, res) => {
    const { editid, name, price, pages, author, image } = req.body;
    if (req.file) {
        UserModel.findById(editid)
            .then((single) => {
                fs.unlinkSync(single.image)
            }).catch((err) => {
                console.log(err);
                return false;
            });
        UserModel.findByIdAndUpdate(editid, {
            name: name,
            price: price,
            pages: pages,
            author: author,


            image: req.file.path
        }).then((response) => {
            console.log("Record update");
            return res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return false;
        })
    } else {
        UserModel.findById(editid)
            .then((single) => {
                UserModel.findByIdAndUpdate(editid, {
                    name: name,
                    price: price,
                    pages: pages,
                    author: author,

                    image: single.image
                }).then((response) => {
                    console.log("Record update");
                    return res.redirect('/');
                }).catch((err) => {
                    console.log(err);
                    return false;
                })
            }).catch((err) => {
                console.log(err);
                return false;
            });

    }


})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is run this port :- ${port}`);
})