const sgMail = require("@sendgrid/mail");

// sendEmail returns a boolean reflecting the success status of sendgrid

module.exports = function sendEmail(type, email, info) {
    let success = false;
    let subject;
    let bodyText;
    let bodyHtml;

    switch(type) {
        // to Kevin – chapter POST that needs to be approved
        case "NEW_CHAPTER":
            subject = "A new chapter is awaiting your approval"
            bodyText = `There is a new Chapter requested by ${info.name} awaiting your approval in - ${info.City}, ${info.State}`
            break;
        // to Kevin - reunion POST that needs to be approved
        case "NEW_REUNION":
            subject = "A new reunion is awaiting your approval"
            bodyText = "CHANGE LATER - a new chapter is awaiting your approval"
            break;
        // to Kevin - someone is requesting to become a chapter leader
        case "NEW_LEADER":
            subject = "(NAME HERE) wants to become a chapter leader"
            bodyText = "CHANGE LATER - someone wants to join your chapter"
            break;
        // to chapter leader / Kevin – someone requesting to join chapter
        case "NEW_MEMBER":
            subject = `${info.user.name} wants to join ${info.chapter.title}`
            bodyText = `Good day ${info.leader.name}, \n You have a pending request from ${info.user.name} to join ${info.chapter.title}. To accept this request please visit your dashboard at: `
            break;
        // if no case is provided, values are null and sendgrid won't fire
        default:
            subject = null
            bodyText = null
            break;
    }

    if (subject && bodyText) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        console.log(process.env.SENDGRID_API_KEY)
        sgMail
        .send({
            to: email ,
            from: "ronxcamacho@gmail.com",
            subject: `Miracle Map – ${subject}`,
            text: bodyText,
            html: `
            <h2>${subject}</h2>
            <p>${bodyText}<p>
            <p><a href="https://production.d3iery6e42ccvf.amplifyapp.com/">Miracle Map</a></p>
            `
        })
        .then(() => {
            console.log("Email sent");
            success = true
        })
        .catch((err) => console.log("Sendgrid error:", err));
    }
    else console.log("Email not sent – type not provided");

    return success;
}