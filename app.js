const Express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

mongoose.connect('mongodb://127.0.0.1/authorization-practice')
    .then(x => {
        console.log("Succesfully connected to " + x.connections[0].name)
    })
    .catch(err => {
        console.log(err)
    })

const app = Express();

app.set('views', __dirname + '/views')
app.set('view engine', hbs)

app.set('trust proxy', 1);
 
// use session
app.use(
  session({
    // secret: process.env.SESS_SECRET,
    secret: "stingray",
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60000 // 60 * 1000 ms === 1 min
    },     
        store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1/authorization-practice'
        // mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/basic-auth'
 
        // ttl => time to live
        // ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
      })
  })
);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));


// setting up my authenticaton routes
const authRoutes = require('./routes/auth.routes')

app.use('/', authRoutes)


app.listen(3000, () => console.log('yo, the server is running'));