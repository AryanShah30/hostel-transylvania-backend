import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, otp }: { email: string; otp: string }) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6eaa73aae0c4b6",
      pass: "9994913c9a2cc5"
    }
  });

  const mailOptions = {
    from: 'teamvolta@gmail.com',
    to: email,
    subject: "Verify your email",
    html: `<p>Your OTP is: ${otp}</p>`
  };

  await transport.sendMail(mailOptions);
};
