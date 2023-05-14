const nodemailer=require("nodemailer");

const transport = nodemailer.createTransport({
service: "Gmail",
auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER__PASS
},
});

module.exports.sendConfirmationEmail = (email, verificationcode ) => {
    transport.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject:"Confirm your account login",
        html: `<h1>Confirmation mail </h1>
        <h2> Good morning,</h2>
        <p> To Login paste this code in the designed interface </p>
        <p> ${activationCode} </p>`
    })
    .catch ((err) => console.log(err));
}