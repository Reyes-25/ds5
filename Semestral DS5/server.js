const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

const db = new sqlite3.Database('codeTrivia.db');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/trivia', async (req, res) => {
    try {
        db.all('SELECT * FROM TRIVIA_PREGUNTAS WHERE tipo = "acronimo" ORDER BY RANDOM() LIMIT 15', async (err, preguntas) => {
            if (err) {
                res.status(500).send('Error al consultar la base de datos');
                return;
            }

            const triviaPromises = preguntas.map(pregunta => 
                new Promise((resolve, reject) => {
                    db.all('SELECT respuesta FROM TRIVIA_RESPUESTAS WHERE id_pregunta = ?', [pregunta.id_pregunta], (err, respuestas) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ pregunta: pregunta.pregunta, respuestas: respuestas.map(r => r.respuesta) });
                        }
                    });
                })
            );

            try {
                const triviaData = await Promise.all(triviaPromises);
                const trivia = triviaData.reduce((acc, item) => {
                    acc[item.pregunta] = item.respuestas;
                    return acc;
                }, {});
                res.json(trivia);
            } catch (err) {
                res.status(500).send('Error al obtener las respuestas');
            }
        });
    } catch (err) {
        res.status(500).send('Error inesperado');
    }
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
