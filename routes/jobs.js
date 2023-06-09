const express = require('express')
const router = express.Router()
const Job = require('../model/Job')

//testes
router.get(
    "/teste", (req, res) => {
        res.send("Deu certo")
    }
)

//detalhe da vaga
router.get(
    '/view/:id', (req, res) => Job.findOne({
        where: { id: req.params.id }
    })
    .then(job => {
        res.render('view', {
            job
        })
    }).catch(err => console.log(err))

)

//rota do formulario
router.get('/add', (req, res) => {
    res.render("add")
})

//adicionar job via post
router.post(
    '/add',
    (req, res) => {

        //aqui eu pego todas as informações do corpo do projeto
        let { title, salary, company, description, email, new_job } = req.body;

        //inserir dados no sistemas
        Job.create({
                title,
                description,
                salary,
                company,
                email,
                new_job
            })
            .then(
                () => {
                    //se der certo o registro, ele redireciona para a home
                    res.redirect('/')
                }
            )
            .catch(
                err => console.log(`I rapaiz deu erro: ${err}`)
            )

    }
)

module.exports = router;