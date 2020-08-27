const express = require('express');
const app = express();

//Обьявляем константу для роутинга
const router = express.Router();
//Подключение файла роутинга simpleRouting
const simpleRouting = require('./routing/simpleRouting')

//подключаем конфиг файл
const config = require('./config');


//--------------------------------------------------------------------
//--------------------------------------------------------------------
//--------------------------------------------------------------------
//Использование функции промежуточной обработки для всех типов запросов в указанном пути
//Необходимо прописывать до основного обработчика, если у него нет метода Next()
app.use('/', function (req, res, next) {
    console.log('MAIN PAGE');
    console.log('Time:', Date.now());
    console.log('Request Type:', req.method);
    console.log('Request URL:', req.originalUrl);
    console.log();
    next();
});


//--------------------------------------------------------------------
//--------------------------------------------------------------------
//--------------------------------------------------------------------
//Если подключить, то можно будет убрать __dirname
//app.use(express.static('client/html'));

//--------------------------------------------------------------------
//Обработка GET запроса к корневому адресу '/' с одним обработчиком
app.get('/', (req, res) => {
    //Вывод страницы из файла
    res.sendFile(__dirname + '/client/html/index.html');
});

//Обработка GET запроса
app.get('/requestParams', (req, res) => {
    res.sendFile(__dirname + '/client/html/requestParams.html');
});




app.get('/requestParams/requestParams2', (req, res) => {
    res.sendFile(__dirname + '/client/html/requestParams2.html');
    console.log('REQUEST PARAMS PAGE');
    console.log('req.method:    ' + req.method); //Содержит метод запроса - GET, POST, PUT etc.
    console.log('req.originalUrl:   ' + req.originalUrl);
    console.log('req.baseUrl:   ' + req.baseUrl);
    console.log('path:  ' + req.path);
    console.log('params:    ' + req.params);
    console.log('hostname:  ' + req.hostname);
    console.log('ip:    ' + req.ip);
    console.log('ips:   ' + req.ips);
    console.log('protocol:  ' + req.protocol); //Содержит в строчной форме значение протокола - http или https
    console.log('query: ' + req.query);
    console.log('secure:    ' + req.secure);
    console.log('cookies:   ' + req.cookies);
    console.log('stale: ' + req.stale);
    console.log('subdomains:    ' + req.subdomains);
    console.log('body:  ' + req.body);
    console.log('url:   ' + req.url);
    console.log('headers:   ' + req.headers);
})

//--------------------------------------------------------------------
//Обработка GET запроса к адресу /secondPage с несколькими обработчиками
app.get('/secondPage',
    (req, res, next) => {
        res.sendFile(__dirname + '/client/html/secondPage.html');
        //Передача управления следующему обработчику
        next();
    },
    (req, res) => {
        console.log('Open second page');
    });


//--------------------------------------------------------------------
//Функции для обработки массивом функций по пути /images 
const cb0 = (req, res, next) => {
    res.send('Images!');
    next();
}

const cb1 = (req, res, next) => {
    console.log('Open');
    next();
}

const cb2 = (req, res) => {
    console.log('IMAGE PAGE');
}

//Обработка GET запроса к адресу /images массивом функций
app.get('/images', [cb0, cb1, cb2]);

//--------------------------------------------------------------------
//Теперь при вводе адреса http://localhost:3000/images/img1.jpg выведется картинка из папки с соответствующим именем 
app.use('/images', express.static('public/img'));


//--------------------------------------------------------------------
//Осуществление загрузки файла без перехода на страницу
app.get('/download', (req, res) => {
    //res.sendFile(__dirname + '/client/html/download.html');
    res.download(__dirname + '/public/img/img1.jpg', 'IMGGGG.jpg', (err) => {
        if (err) {
            console.log('ERROR!!!!!!!!!!');
        } else {
            console.log('Download succesful');
        }
    });
});


//--------------------------------------------------------------------
//--------------------------------------------------------------------
//--------------------------------------------------------------------
//Пример для использования разных обрабочиков запроса для одного пути
app.route('/routingFirst')
    .get(function (req, res) {
        res.sendFile(__dirname + '/client/html/routingFirst.html');
    })
    .post(function (req, res) {
        res.send('Add a book');
    })
    .put(function (req, res) {
        res.send('Update the book');
    });

//--------------------------------------------------------------------
//--------------------------------------------------------------------
//--------------------------------------------------------------------
app.get('/router', (req, res) => {
    res.sendFile(__dirname + '/client/html/router.html');
});

//Использование express.Routing из модуля routing/simpleRouting.js
//При этом обрабработка путей осуществляется в модуле
//Итоговый путь здесь - /router/пути из модуля
app.use('/router', simpleRouting);
//--------------------------------------------------------------------




//Осуществление прослушивания указанного порта
app.listen(config.PORT, () => {
    console.log(`listening port ${config.PORT}`);
    //console.log(`host name ${info.host}`);
});