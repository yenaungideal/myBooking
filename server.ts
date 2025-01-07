const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3350;
const mockFilePath = './mocks/_index.ts';

app.use(cors()); // Use CORS middleware to allow cross-origin requests
app.use(express.json());
app.listen(port, () =>
  console.log(`Mock server app listening on port ${port}!`)
);

app.get('/user', (req, res) => res.send(require(mockFilePath)('user')));
app.post('/user', (req, res) =>
  setTimeout(() => {
    res.send(require(mockFilePath)('user'));
  }, 1000)
);

app.get('/booking', (req, res) => res.send(require(mockFilePath)('booking')));
app.post('/booking', (req, res) =>
  setTimeout(() => {
    res.send(require(mockFilePath)('booking'));
  }, 5000)
);
