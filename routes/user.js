const express = require("express");
const connection = require("../connection");
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

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

router.post("/login", (req, res) => {
  const user = req.body;
  let query = "select email,password,status from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results[0]?.length <= 0 || results[0]?.password !== user.password) {
        return res
          .status(401)
          .json({ message: "Incorrect username or password" });
      } else if (results[0].status === "false") {
        return res.status(401).json({ message: "Wait for Admin approval" });
      } else if (results[0].password === user.password) {
        const response = { email: results[0].email, role: results[0].role };
        const acessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
          expiresIn: "8h",
        });
        return res.status(200).json({ token: acessToken });
      } else {
        return res
          .status(400)
          .json({ message: "Something went wrong. Please try again." });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL}@gmail.com`,
    pass: process.env.PASSWORD,
  },
});

router.post("/forgot-password", (req, res) => {
  const user = req.body;
  let query = "select email,password from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results[0]?.length <= 0 || !results[0]) {
        return res.status(401).json({ message: "Email not found." });
      } else {
        const mailOptions = {
          from: process.env.EMAIL,
          to: results[0]?.email,
          subject: "Password by Cafe Management",
          html:
            "<p><b>Your login details for Cafe Management System</b><br><b>Email: </b>" +
            results[0]?.email +
            "<br><b>Password: </b>" +
            results[0]?.password +
            "<br><a href='localhost:4200/user/login'>Click here to login</a></p>",
          text: `Your password is ${results[0].password}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (!error) {
            console.log(`Email sent: ${info.response}`);
            return res
              .status(200)
              .json({ message: `Password sent successfully to your email.` });
          } else {
            return res.status(500).json(error);
          }
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;