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
    client.query("SELECT * FROM workexperiences", (err, result) => {
        if (err) {
            res.status(500).json({message: "No work experiences found."});
        } else {
            res.json(result);
        }
    });
});

/* Route för att hämta en specifik arbetserfarenhet */
app.get('/api/work-experiences/:id', (req, res) => {
    const id = req.params.id;

    client.query("SELECT * FROM workexperiences WHERE id = $1", [id], (err, result) => {
        if (err) {
            res.status(500).json({message: "Error retrieving work experience."});
        } else {
            if (result.rows.length === 0) {
                res.status(404).json({message: "No work experiences found for that specific ID."});
            } else {
                res.json(result.rows[0]);
            }
        }
    });
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

