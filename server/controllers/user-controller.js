const User = require('../models/user');
const registerUser = async (req, res) => {
  console.log('reg successful');
  const { email, password } = req.body;
  let errors = [];

  if (!email || !password) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors, success: false });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      errors.push({ msg: 'This email has already been registered' });
      return res.status(400).json({ errors, success: false });
    }

    const newUser = new User({
      email,
      password,
    });
    await User.create(newUser)
    res.json({success: true, data: newUser});

  } catch (error) {
    console.error('Error checking for existing user:', error);
    return res
      .status(500)
      .json({ success: false, msg: 'Internal Server Error' });
  }
};

const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return res
        .status(500)
        .json({ success: false, msg: 'Internal Server Error' });
    }
    console.log(user);
    if (!user) {
      // Authentication failed
      console.log('Authentication failed');
      return res
        .status(401)
        .json({ success: false, msg: 'Authentication failed' });
    }

    // Authentication successful
    req.logIn(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res
          .status(500)
          .json({ success: false, msg: 'Internal Server Error' });
      }
      return res.status(200).json({ success: true, msg: 'Login successful' });
    });
  })(req, res, next);
};

const readUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Error fetching users' });
  }
};

module.exports = { registerUser, loginUser, readUser };
