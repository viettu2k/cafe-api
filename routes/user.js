const express = require("express");
const connection = require("../connection");
const router = express.Router();

router.post("/signup", (req, res) => {
  let user = req.body;
  let query = "select email,password,role,status from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        query =
          "insert into user(name,contact,email,password,status,role) values(?,?,?,?,'false', 'user')";
        connection.query(
          query,
          [user.name, user.contact, user.email, user.password],
          (error, _results) => {
            if (!error) {
              return res
                .status(200)
                .json({ massage: "User created successfully" });
            } else {
              return res.status(500).json(error);
            }
          }
        );
      } else {
        return res.status(400).json({ message: "Email already exist." });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
