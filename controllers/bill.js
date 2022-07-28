const connection = require("../connection");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const generateReport = (req, res) => {
  const generateUuid = uuid.v1();
  const { name, email, contact, paymentMethod, totalAmount, productDetails } =
    req.body;
  const productDetailsReport = JSON.parse(productDetails);
  let query =
    "insert into bill (name, uuid, email, contact, paymentMethod, total, productDetails, createdBy) values (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [
      name,
      generateUuid,
      email,
      contact,
      paymentMethod,
      totalAmount,
      productDetails,
      res.locals.email,
    ],
    (err, results) => {
      if (!err) {
        ejs.renderFile(
          path.join(__dirname, "", "report.ejs"),
          {
            productDetails: productDetailsReport,
            name,
            email,
            contacNumber: contact,
            paymentMethod,
            totalAmount,
          },
          (error, _results) => {
            if (!error) {
              pdf
                .create(data)
                .toFile(
                  "./generated_pdf/" + generateUuid + ".pdf",
                  (error_, data) => {
                    if (error_) {
                      return res.status(500).json(error_);
                    } else {
                      return res.status(200).json({
                        uuid: generateUuid,
                      });
                    }
                  }
                );
            } else {
              return res.status(500).json(error);
            }
          }
        );
      } else {
        return res.status(500).json(err);
      }
    }
  );
};

module.exports = { generateReport };
