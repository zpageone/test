export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const { email, reportTitle, reportContent, name } = await request.json();

    if (!email || !reportContent) {
      return new Response(JSON.stringify({ error: 'Email and report content are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const resendApiKey = env.RESEND_API_KEY;
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY is not configured in environment' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Oracle <onboarding@resend.dev>',
        to: [email],
        subject: `[Oracle] ${name}님의 ${reportTitle} 결과입니다.`,
        html: `
          <div style="font-family: 'Pretendard', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #6a5acd;">✨ Oracle 연애운 리포트</h2>
            <p>안녕하세요, ${name}님!</p>
            <p>요청하신 <strong>${reportTitle}</strong> 결과입니다.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; line-height: 1.6;">
              ${reportContent.replace(/\n/g, '<br>')}
            </div>
            <p style="margin-top: 20px; font-size: 0.9em; color: #888;">본 메일은 연애운 오라클에서 발송되었습니다.</p>
          </div>
        `,
      })
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ error: data }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ message: 'Email sent successfully', data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error', details: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
