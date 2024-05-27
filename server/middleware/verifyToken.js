// middleware/verifyToken.js
var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization && req.headers.authorization.split(' ')[1];
  console.log("Ahihijhhh")
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("Token server" + decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyToken;
