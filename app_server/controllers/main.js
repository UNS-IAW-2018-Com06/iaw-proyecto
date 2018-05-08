const index = function (req, res) {
    res.render('index', { user: req.user , title : 'UniMapoteca' });
};

module.exports = {
    index
};

