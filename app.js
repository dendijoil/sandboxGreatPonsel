const express = require('express');
const app = express()
const port = 3000
const session = require('express-session')
const router = require('./routes');
const ControllerLogin = require('./controllers/controllerLogin')
const ControllerRegis = require('./controllers/controllerRegis')

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

app.use( function (req, res, next){
  console.log(req.session);
  if(req.session.UserId){
    next()
  } else {
    let errors = 'Please Login '
    res.redirect(`/login?error=${errors}`)
  }
})

app.get('/logout', ControllerLogin.logout)

app.use(router)


app.listen(port, () => {
  console.log(`App running on port : ${port}`);
})