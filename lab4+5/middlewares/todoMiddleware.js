const sessions = require('express-session');
const todoMiddleware = {
    isTodoOwner: function(req, res, next) {
      if (req.params.userId === req.session.user._id) {
        next(); 
      } else {
        res.status(403).json({ message: "Forbidden" }); 
      }
    }
  };
  
  module.exports = todoMiddleware;
  