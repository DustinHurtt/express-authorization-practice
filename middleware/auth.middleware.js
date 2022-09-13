const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
};

const isNotAuthenticated = (req, res, next) => {
    if(req.session.user) {
        res.redirect('/profile')
    } else {
        next();
    }
};

module.exports = {
    isAuthenticated, 
    isNotAuthenticated
};