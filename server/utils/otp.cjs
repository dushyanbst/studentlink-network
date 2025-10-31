const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPViaTwilio = async (phone, otp) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !twilioPhone) {
    console.log('Twilio not configured. OTP:', otp);
    return { success: true, message: 'OTP sent (simulated)', otp };
  }

  try {
    const twilio = require('twilio');
    const client = twilio(accountSid, authToken);

    await client.messages.create({
      body: `Your Campus Link verification code is: ${otp}. Valid for 10 minutes.`,
      from: twilioPhone,
      to: phone
    });

    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.error('Twilio error:', error);
    return { success: false, message: 'Failed to send OTP', error: error.message };
  }
};

const sendOTPViaEmail = async (email, otp) => {
  console.log(`Sending OTP ${otp} to email: ${email}`);
  return { success: true, message: 'OTP sent to email (simulated)', otp };
};

module.exports = {
  generateOTP,
  sendOTPViaTwilio,
  sendOTPViaEmail
};
