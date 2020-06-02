const sgMail = require("@sendgrid/mail");

module.exports = function sendEmail(type, email) {
    let success = false;
    let subject;
    let bodyText;
    let bodyHtml;

    console.log(email);

    switch(type) {
        case "NEW_CHAPTER":
            subject = "A new chapter is awaiting your approval"
            bodyText = "CHANGE LATER - a new chapter is awaiting your approval"
            break;
        case "NEW_REUNION":
            subject = "A new reunion is awaiting your approval"
            bodyText = "CHANGE LATER - a new chapter is awaiting your approval"
            break;
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail
    .send({
        to: email ? email : "alex@karren.com",
        from: "alex@karren.com",
        subject: `Miracle Map – ${subject}`,
        text: bodyText,
        html: `<h3>this is what HTML looks like<h3>`
    })
    .then(() => {
        console.log("Email sent");
        success = true
    })
    .catch((err) => {
        console.log("Sendgrid error:", err);
        success = false;
    });

    return success;
}