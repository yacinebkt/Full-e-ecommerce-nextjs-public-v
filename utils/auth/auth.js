import jwt from "jsonwebtoken";


const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
     // format of token is => Bearer xxx
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_PASS_UNI, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token is not valid' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not suppiled' });
  }
};


const isAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
        next();
  } else {
    res.status(401).send({ message: 'User access denied (Only for admins)' });
  }
};
const signToken = (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone : user.phone,
    isAdmin: user.isAdmin,
    profileImage : user.profileImage,

  },

  process.env.JWT_PASS_UNI, {
      expiresIn : '2d'
  }
  );
};




export {signToken, isAuth, isAdmin} ; 
