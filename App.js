//imports
const express = require('express');
const app = express();
const db = require('./db/connection')
const bodyParser = require('body-parser')


//utilizar o body-parser
app.use(bodyParser.urlencoded({ extends: false }))

//db connection
db
    .authenticate()
    .then(() => {
        console.log("✅ Conectado com o banco de dados")
    })
    .catch(() => {
        console.log(`🔴Não conectou com o banco de dados`)
    })

//port
const PORT = 1010;

app.listen(
    PORT, () => {
        console.log(`🤖 >> Servidor rodando na porta ${PORT}`)
    }
)


//routes
app.get(
    "/", (req, res) => {
        res.send("Hello, está funcionando!")
    }
)



//importando as rotas dos jobs
//aqui eu imformo que todas as rotas começam com jobs
app.use(
    '/jobs', require('./routes/jobs')
)