//Original method to send the email
const nodemailer = require('nodemailer');

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

const mailOptions = {
    from: 'medibookingserviceserver@gmail.com',
    to: 'dustinljh@gmail.com',
    subject: 'Your booking has been approved!',
    html: 'Dear Customer,<br>Your booking has been approved. See you soon.<br><img src="cid:testforemail"/>',
    attachments:[{
        filename:'allgood.jpg',
        path: './allgood.jpg',
        cid:'testforemail'
    }]
};

export {transporter, mailOptions};
/* transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }
) */