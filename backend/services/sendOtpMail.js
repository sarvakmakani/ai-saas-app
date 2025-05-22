const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "spamacc.noreply@gmail.com",
    pass: "ytei ofqi eacl dbws",
  },
});

const sendOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"SaaSFlow" <${"spamacc.noreply@gmail.com"}>`,
    to: email,
    subject: 'OTP Verification',
    html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>OTP Verification Email</title>
  <style>
    /* Reset some basic styles */
    body, p, div {
      margin: 0;
      padding: 0;
    }
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      color: #333333;
    }
    .container {
      max-width: 480px;
      margin: 40px auto;
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      text-align: center;
    }
    h1 {
      color: #2563eb;
      font-weight: 700;
      margin-bottom: 16px;
    }
    p {
      font-size: 16px;
      margin-bottom: 24px;
      line-height: 1.5;
    }
    .otp-code {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 10px;
      background: #e0e7ff;
      padding: 12px 20px;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 30px;
      user-select: all;
    }
    .footer {
      font-size: 13px;
      color: #888888;
      margin-top: 30px;
    }
    @media screen and (max-width: 520px) {
      .container {
        margin: 20px;
        padding: 20px;
      }
      .otp-code {
        font-size: 24px;
        letter-spacing: 6px;
        padding: 10px 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Verify Your Email</h1>
    <p>Use the following one-time password (OTP) to complete your verification. This code is valid for 10 minutes.</p>
    <div class="otp-code">${otp}</div>
    <p>If you did not request this code, please ignore this email.</p>
    <div class="footer">© 2025 SaaSFlow. All rights reserved.</div>
  </div>
</body>
</html>`,
  });
};

module.exports = { sendOtpEmail };
