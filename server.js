const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.listen (port, () => {
    console.log('Server is running on port ' + port);
})

app.get('/api', (req, res) => {
    res.json({message: "Welcome to my API"});
});