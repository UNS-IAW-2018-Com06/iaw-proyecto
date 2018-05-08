const index = function (req, res) {
    res.render('index', { user: req.user , titulo : 'UniMapoteca' });
};

module.exports = {
    index
};

