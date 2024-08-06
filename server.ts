const express = require('express');
const app = express();
const port = 3350;
const mockFilePath = './mocks/_index.ts';

app.use(express.json());
app.listen(port,() => console.log(`Mock server app listening on port ${port}!`));

app.get('/user',(req,res) => res.send(require(mockFilePath)('user')));
app.post('/user',(req,res) => setTimeout(() => {
    res.send(require(mockFilePath)('user'));
}, 1000));