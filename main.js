document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate Birth Year, Month, Day, Hour for Saju Form
    const yearSelect = document.getElementById('birth-year');
    const monthSelect = document.getElementById('birth-month');
    const daySelect = document.getElementById('birth-day');
    const hourSelect = document.getElementById('birth-hour');

    if (yearSelect) {
        const currentYear = new Date().getFullYear();
        for (let y = currentYear; y >= 1950; y--) {
            const option = document.createElement('option');
            option.value = y;
            option.textContent = `${y}년`;
            yearSelect.appendChild(option);
        }
    }

    if (monthSelect) {
        for (let m = 1; m <= 12; m++) {
            const option = document.createElement('option');
            option.value = m;
            option.textContent = `${m}월`;
            monthSelect.appendChild(option);
        }
    }

    if (daySelect) {
        for (let d = 1; d <= 31; d++) {
            const option = document.createElement('option');
            option.value = d;
            option.textContent = `${d}일`;
            daySelect.appendChild(option);
        }
    }

    if (hourSelect) {
        const hours = [
            "모름", "子(23:30~01:29)", "丑(01:30~03:29)", "寅(03:30~05:29)",
            "卯(05:30~07:29)", "辰(07:30~09:29)", "巳(09:30~11:29)",
            "午(11:30~13:29)", "未(13:30~15:29)", "申(15:30~17:29)",
            "酉(17:30~19:29)", "戌(19:30~21:29)", "亥(21:30~23:29)"
        ];
        hours.forEach((h, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = h;
            hourSelect.appendChild(option);
        });
    }

    // 2. Saju Form Submission
    const fortuneForm = document.getElementById('fortune-form');
    const resultDiv = document.getElementById('fortune-result');

    if (fortuneForm) {
        fortuneForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            
            // Basic logic for demonstration
            resultDiv.innerHTML = `
                <div style="margin-top: 2rem; padding: 1.5rem; background: #fffaf0; border-radius: 12px; border-left: 4px solid #d4af37;">
                    <h3 style="font-family: 'Noto Serif KR', serif; margin-bottom: 1rem;">${name}님의 연애운 분석 결과</h3>
                    <p style="color: #444; line-height: 1.8;">
                        올해는 <strong>도화살</strong>이 강하게 들어오는 시기로, 30대 중반의 인연이 매우 깊습니다. 
                        특히 하반기에 서쪽에서 귀인이 나타날 운세이며, 결혼운은 내년 가을이 가장 길조입니다.
                    </p>
                </div>
            `;
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 3. Keyword Tag Click Interaction
    const tags = document.querySelectorAll('.keyword-tag');
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            alert(`'${tag.textContent}'에 대한 전문 상담사 연결 또는 분석을 시작합니다.`);
        });
    });
});