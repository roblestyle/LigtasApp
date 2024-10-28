const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userController = require("../controllers/userController");
const User = require("../model/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userController.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (userToken, tokenSecret, profile, done) => {
      try {

        ///GOOGLE BSU ACCOUNT ONY
         // Check if the hosted domain (hd) exists and matches your organization's domain
         const email = profile.emails[0].value;
         const domain = profile._json.hd;
 
         // Ensure the user is from your organization domain
         if (domain !== 'g.batstate-u.edu.ph') {
           return done(null, false, { message: "Unauthorized domain" });
         }

         /////////////

         
        const user = await userController.createGoogleUser(profile);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);




module.exports = passport;
