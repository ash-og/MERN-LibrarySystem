const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt');
const User = require('../model/user');

// Credit @ https://www.youtube.com/watch?v=FlZVFnErMU4


const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}

// Authorization
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "NoobCoder"
},(payload,done)=>{
    User.findById({_id : payload.sub},(err,user)=>{
        if(err)
            return done(err, false);
        if(user)
            return done(null,user);
        else 
            return done(null,false);        
    });
}));

// Authenticated local strategy using username and password
passport.use(new LocalStrategy((username,password,done) => {
    User.findOne({username}, (err,user)=> {
        // Something went wrong with db
        if (err)
            return done(err);
        // if no user exists
        if (!user)
            return done(null,false);
        // Check if password is correct
        user.comparePassword(password,done);
        
    });
}));

