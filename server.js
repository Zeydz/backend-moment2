"use strict";

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { Client } = require('pg');
require("dotenv").config();

app.use(cors());
app.use(express.json());

/* Skapa PostgreSQL klient */
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
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
    res.json({ message: "Welcome to my API for managing work experiences. Created by Joakim" });
});

/* Route för att hämta alla arbetserfarenheter */
app.get('/api/work-experiences', (req, res) => {
    client.query("SELECT id, companyname, jobtitle, location, startdate, enddate, description, timestamp FROM workexperiences", (err, result) => {
        if (err) {
            res.status(500).json({ message: "No work experiences found." });
        } else {
            res.json(result.rows);
        }
    });
});

/* Route för att hämta en specifik arbetserfarenhet */
app.get('/api/work-experiences/:id', (req, res) => {
    const id = req.params.id;
    /* SQL-Fråga som hämtar specifikt ID från databasen. */
    client.query("SELECT * FROM workexperiences WHERE id = $1", [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: "Error retrieving work experience." });
        } else {
            /* Kontrollerar ifall där finns data i databasen */
            if (result.rows.length === 0) {
                res.status(404).json({ message: "No work experiences found for that specific ID." });
            } else {
                res.json(result.rows[0]);
            }
        }
    });
});

/* Route för att lägga till en arbetserfarenhet */
app.post("/api/work-experiences", (req, res) => {
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    /* Validera att alla fält är ifyllda */
    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        return res.status(400).json({ message: "Please fill in all the required fields." })
    }

    /* Uppdaterar värde i databas */
    client.query("INSERT INTO workexperiences (companyname, jobtitle, location, startdate, enddate, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [companyname, jobtitle, location, startdate, enddate, description], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error adding work experience" });
            }
            res.status(201).json(result.rows[0]);
        }
    );
});

/* Route för att ändra/uppdatera en arbetserfarenhet */
app.put("/api/work-experiences/:id", (req, res) => {
    const id = req.params.id;
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;

    /* Uppdatera i databasen */
    client.query("UPDATE workexperiences SET companyname = $1, jobtitle = $2, location = $3, startdate = $4, enddate = $5, description = $6 WHERE id = $7",
        [companyname, jobtitle, location, startdate, enddate, description, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error updating work experience." });
            }
            res.status(200).json({ message: "Work experience updated successfully." })
        }
    );
});

/* Route för att ta bort arbetserfarenhet */
app.delete("/api/work-experiences/:id", (req, res) => {
    const id = req.params.id;
    /* SQL-fråga som tar bort ID från databas */
    client.query("DELETE FROM workexperiences WHERE id = $1",
    [id],
    (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error deleting work experience."})
        }
        res.status(200).json ({ message: "Work experience deleted successfully. "})
    })
});
/* Startar & lyssnar på port */
app.listen(port, () => {
    console.log('Server is running on port ' + port);
})

