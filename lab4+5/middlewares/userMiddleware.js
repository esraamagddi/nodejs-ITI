const userMiddleware = {
    isAuthenticated: function(req, res, next) {
      if (req.session.user) {
        next(); 
      } else {
        res.status(401).json({ message: "Unauthorized" }); 
      }
    },
    
    isAuthorized: function(req, res, next) {
      if (req.params.userId === req.session.user._id) {
        next(); 
      } else {
        res.status(403).json({ message: "Forbidden" }); 
      }
    }
  };

  
  
  module.exports = userMiddleware;
  