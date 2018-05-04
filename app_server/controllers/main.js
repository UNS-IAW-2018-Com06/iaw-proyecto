const index = function(req, res) {
      res.render('index', { user: req.user });
    };
    
    module.exports = {
      index
    }; 

//LEA PUTO