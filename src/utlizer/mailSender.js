import nodemailer from 'nodemailer';


const mailSender = async (to, subject, text, html)=>{
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth : {
            user : 'shailendrakr2010@gmail.com',
            pass : "swhh eadm pnbm zboj"
        }
    })

    const mailOption = {
        from: 'shailendrakr2010@gmail.com',
        to,
        subject,
        text,
        html
    }

    const info = await transporter.sendMail(mailOption);

    console.log(info)

}


export default mailSender;