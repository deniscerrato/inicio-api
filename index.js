//MODULOS IMPORTADOS
const express = require('express');
const joi = require('joi')
const { param } = require('express/lib/request');
const res = require('express/lib/response')
const morgan = require('morgan')
// INSTANCIACION
const app = express()
const puerto = process.env.PORT || 3000;


let datos = [{ id: 1, nombre: "CPU" }, { id: 2, nombre: "MOUSE" },{ id: 3, nombre: "TECLADO" }]
let users = [{ user: "tobi", edad: 22 }]
// middelwares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// middelware terceros
app.use(morgan('tiny'))


// Lista de Usuarios
app.get('/api/users', (req, res) => {
    res.jsonp(users)
})


//Lista de Productos
app.get('/api/products', (req, res) => {
    res.jsonp(datos)
})



// Lista producto Especifico
app.get('/api/products/:id', (req, res) => {
    if (req.params.id >= datos.length) {
        res.status(404).send("No se encontro el producto")
    } else {
        res.jsonp(datos[req.params.id])
    }

})


// Envio datos a nuevo Usuario
app.post('/api/users', async (req, res) => {
    let schema = joi.object({
        user: joi.string().max(10).min(3),
        edad: joi.number().max(100).min(18)
    })
    try {
        const userValidate = await schema.validateAsync({ user: req.body.name, edad: req.body.edad });
        console.log(userValidate.user + ' Tiene ' + userValidate.edad)
        let user = {
            user: userValidate.user,
            edad: userValidate.edad
        }
    
        users.push(user)
        res.jsonp(users)
    }
    catch (err) { 
       
        res.status(400).send(err.details[0].message)
        return;
    }
    
})

app.listen(puerto, () => {
    console.log(" Puerto " + puerto)
})