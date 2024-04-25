const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const session = require('express-session');
const userController = require('./routes/user-route');
const connectDB = require('./db/connect');
const port = 5000;

app.use(
  session({ secret: 'your-secret-key', resave: true, saveUninitialized: true })
);

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

// Body Parser
app.use(express.urlencoded({ extended: false }));

// CheckPath
app.get('/', (req, res) => {
  res.send('server is working');
});

//routes
app.use('/users', userController);
const initServer = async () => {
  try {
    await connectDB(
      'mongodb+srv://matthew:yamama@matthewcluster.chtewfp.mongodb.net/JWT'
    );
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
initServer();
