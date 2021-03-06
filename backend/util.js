import jwt from 'jsonwebtoken';
const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin__c,
     }, process.env.TOKEN_SECRET || 'secret', {
        expiresIn: '1h'
    })
}

const isAuth = (req, res, next) => {
    const token = req.header.authorization;
    if(token){
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, process.env.TOKEN_SECRET || 'secret', (err, decode) => {
            if (err) {
                return res.status(401).send({ msg: 'Invalid Token'});
            }
            req.user = token;
            next();
            return
        });
    }
    return res.status(401).send({ msg: "Token is not supplied." })
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin__c) {
        return next();
    }
    return res.status(401).send({ msg: 'Admin Token is not valid.'})
}
export {
    getToken, isAuth, isAdmin
}