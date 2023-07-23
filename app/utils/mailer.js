const nodeMailer = require('nodemailer');
console.log(process.env.EMAIL_PASS)
const transport = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, //ssl
    auth: {
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS
    },
    tls : {
        rejectUnauthorized : false,
    }
});

exports.sendMail = (email, fullname, subject, message)=>{
    const transporter = nodeMailer.createTransport(transport)

    transporter.sendMail({
        from : process.env.EMAIL,
        to : email,
        subject,
        html : `<h1>hello ${fullname}</h1>
                <div><h2>${message}</h2></div>
        `
    })
}