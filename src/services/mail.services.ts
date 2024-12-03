import nodemailer from "nodemailer";



export const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0231b166b704b9",
      pass: "eb73e7e3aed65e"
    }
  }
);

