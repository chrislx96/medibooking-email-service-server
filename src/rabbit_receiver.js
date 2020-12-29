const amqplib = require('amqplib/callback_api');
const nodemailer = require('nodemailer');
var emailContext = require('./context') ;

// Setup Nodemailer transport
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

// Create connection to AMQP server
amqplib.connect('amqp://:::5672', (err0, connection) => {
    if (err0) {
        throw err0;
    }
    // Create channel
    connection.createChannel((err1, channel) => {
        if (err1) {
            throw err1;
        }

        let queue = 'AppointmentEmail';
        // Ensure queue for messages
        channel.assertQueue(queue, {
            // Ensure that the queue is not deleted when server restarts
            durable: true
        });

        channel.consume(queue, (msg) => {
            //Convert data into JSON format
            const jsonFileContent = JSON.parse(msg.content)
            
            const emailContent = emailContext(jsonFileContent);

            const mailOptions = {
                from: 'medibookingserviceserver@gmail.com',
                to: `${jsonFileContent.email}`,
                subject: 'Your booking has been approved!',
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
                    setTimeout(() => {
                        connection.close();
                        process.exit(0)
                    }, 1000);
                }
            });

            

        }, {noAck:true});
    });
});