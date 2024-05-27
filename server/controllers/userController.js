const User = require('../models/User');
const userController = {
    registerEmailPassword: async (req, res) =>  {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(200).send('User registered successfully');
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getUserTypeByMaND :async (req, res) => {
        try {
          console.log("Req ne")
          const { MaND } = req.params;
          const user = await User.findOne({ MaND });
          if (user) {
            return res.status(200).json(user);
          } else {
            return res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = userController