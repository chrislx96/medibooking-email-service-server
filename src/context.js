module.exports = (jsonFile) => {
    return `<h3 style="color: #008FB4">Dear ${jsonFile.patientFirstName},<br>
            Your booking has been approved. <br>
            The time you booked is ${jsonFile.startingTime}, ${jsonFile.date}. <br>
            See you soon.<br>
            ${jsonFile.doctorFirstName+' '+ jsonFile.doctorLastName}<br>
            Medibooking System</h3>
            <div 
                style=" background-color: gray;
                        background-size: cover;
                        width: 100%;
                        height: 250px;
                        display: flex;">
                <img src="cid:testforemail"/>
                <h2 style="color: white;padding: 100px 30px;">
                    Medibooking hopes you would be well
                </h2>
            </div>`
}