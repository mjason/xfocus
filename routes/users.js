
/*
 * GET users listing.
 */

module.exports = function(app) {
  app.get("/users", function(req, res) {
    res.send("13")
  })
  app.get("/users/:id", function(req, res){
    res.send("23123")
  })
}