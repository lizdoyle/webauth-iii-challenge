const router = require('express');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../auth/secret');




router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    Users.add(user) {
        .then(saved => { 
            const token = genToken(saved);
            res.status(201).json({created_user: saved, token: token})

        })
        .catch(err => {
            res.status(500).json({message: "You shall not pass!"})
        })
    }

})

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    Users.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = genToken(user);

            res.status(200).json({username: user.username, token: token})
        }
        else {
            res.status(401).json({message: "You shall not pass!"})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })

})


function genToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
        department: ['development']
    }

    const options = {expiresIn: '1hr'};
    const token = jwt.sign(payload, secret.jwtSecret, options);

    return token
}





module.exports = router;