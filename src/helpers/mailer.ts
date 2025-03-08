import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs"

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
      const hashedToken = await bcryptjs.hash(userId.toString(), 10)

      if(emailType === "VERIFY"){
          await User.findByIdAndUpdate(userId,{
            $set: {verifyToken: hashedToken,
             verifyTokenExpiry: Date.now() + 3600000}
            }
          )
      } else if(emailType === "RESET"){
          await User.findByIdAndUpdate(userId,{
            $set:{forgotPasswordToken:hashedToken, 
            forgotPasswordTokenExpiry: Date.now() + 
            3600000}
          }
          )
      }
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        service:"gmail",
        port: 2525,   
        auth: {
          user: "priyankgupta60214@gmail.com",
          pass: "gjilrhfeadzovaqf"
        }
      });
      
          const mailOptions = {
            from: 'priyankgupta60214@gmail.com',
            to: email, 
            subject: emailType === "VERIFY" ? 'VERIFY YOUR EMAIL': 'RESET YOUR PASSWORD',
            html: `<p> <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to
            to ${emailType === "VERIFY" ? "verify your email": "reset your password"} or copy paste the link in your browser.
            <br>${process.env.DOMAIN}/verifyemail?token= ${hashedToken}
            </p>`, 
          };
          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse

    } catch (error:any) {
        throw new Error(error.message)
    }
} 