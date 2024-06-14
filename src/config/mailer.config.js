import nodemailer from "nodemailer";


const transport = nodemailer.createTransport({
    service: "gmail",
    host:"smtp.gmail.com",
    secure: false,
    port: 587,
    auth:{
      user:process.env.MAIL_USERNAME,
      pass:process.env.MAIL_PASSWORD
    }
  })

  export async function sendEmail({to, subject, html}) {
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: to,
      subject: subject,
      html: html
    } 
    try {
      
      const info = await transport.sendMail(mailOptions)
        return info
    } catch (error) {
        console.log("Error al enviar el email")
    }
}


 /*  app.get("/mail", async (req, res)=>{
    const result = await transport.sendMail({
      from:"Correo de prueba",
      to:`${process.env.MAIL_USERNAME}`,
      subject: "Correo de prueba",
      html:`<div>
                <h1>CORREO TEST</h1>
                <p>Correo sin adjuntos</p>
            </div>`,
  
    })
    res.send("Correo enviado")
  
  }) */