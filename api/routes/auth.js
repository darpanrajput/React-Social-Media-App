const router = require("express").Router();
const Users = require("../models/Users");
const bcrypt = require('bcrypt');

//Regitser a new User
router.post("/register", async (req, res) => {

  try {
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);

    const newUser = new Users({
      username: req.body.username,
      email: req.body.email,
      password:hashedPassword,
    });


    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});


//LOGIN
router.post("/login",async (req,res)=>{
try{
  const user=await Users.findOne({email: req.body.email});
  !user && res.status(404).json("user not found");
  const validatePassword=await bcrypt.compare(req.body.password,user.password);
  !validatePassword && res.status(404).json("wrong password");

  res.status(200).json(user);

}catch(err){
  console.log(err);
  res.status(400).json(err);
}
});

module.exports = router;
