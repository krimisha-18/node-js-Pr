const express = require('express');
const app = express();
const port = 9000;

app.set('view engine', 'ejs')

let Data = [];
app.use(express.urlencoded())

app.get('/', (req, res) => {
    return res.render('table', {
        users: Data
    })
})

app.get('/add', (req, res) => {
    return res.render('form')
})

app.post('/insertRecord', (req, res) => {
    const { User_name, User_email } = req.body
    let obj = {
        id: Data.length + 1,
        name: User_name,
        email: User_email
    }
    console.log(obj);
    Data.push(obj)
    console.log("successfully adddd");
    return res.redirect('/')
})

app.get("/deleteRecord", (req, res) => {
    let id = req.query.id
    let deleteData = Data.filter(val => val.id != id)
    Data = deleteData
    console.log("Delete User Successfully");
    return res.redirect('/')
})

app.get('/editRecord', (req, res) => {
    let editid = req.query.id
    console.log(editid);
    let single = Data.find(val => val.id == editid)
    console.log(single);
    return res.render('edit', {
        single
    })
}
)

app.post('/updateRecord', (req, res) => {
    let editid = req.body.editid
    let name = req.body.User_name
    let email = req.body.User_email
    let updateData = Data.map((val) => {
        if (val.id == editid) {
            val.name = name
            val.email = email
        }
        return val
    })
    Data = updateData
    console.log("Update User Successfully");
    return res.redirect('/')
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port ${port}`);
}) 
