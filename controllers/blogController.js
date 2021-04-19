const Blog = require('../models/blog');

// SHOW - view all blogs with latest first
const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then(result => {
        res.render('blogs/index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
        console.log(err);
    });
}

// VIEW - show any specific blog
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('blogs/details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
        res.status(404).render('404', { title: 'Blog Not Found' })
    });
}

// CREATE - create a new blog
const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new blog' });
}

// POST - save the new blog into the database
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then(result => {
        res.redirect('/blogs');
    })
    .catch(err => {
        console.log(err);
    });
}

// EDIT - get any specific blog based on id from database
const blog_edit = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('blogs/edit', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
        console.log(err);
    });
}

// UPDATE - update that specific blog and save the new value
const blog_update = (req, res) => {
    const id = req.params.id;
    const newBlog = { title: req.body.title, snippet: req.body.snippet, body: req.body.body };
    
    Blog.findByIdAndUpdate(id, { $set: newBlog})
    .then(result => {
        res.redirect('/blogs/' + id);
    })
    .catch(err => {
        console.log(err);
    })
}

// DELETE - delete any blog
const blog_delete = (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/blogs' });   
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_edit,
    blog_update,
    blog_delete
}