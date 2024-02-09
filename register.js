const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Replace this with your own MongoDB URI
const uri = 'mongodb+srv://vishnuimmadi143:<vishnu9347>@cluster0.nenztam.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/register', async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    await client.connect();
    const db = client.db('mydatabase');
    const result = await db.collection('users').insertOne(user);

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  } finally {
    await client.close();
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});