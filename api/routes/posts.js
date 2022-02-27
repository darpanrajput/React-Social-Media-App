const router = require("express").Router();
const Post = require("../models/Post");
const Users = require("../models/Users");

//create a posts

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId == req.body.userId) {
      await post.updateOne({ $set: req.body });

      res.status(200).json("your post has been updated");
    } else {
      res.status(403).json("you can update only your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId == req.body.userId) {
      await post.deleteOne();

      res.status(200).json("your post has been deleted");
    } else {
      res.status(403).json("you can delete only your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like-dislke a post

router.put("/:postId/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("post Has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await Users.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPost = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    res.status(200).json(userPosts.concat(...friendPost));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get users all posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  console.log("Post Page ");
});

module.exports = router;
