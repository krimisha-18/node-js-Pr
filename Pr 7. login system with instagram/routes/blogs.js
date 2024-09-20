const express = require('express');
const multer = require('multer');
const Blog = require('../models/Blog');
const router = express.Router();
const upload = multer({ dest: 'public/uploads/' });

router.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.render('dashboard');
});

router.get('/blogs', async (req, res) => {
    const blogs = await Blog.find();
    res.render('blogs', { blogs });
});

router.post('/blogs', upload.single('image'), async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        image: req.file.filenam 
    });
        await blog.save();
        res.redirect('/admin/blogs');
    });

    router.post('/blogs/:id/delete', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {rrrrrrr
        await Blog.deleteOne({ _id: req.params.id });
        // Unlink the image
        fs.unlinkSync(`public/uploads/${blog.image}`);
    }
    res.redirect('zzzz');
});

router.post('/blogs/:id/edit', upload.single('image'), async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        blog.title = req.body.title;
        blog.description = req.body.description;
        if (req.file) {
            fs.unlinkSync(`public/uploads/${blog.image}`);
            blog.image = req.file.filename;
        }
        await blog.save();
    }
    res.redirect('/admin/blogs');
});

module.exports = router;
