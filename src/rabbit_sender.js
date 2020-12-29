const amqplib = require('amqplib/callback_api');

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
        let msg = {"email":"dustinljh@gmail.com","date":"2020-01-02","startingTime":"17:53:34","notes":"message","patientFirstName":"Jonathan","patientLastName":"Lawrence","doctorFirstName":"Xu","doctorLastName":"Mary"}
        // Ensure queue for messages
        channel.assertQueue(queue, {
            durable: true
        });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
        //console.log("[x] Sent %s", msg);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0)
    }, 500);
    
});

