const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.post('/api/send-report', async (req, res) => {
  const { email, reportTitle, reportContent, name, lang = 'ko' } = req.body;

  if (!email || !reportContent) {
    return res.status(400).json({ error: 'Email and report content are required' });
  }

  // Basic localized email content (matching locales.js structure)
  const templates = {
    ko: {
        subject: `[Oracle] ${name}님의 ${reportTitle} 결과입니다.`,
        intro: `안녕하세요, ${name}님!`,
        body: `요청하신 <strong>${reportTitle}</strong> 결과입니다.`,
        footer: `본 메일은 연애운 오라클에서 발송되었습니다.`
    },
    en: {
        subject: `[Oracle] ${reportTitle} result for ${name}`,
        intro: `Hello, ${name}!`,
        body: `Here is your <strong>${reportTitle}</strong> result.`,
        footer: `This email was sent from Oracle of Love.`
    }
  };

  const t = templates[lang] || templates.ko;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Oracle <onboarding@resend.dev>',
      to: [email],
      subject: t.subject,
      html: `
        <div style="font-family: 'Pretendard', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #6a5acd;">✨ Oracle Love Fortune Report</h2>
          <p>${t.intro}</p>
          <p>${t.body}</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; line-height: 1.6;">
            ${reportContent.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 20px; font-size: 0.9em; color: #888;">${t.footer}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(400).json({ error });
    }

    res.status(200).json({ message: 'Email sent successfully', data });
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
