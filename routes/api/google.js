const express = require("express");
const router = express.Router();
const passport = require("passport");

const signToken = require('../../utils/signToken')

router.get('/signin', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/redirect', passport.authenticate('google', {
  session: false,
}), (req, res) => {
  console.log('redirected', req.user)
  // let user = {
  //   displayName: req.user.displayName,
  //   name: req.user.name.givenName,
  //   email: req.user._json.email,
  //   provider: req.user.provider
  // }
  // console.log(user)

  // FindOrCreate(user)
  // let token = jwt.sign({
  //   data: user
  // }, 'secret', { expiresIn: 60 }); // expiry in seconds
  // res.cookie('jwt', token)

  // signToken(payload).then(token => res.json(token)).catch(err => console.log(err))
  res.redirect('/')
})

router.get("/callback",
  passport.authenticate("google", {
    failureRedirect: "/google_callback_fail",
    successRedirect: "/google_callback_success"
  })
);

// router.get("/callback-success", isLoggedIn, function (req, res) {
//   res.send("google_callback_success \n");
// });

module.exports = router;
