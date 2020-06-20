const sgMail = require("@sendgrid/mail");

// sendEmail returns a boolean reflecting the success status of sendgrid

module.exports = function sendEmail(type, email, info) {
  let success = false;
  let subject;
  let bodyText;
  let bodyHtml;

  switch (type) {
    // to Kevin – chapter POST that needs to be approved
    case "NEW_CHAPTER":
      subject = `${info.requester.name} is requesting to start a chapter in ${info.chapter.city}, ${info.chapter.state}`;
      bodyText = `There is a new Chapter requested by ${info.requester.name} awaiting your approval in - ${info.chapter.city}, ${info.chapter.state}. To accept this request please visit your dashboard at:`;
      break;
    // to Kevin - reunion POST that needs to be approved
    case "NEW_REUNION":
      subject = `A reunion for ${info.reunion.title} is awaiting approval from ${info.user.name}`;
      bodyText = `Good day ${info.leader.name}, \n You have a pending request from ${info.user.name} to publish a reunion for ${info.reunion.title}. To accept this request please visit your dashboard at:`;
      break;
    // to Super Admin - someone is requesting to become a chapter leader
    case "NEW_LEADER":
      subject = `${info.user.name} wants to become a leader of ${info.chapter.title}`;
      bodyText = `Good day ${info.leader.name}, \n You have a pending request from ${info.user.name} to become a leader of ${info.chapter.title}. To accept this request please visit your dashboard at: `;
      break;
    // to chapter leader / Super Admin – someone requesting to join chapter
    case "NEW_MEMBER":
      subject = `${info.user.name} wants to join ${info.chapter.title}`;
      bodyText = `Good day ${info.leader.name}, \n You have a pending request from ${info.user.name} to join ${info.chapter.title}. To accept this request please visit your dashboard at: `;
      break;
    case "APPROVED_MEMBER":
      subject = "";
      bodyText = "";
      break;
    case "APPROVED_CHAPTER":
      subject = "";
      bodyText = "";
      break;
    case "APPROVED_LEADER":
      subject = "";
      bodyText = "";
      break;
    case "APPROVED_REUNION":
      subject = "";
      bodyText = "";
      break;
    // if no case is provided, values are null and sendgrid won't fire
    default:
      subject = null;
      bodyText = null;
      break;
  }

  if (subject && bodyText) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail
      .send({
        to: email,
        from: "miraclemessagesdev@gmail.com",
        subject: `Miracle Messages – ${subject}`,
        text: bodyText,
        html: `
        <div style="max-width:600px; margin:auto" >                                 
            <div style="padding-right:400px;">
                <img   style="width:100%;"  src="https://miraclemessagesimages.s3.amazonaws.com/logo.png">
            </div>
            <div style="padding:18px 0px; line-height:22px; text-align:inherit; color:#000000" >
                ${bodyText}
            </div>
            <a href="https://production.d3iery6e42ccvf.amplifyapp.com/" style="background-color:#333333; border:1px solid #000000; border-radius:6px; color:#ffffff; display:inline-block; font-size:14px; padding:12px 18px; text-decoration:none">MiracleMap.net</a>  
        </div>
            `,
      })
      .then(() => {
        console.log("Email sent");
        success = true;
      })
      .catch((err) => console.log("Sendgrid error:", err));
  } else console.log("Email not sent – type not provided");

  return success;
};
