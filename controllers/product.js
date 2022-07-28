const connection = require("../connection");

const addProduct = (req, res) => {
  let { name, categoryId, description, price } = req.body;
  let query =
    "insert into product (name, categoryId, description, price, status) values (?, ?, ?, ?, 'true')";
  connection.query(
    query,
    [name, categoryId, description, price],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "Product added successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
};

const getProducts = (req, res) => {
  let query =
    "select p.id, p.name, p.description, p.price, p.status, c.id as categoryId, c.name as categoryName from product as p INNER JOIN category as c where p.categoryId = c.id";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
};

const updateCategory = (req, res, next) => {
  let { name, id } = req.body;
  let query = "update category set name=? where id=?";
  connection.query(query, [name, id], (err, results) => {
    if (!err) {
      if (results.affectedRow === 0) {
        return res.status(404).json({ message: "Category is does not found" });
      }
      return res.status(200).json({ message: "Category updated successfully" });
    }
  });
};

module.exports = { addProduct, getProducts, updateCategory };
