const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api', (req, res) => {
    res.json({message: "Welcome to my API"});
});

app.get('api/users', (req, res) => {
    res.json({message: "Get users"});
});

app.post("/api/users/:id", (req, res) => {
     res.json({message: "Users added"})
})

app.put("/api/users/:id", (req, res) => {
    res.json({message: "Users updated: " + req.params.id})
})

app.delete("/api/users/:id", (req, res) => {
    res.json({message: "Users deleted: " + req.params.id})
})


app.listen (port, () => {
    console.log('Server is running on port ' + port);
})

