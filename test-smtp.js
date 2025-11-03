import nodemailer from "nodemailer";

async function testSMTP() {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true para SSL (465), false para TLS (587)
    auth: {
      user: "edwinzuleta13@gmail.com",
      pass: "dydc stcw bwwv tceo", // tu contraseña de aplicación de Gmail
    },
  });

  try {
    let info = await transporter.sendMail({
      from: '"Prueba Supabase" <edwinzuleta13@gmail.com>',
      to: "TU_EMAIL_DE_PRUEBA@gmail.com",
      subject: "Prueba SMTP desde Node",
      text: "Si ves este correo, tu SMTP está funcionando 🎉",
    });

    console.log("✅ Correo enviado:", info.messageId);
  } catch (err) {
    console.error("❌ Error SMTP:", err);
  }
}

testSMTP();
