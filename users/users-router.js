const router = require('express').Router();
const Users = require('./users-model.js');

const restricted = require('./api/restricted-middleware.js');
const checkRole = require('../auth/check-role-middleware');

router.get('/', restricted, checkRole, (req, res) => {
    Users.find()
        .then(users => {
            res.json({users, loggedIn: req.user.username})
        })
        .catch(err => res.send(err))
})


module.exports = router;
