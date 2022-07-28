const connection = require("../connection");

const addCategory = (req, res) => {
  let { name } = req.body;
  let query = "insert into category (name) values (?)";
  connection.query(query, [name], (err, results) => {
    if (!err) {
      return res.status(200).json({ message: "Category added successfully" });
    } else {
      return res.status(500).json(err);
    }
  });
};

const getCategories = (req, res) => {
  let query = "select * from category order by name";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
};

const updateCategory = (req, res) => {
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

module.exports = { addCategory, getCategories, updateCategory };
