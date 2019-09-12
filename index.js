let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose')

let app = express();
const PORT = 3000;

// mongoose.connect('mongodb://localhost:27017/int_comp', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect('mongodb://admin:admin123@ds023603.mlab.com:23603/utils', {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB') 
});

// app.use('/bootstrap', express.static(__dirname + '/node_module/dist/css'))
app.set('view engine', 'pug')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};

let Node = require('./models/node')

app.get('/', (req, res, next) => {
    res.render('home')
})

app.get('/game', (req, res, next) => {
    let node_name = req.query.name || 'Raiz'    
    Node.find({$or: [{name: node_name}, {father: node_name}]}, (err, nodes) => {
        if(!err) {
            var button_condition = true
            var node_message
            var right_button
            var left_button
            nodes.map((node) => {                
                if(node.name === node_name && !!node.question){                    
                    node_message = node.question
                } else if(node.name === node_name) {                    
                    button_condition = false
                    node_message = "Você pensou em um" + node.termination + " " + node.name 
                } else if(node.last_answer == true) {                    
                    left_button = node.name
                } else {                    
                    right_button = node.name
                }
            })       
            console.log({node_message, left_button, right_button})
            res.render('game', {
                message: node_message,
                button_yes: left_button,
                button_no: right_button,
                final_answer: button_condition
            })           
        } else {
            console.log(err)
        }
    })           
});

app.post('/answer', (req, res) => {   
    
    Node.find({$or: [{node: req.body.name}, {father: req.body.name}]}, (err, node) => {
        if(!err) {            
            res.redirect(`/game/?name=${req.body.name}`)           
        } else {
            console.log(err)
        }
    })
    
})

app.listen(PORT, () =>{
    console.log('Server running on port', PORT);    
} )