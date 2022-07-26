const connection = require("../connection");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");
const _uuid = require("uuid");

const generateReport = (req, res) => {
  const generateUuid = _uuid.v1();
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
            contact,
            paymentMethod,
            totalAmount,
          },
          (error, data) => {
            if (!error) {
              pdf
                .create(data)
                .toFile(
                  "./generated_pdf/" + generateUuid + ".pdf",
                  (err, data) => {
                    if (err) {
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

const getPDF = (req, res) => {
  const generateUuid = _uuid.v1();
  const {
    name,
    email,
    contact,
    paymentMethod,
    totalAmount,
    productDetails,
    uuid,
  } = req.body;

  const pdfPath = `./generated_pdf/${uuid}.pdf`;
  if (fs.existsSync(pdfPath)) {
    res.contentType("application/pdf");
    fs.createReadStream(pdfPath).pipe(res);
  } else {
    const productDetailsReport = JSON.parse(productDetails);
    ejs.renderFile(
      path.join(__dirname, "", "report.ejs"),
      {
        productDetails: productDetailsReport,
        name,
        email,
        contact,
        paymentMethod,
        totalAmount,
      },
      (error, data) => {
        if (!error) {
          pdf
            .create(data)
            .toFile(`./generated_pdf/${uuid}.pdf`, (err, data) => {
              if (err) {
                return res.status(500).json(error_);
              } else {
                res.contentType("application/pdf");
                fs.createReadStream(pdfPath).pipe(res);
                return res.status(200).json({
                  uuid: generateUuid,
                });
              }
            });
        } else {
          return res.status(500).json(error);
        }
      }
    );
  }
};

const getBills = (req, res) => {
  let query = "select * from bill order by id desc";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
};

const deleteBill = (req, res) => {
  const id = req.params.id;
  let query = "delete from bill where id = ?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows === 0) {
        return res.status(404).json({
          message: "Bill does not found",
        });
      }

      return res.status(200).json({ message: "Bill deleted successfully" });
    } else {
      return res.status(500).json(err);
    }
  });
};

module.exports = { generateReport, getPDF, getBills, deleteBill };
