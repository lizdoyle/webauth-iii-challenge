module.exports = (role) => {
    return function (req, res, next) {
        if (req.decodedJwt.roles && req.decodedJwt.roles.includes(role)) {
            next()
        }
        else if (req.decodedJwt.roles && req.decodedJwt.roles.includes('department')) {
            next()
        }
        else{
            req.status(403).json({message: 'Cannot access due to invalid deparment selected'})
        }
    }
}