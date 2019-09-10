var express = require('express');
var bodyParser = require('body-parser');
var pug = require('pug');

var app = express();
const PORT = 3000;

app.set('view engine', 'pug')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};

app.use(requestTime);
app.use('/', (req, res, next) => {    
    let responseText = 'Requested at: ' + req.requestTime + '';
    console.log(responseText)
    next();
})
app.get('/', (req, res, next) => {    
    res.render('index', {
        title:'Teste',
        botao_1: 'botao 1',
        botao_2: 'botao 2'
    })       
});

app.post('/answer', (req, res) => {    
    res.json({
        "Mensagem": "Ok"
    })
    console.log(req.body)
})

app.listen(PORT, () =>{
    console.log('Server running on port', PORT);    
} )