const express = require('express');
const router = express.Router();
const Post = require("../models/Posts.js");

router.get("/", (req, res) => {
    res.send("We are on posts");
})
router.post("/posts", (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    post.save().then(data => {
        res.send(data);
        console.log("Post thành công")
    }).catch(err => {
        res.json(err)
    })
});

module.exports = router;