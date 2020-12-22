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

router.get('/sendmail', async (ctx, next)=>{
    console.log('Params:');
    console.log(ctx.query);
    const { email, name } = ctx.query;
    ctx.body = "Hi, your email is being sent";
    await ctx.app.pool.query(`SELECT username, emailaddress from usertable`, (err, res) => {
        //console.log('res')
        //console.log(res)
        if (err){
            console.log(err.message);
        }
        if (res.rowCount > 0){
            console.log("Res.row",res.rows)
            const rows = res.rows;
            console.log(rows);
            console.log(name);
            const address = res.rows[0].emailaddress;
            const mailOptions = {
                from: 'medibookingserviceserver@gmail.com',
                to: `${address}`,
                subject: 'Your booking has been approved!',
                html: `Dear customer,<br>Your booking has been approved. See you soon.<br><img src="cid:testforemail"/>`,
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
            }) 
            console.log('the body part', ctx.body);
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