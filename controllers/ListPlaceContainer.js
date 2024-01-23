const connection = require('../bin/utils/AwsDbConnection'); // Adjust the path as necessary

const listPlaceController = {
  // Create a new list
  createListPlace: (req, res) => {
    const { list_id, place_id } = req.body; // Adjust according to your table schema
    const query = `
      INSERT INTO ListPlace (list_id, place_id, date_added)
      VALUES (?, ?, NOW())`
    connection.query(query, [list_id, place_id], (err, results) => {
      if (err) return res.status(500).send(err.message);
      res.status(201).send(`List / Place created with ID: ${results.insertId}`);
    });
  },
  getListPlaceByListId: (req, res) => {
    const { list_id } = req.params; 
    const query = 'SELECT * FROM ListPlace WHERE list_id = ?';
    connection.query(query, [list_id], (err, results) => {
      if (err) {
        console.error('Error fetching lists: ' + err.message);
        return res.status(500).send(err.message);
      }
      res.status(200).json(results);
    });
  },
  deleteListPlaceById: (req, res) => {
    const { list_id } = req.params;
    console.log(list_id)
    const query = 'DELETE FROM ListPlace WHERE list_place_id = ?';

    connection.query(query, [list_id], (err, result) => {
      if (err) {
        console.error('Error deleting list: ' + err.message);
        return res.status(500).send(err.message);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('List Place not found or already deleted');
      }
      res.status(200).send(`List Place deleted successfully with ID: ${list_id}`);
    });
  },
}

module.exports = {listPlaceController}