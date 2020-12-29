//KOA connection


const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');
const cors = require('koa2-cors');
const bodyparser = require('koa-bodyparser');
const http = require('http');
//Database postgresql connection
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
var emailContext = require('./context') ;
const app = new Koa();
const router = new Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: 'medibookingserviceserver@gmail.com',
        pass: 'MBSSproject3',
    }
});

app.pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'project3',
    password: 'post!23Qwe',
    port: 5432,
})

router.get('/sendmail',(ctx, next)=>{
    console.log('Params:');
    console.log(ctx.query);
    //json格式的文件传入(Done)
    //const { username, emailaddress, information } = ctx.query;
    const jsonFileContent = ctx.query;
    ctx.body = "Hi, your email is being sent";

    const emailContent = emailContext(jsonFileContent.username, jsonFileContent.information);
    const mailOptions = {
        from: 'medibookingserviceserver@gmail.com',
        to: `${jsonFileContent.emailaddress}`,
        subject: 'Your booking has been approved!',
        //页面设计一下与前端相符，看是否能将html内容封装再引用参数。
        html: emailContent,
        attachments:[{
            filename:'allgood.jpg',
            path: './public/allgood.jpg',
            cid:'testforemail'
        }]
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
    next();
})

app.use(Logger());
app.use(cors());
app.use(bodyparser());
app.use(router.routes());

//Run on loaclhost:8000

http.createServer(app.callback()).listen(8000);