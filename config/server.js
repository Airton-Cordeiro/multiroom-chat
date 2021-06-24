const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const app = express();

/*setar as variaveis 'view engine' e 'views' do express*/
app.set('view engine', 'ejs');
app.set('views', './app/views');

/*configurar o middleware express.static*/
app.use(express.static('./app/public'));

/*configurar o middleware bosyParser */
app.use(bodyParser.urlencoded({extended: true}))

/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app*/

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)

/*exportando o objeto app*/
module.exports = app