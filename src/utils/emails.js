// install and use nodemailer
//configure email server
//whom and what to sendemail, make email body
//use ther previos config to send email

import nodemailer from "nodemailer";

const emailProcessing = async (emailInfo) => {
  try {
    //config
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    //send email
    const info = await transporter.sendMail(emailInfo);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.log(error);
  }
};

//email templeting

export const adminSignUPEmailVerification = ({ email, fName }, url) => {
  // send mail with defined transport object
  let info = {
    from: `"Register Form" <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: "New account verification, Action Required", // Subject line
    text: `Hi ${fName}, Please follow the link ${url} to verify your account`, // plain text body
    html: `
        <p> Hi ${fName}</p>
        </br>
        </br>
        Please follow the link to verify your email
        </br>
        </br>
        <a href="${url}" style="color:red; font-weight: bolder;"> Verify Email</a>
        </br>
        </br>
        <p>
        -------------
        
        </br>
        </br>
        customer care
       
        </p>
        
        `, // html body
  };

  emailProcessing(info);
};

//otp templeing
export const otpNotification = ({ token, email, fName }, url) => {
  // send mail with defined transport object
  let info = {
    from: `"Coding Shop" <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: "New account verification, Action Required", // Subject line
    text: `Hi ${fName}, Please follow the link ${url} to verify your account`, // plain text body
    html: `
        <p> Hi ${fName}</p>
        </br>
        </br>
        Here is your token
        </br>
        </br>
      ${token}
        </br>
        </br>
        <p>
        -------------
        
        </br>
        </br>
        customer care
       
        </p>
        
        `, // html body
  };

  emailProcessing(info);
};


