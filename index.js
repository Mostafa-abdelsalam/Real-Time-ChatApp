const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./config/passportConfig');
const http = require('http');
const { Server } = require('socket.io');
const { sendNotification } = require('./config/firebaseAdmin');


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Error connecting to MongoDb :', err.message);
    });


app.use(express.json());

app.use(session({
    secret: 'secretGamed',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/users', userRoutes);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Real-Time Chat App is running... ');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
  
      // Send notification to all users (You can modify this to target specific users)
      const message = {
        title: 'New Message',
        body: msg
      };
      // Add user tokens here
      const userTokens = [/* Add FCM tokens here */];
  
      userTokens.forEach(token => {
        sendNotification(token, message);
      });
    });
  });
  
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });