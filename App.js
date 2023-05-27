//imports
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const db = require('./db/connection')
const bodyParser = require('body-parser')


//utilizar o body-parser
app.use(bodyParser.urlencoded({ extends: false }))

//utilizar o handlebars... ele acessa a pasta views
app.set('views', path.join(__dirname, 'view'));

//aqui informar qual a parte que mais se repete na aplicação
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', '.hbs');


/*app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');*/

//pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')))


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

        res.render("index")

    }
)



//importando as rotas dos jobs
//aqui eu imformo que todas as rotas começam com jobs
app.use(
    '/jobs', require('./routes/jobs')
)