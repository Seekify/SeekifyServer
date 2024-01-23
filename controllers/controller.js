const connection = require('../bin/utils/AwsDbConnection'); // Adjust the path as necessary

const listController = {
  // Create a new list
  createList: (req, res) => {
    const { name, description, created_by, list_reference } = req.body; // Adjust according to your table schema
    const query = `
      INSERT INTO Lists (list_reference, name, description, user_count, place_count, last_added, created_by, created_at)
      VALUES (?, ?, ?, 1, 0, NULL, ?, NOW())`
    connection.query(query, [list_reference, name, description, created_by], (err, results) => {
      if (err) return res.status(500).send(err.message);
      res.status(201).send(`List created with ID: ${results.insertId}`);
    });
  },
  getListsByUsername: (req, res) => {
    const { username } = req.params; 
    const query = 'SELECT * FROM Lists WHERE created_by = ?';
    connection.query(query, [username], (err, results) => {
      if (err) {
        console.error('Error fetching lists: ' + err.message);
        return res.status(500).send(err.message);
      }
      res.status(200).json(results);
    });
  },
  updateListDetails: (req, res) => {
    const { list_id } = req.params;
    const { name, description, last_added } = req.body;

    if (!name || !description || !last_added) {
      return res.status(400).send('All fields (name, description, and last_added) are required.');
    }
    const query = `
      UPDATE Lists
      SET name = ?, description = ?, last_added = ?
      WHERE list_id = ?
    `;

    const queryValues = [name, description, last_added, list_id];

    connection.query(query, queryValues, (err, result) => {
      if (err) {
        console.error('Error updating list: ' + err.message);
        return res.status(500).send(err.message);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('List not found');
      }
      res.status(200).send(`List updated successfully with ID: ${list_id}`);
    });

  },
  deleteListById: (req, res) => {
    const { list_id } = req.params;

    const query = 'DELETE FROM Lists WHERE list_id = ?';

    connection.query(query, [list_id], (err, result) => {
      if (err) {
        console.error('Error deleting list: ' + err.message);
        return res.status(500).send(err.message);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('List not found or already deleted');
      }
      res.status(200).send(`List deleted successfully with ID: ${list_id}`);
    });
  },
}

module.exports = {listController}