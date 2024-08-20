const express = require('express')
const port = 9000;
const app = express();
app.set("view engine", 'ejs')
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    return res.render("dashboard")
})

app.get('/charts', (req, res) => {
    return res.render("charts")
})

app.get('/widgets', (req, res) => {
    return res.render("widgets")
})

app.get('/tables', (req, res) => {
    return res.render("tables")
})

app.get('/grid', (req, res) => {
    return res.render("grid")
})

app.get('/form-basic', (req, res) => {
    return res.render("form-basic")
})

app.get('/form-wizard', (req, res) => {
    return res.render("form-wizard")
})

app.get('/page-buttons', (req, res) => {
    return res.render("page-buttons")
})

app.get('/icon-material', (req, res) => {
    return res.render("icon-material")
})

app.get('/icon-fontawesome', (req, res) => {
    return res.render("icon-fontawesome")
})

app.get('/page-element', (req, res) => {
    return res.render("page-element")
})

app.get('/index2', (req, res) => {
    return res.render("index2")
})

app.get('/page-gallary', (req, res) => {
    return res.render("page-gallary")
})

app.get('/page-calender', (req, res) => {
    return res.render("page-calender")
})


app.get('/pages-invoice', (req, res) => {
    return res.render("pages-invoice")
})

app.get('/page-chat', (req, res) => {
    return res.render("page-chat")
})

app.get('/authentication-login', (req, res) => {
    return res.render(" authentication-login")
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`Server Run in port ${port}`);
})