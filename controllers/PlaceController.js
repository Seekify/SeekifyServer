const connection = require('../bin/utils/AwsDbConnection'); // Adjust the path as necessary

const PlaceController = {
  // Create a new list
  createPlace: (req, res) => {
    const {name,phone,address_street,address_city,address_state,address_zipcode,rating,review_count,picture,price,categories,yelp_id,yelp_url} = req.body; // Adjust according to your table schema
    const query = `
      INSERT INTO Place (name,phone,address_street,address_city,address_state,address_zipcode,rating,review_count,picture,price,categories,yelp_id,yelp_url)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
    connection.query(query, 
      [name, phone, address_street, address_city, address_state, address_zipcode, rating, review_count, picture, price, categories, yelp_id, yelp_url]
      , (err, results) => {
      if (err) return res.status(500).send(err.message);
      res.status(201).send(`Place created with ID: ${results.insertId}`);
    });
  },
  getPlaceById: (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    const query = 'SELECT * FROM Place WHERE place_id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error fetching lists: ' + err.message);
        return res.status(500).send(err.message);
      }
      res.status(200).json(results);
    });
  },
  getPlaceByYelpId: (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    const query = 'SELECT * FROM Place WHERE yelp_id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error fetching lists: ' + err.message);
        return res.status(500).send(err.message);
      }
      res.status(200).json(results);
    });
  },
  updatePlaceById: (req, res) => {
    const { id } = req.params;
    console.log(id)
    const {name,phone,address_street,address_city,address_state,address_zipcode,rating,review_count,picture,price,categories,yelp_id,yelp_url} = req.body;

    if (!name || !phone || !address_street || !address_city || !address_state || !address_zipcode || !rating || !review_count || !picture || !price || !categories || !yelp_id || !yelp_url) {
      return res.status(400).send('All fields (name, phone, address_street, address_city, address_state, address_zipcode, rating, review_count, picture, price, categories, yelp_id, and yelp_url) are required.');
    }
    const query = `
      UPDATE Place
      SET name = ?, phone = ?, address_street = ?, address_city = ?, address_state = ?, address_zipcode = ?, rating = ?, review_count = ?, picture = ?, price = ?, categories = ?, yelp_id = ?, yelp_url = ?
      WHERE place_id = ?
    `;

    const queryValues = [name, phone, address_street, address_city, address_state, address_zipcode, rating, review_count, picture, price, categories, yelp_id, yelp_url, id];

    connection.query(query, queryValues, (err, result) => {
      if (err) {
        console.error('Error updating place: ' + err.message);
        return res.status(500).send(err.message);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('place not found');
      }
      res.status(200).send(`Place updated successfully with ID: ${id}`);
    });
  },
  deletePlaceWithId: (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Place WHERE place_id = ?';

    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting list: ' + err.message);
        return res.status(500).send(err.message);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Place not found or already deleted');
      }
      res.status(200).send(`Place deleted successfully with ID: ${list_id}`);
    });
  },
}

module.exports = {PlaceController}