const router = require("express").Router();
const bcrypt = require("bcrypt");
const Users = require("../models/Users");

// router.get("/", (req, res) => {
//   //console.log(res);
//   res.send("Hey users");
// });

//UPDATE THE USEs with an parricular // ID

router.put("/:id", async (req, res) => {
  //http://localhost:3000/api/auth/user/176772

  if (req.body.userId == req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    }

    try {
      const user = await Users.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been Updated with=" + user);
    } catch (err) {
      console.log(err);

      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("can only update the user");
  }
});

//DELETE a user
router.delete("/:id", async (req, res) => {
  //http://localhost:3000/api/auth/user/176772

  if (req.body.userId == req.params.id || req.body.isAdmin) {
    try {
      const user = await Users.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been Deleted");
    } catch (err) {
      console.log(err);

      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can only delete your Account");
  }
});

//get A user

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    const { passsword, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    return res.status(404).json(err);
  }
});

//get a user from mongodb

router.get("/", async (req, res) => {
  //lh:8800/users?userId=787399740570
  //lh:8800/users?username=darpanR

  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await Users.findById(userId)
      : await Users.findOne({ username: username });
    const { passsword, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    return res.status(404).json(err);
  }
});

//follower a USER AND FOLLOWING INCREMENTS.

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId != req.params.id) {
    const user = await Users.findById(req.params.id);
    const currentUser = await Users.findById(req.body.userId);

    //check if the current user is already following
    try {
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json(user.username + " has been followed");
      } else {
        res.status(403).json("you are already following this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can not follow yourself");
  }
});

//unfollow
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId != req.params.id) {
    const user = await Users.findById(req.params.id);
    const currentUser = await Users.findById(req.body.userId);

    //check if the current user is already following
    try {
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json(user.username + " has been unfollowed");
      } else {
        res.status(403).json("you weren't following this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can not unfollow yourself");
  }
});

//get all the followings of the users

router.get("/followings/:userId", async (req, res) => {
  try {
    const user = await Users.findById(req.params.userId);
    // console.log(user);

    const followings = await Promise.all(
      //this will fetch all the users exit in followings array of the current logged in user
      //and since it is promise it will await to till all the promise get resolved
      user.following.map((followerId) => {
        return Users.findById(followerId);
      })
    );

    console.log(followings);

    let friendsList = [];
    //extract only the required details from followings which is object of all the users data
    followings.map((friendData) => {
      const { _id, username, profilePicture } = friendData;
      friendsList.push({ _id, username, profilePicture });
    });

    res.status(200).json(friendsList);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
