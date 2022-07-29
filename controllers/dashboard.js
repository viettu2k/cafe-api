const connection = require("../connection");

const getDetails = (req, res) => {
  let categoryCount;
  let productCount;
  let billCount;
  let query = "select count(id) as categoryCount from category";
  connection.query(query, (err, results) => {
    if (!err) {
      categoryCount = results[0].categoryCount;
    } else {
      return res.status(500).json(err);
    }
  });

  query = "select count(id) as productCount from product";
  connection.query(query, (err, results) => {
    if (!err) {
      productCount = results[0].productCount;
    } else {
      return res.status(500).json(err);
    }
  });

  query = "select count(id) as billCount from bill";
  connection.query(query, (err, results) => {
    if (!err) {
      billCount = results[0].billCount;
      const data = {
        category: categoryCount,
        product: productCount,
        bill: billCount,
      };
      return res.status(200).json(data);
    } else {
      return res.status(500).json(err);
    }
  });
};

module.exports = { getDetails };
