const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { Client} = require('pg');
require("dotenv").config();

app.use(cors());

/* Skapa PostgreSQL klient */

const client = new Client ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
    },
});

/* Anslut till PostgreSQL databas */
client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Error connecting to PostgreSQL database', err));

/* Välkommen route */
app.get('/api', (req, res) => {
    res.json({message: "Welcome to my API for managing work experiences. Created by Joakim"});
});

/* Route för att hämta alla arbetserfarenheter */
app.get('/api/work-experiences', (req, res) => {
    res.json({message: "Get all work experiences"});
});

/* Route för att hämta en specifik arbetserfarenhet */
app.get('/api/work-experiences/:id', (req, res) => {
    const id = req.params.id;
    res.json({ message: "Get work experience with id: " + id });
});

/* Route för att lägga till en arbetserfarenhet */
app.post("/api/work-experiences", (req, res) => {
     res.json({message: "Work experience added"})
})

/* Route för att ändra/uppdatera en arbetserfarenhet */
app.put("/api/work-experiences/:id", (req, res) => {
    const id = req.params.id;
    res.json({message: "Work experience updated with id: " + id})
})

/* Route för att ta bort arbetserfarenhet */
app.delete("/api/users/:id", (req, res) => {
    res.json({message: "Users deleted: " + req.params.id})
})


app.listen (port, () => {
    console.log('Server is running on port ' + port);
})

