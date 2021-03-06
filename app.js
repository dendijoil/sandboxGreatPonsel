const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const session = require('express-session')
const router = require('./routes');
const multer = require('multer');
const path = require('path');
const ControllerLogin = require('./controllers/controllerLogin')
const ControllerRegis = require('./controllers/controllerRegis');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'kebanggaan kita',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true,
  }
}))

app.get('/register', ControllerRegis.get)
app.post('/register', ControllerRegis.post)

app.get('/login', ControllerLogin.get)
app.post('/login', ControllerLogin.post)

app.use(function (req, res, next) {
  console.log(req.session);
  if (req.session.UserId) {
    next()
  } else {
    let errors = 'Please Login First'
    res.redirect(`/login?error=${errors}`)
  }
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

app.post('profile/edit', upload.single("photo"), (req, res) => {
  res.send("Image Uploaded")
})

app.get('/logout', ControllerLogin.logout)

app.use(router)

app.listen(port, () => {
  console.log(`App running on port : ${port}`);
})