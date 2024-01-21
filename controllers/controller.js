const connection = require('../bin/utils/AwsDbConnection'); // Adjust the path as necessary

const listController = {
  // Create a new list
  createList: (req, res) => {
    const { name, description, created_by } = req.body; // Adjust according to your table schema
    const query = `
      INSERT INTO list (name, description, user_count, places_count, last_added, created_at, created_by)
      VALUES (?, ?, 1, 0, NOW(), NOW(), ?)`
    connection.query(query, [name, description, created_by], (err, results) => {
      if (err) return res.status(500).send(err.message);
      res.status(201).send(`List created with ID: ${results.insertId}`);
    });
  },
  getListByUsername: (req, res) => {
    const { title, description } = req.body; // Adjust according to your table schema
    const query = 'INSERT INTO list (title, description) VALUES (?, ?)';
    connection.query(query, [title, description], (err, results) => {
      if (err) return res.status(500).send(err.message);
      res.status(201).send(`List created with ID: ${results.insertId}`);
    });
  },
  updateListById: (req, res) => {
    const { title, description } = req.body; // Adjust according to your table schema
    const query = 'INSERT INTO list (title, description) VALUES (?, ?)';
    connection.query(query, [title, description], (err, results) => {
      if (err) return res.status(500).send(err.message);
      res.status(201).send(`List created with ID: ${results.insertId}`);
    });
  },
  deleteList: (req, res) => {
    const { title, description } = req.body; // Adjust according to your table schema
    const query = 'INSERT INTO list (title, description) VALUES (?, ?)';
    connection.query(query, [title, description], (err, results) => {
      if (err) return res.status(500).send(err.message);
      res.status(201).send(`List created with ID: ${results.insertId}`);
    });
  },
}

module.exports = {listController}