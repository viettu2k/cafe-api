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

const getByCategoryId = (req, res) => {
  const { id } = req.params;
  let query = "select * from product where categoryId = ? and status = 'true'";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
};

const getById = (req, res) => {
  const { id } = req.params;
  let query = "select * from product where id = ?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(500).json(err);
    }
  });
};

const updateProduct = (req, res) => {
  let { id, name, categoryId, description, price } = req.body;
  let query =
    "update product set name=?, categoryId=?, description=?, price=? where id=?";
  connection.query(
    query,
    [name, categoryId, description, price, id],
    (err, results) => {
      if (!err) {
        if (results.affectedRow === 0) {
          return res.status(404).json({ message: "Product is does not found" });
        }
        return res
          .status(200)
          .json({ message: "Product updated successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  let query = "delete from product where id = ?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRow === 0) {
        return res.status(404).json({ message: "Product is does not found" });
      }
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(500).json(err);
    }
  });
};

module.exports = {
  addProduct,
  getProducts,
  getByCategoryId,
  getById,
  updateProduct,
  deleteProduct,
};
