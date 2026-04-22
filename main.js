
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('fortune-form');
    const nameInput = document.getElementById('name');
    const resultDiv = document.getElementById('fortune-result');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const selectYear = document.getElementById('birth-year');
    const selectMonth = document.getElementById('birth-month');
    const selectDay = document.getElementById('birth-day');
    const selectHour = document.getElementById('birth-hour');

    // Modal elements
    const modal = document.getElementById('inquiry-modal');
    const inquiryToggle = document.getElementById('inquiry-toggle');
    const closeBtn = document.querySelector('.close');

    inquiryToggle.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Populate selects
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1930; i--) {
        const option = new Option(`${i}년`, i);
        selectYear.add(option);
    }
    for (let i = 1; i <= 12; i++) {
        const option = new Option(`${i}월`, i);
        selectMonth.add(option);
    }
    for (let i = 1; i <= 31; i++) {
        const option = new Option(`${i}일`, i);
        selectDay.add(option);
    }
    
    const sajuHours = [
        { name: "자시 (子時)", range: "23:30 ~ 01:30" },
        { name: "축시 (丑時)", range: "01:30 ~ 03:30" },
        { name: "인시 (寅時)", range: "03:30 ~ 05:30" },
        { name: "묘시 (卯時)", range: "05:30 ~ 07:30" },
        { name: "진시 (辰時)", range: "07:30 ~ 09:30" },
        { name: "사시 (巳時)", range: "09:30 ~ 11:30" },
        { name: "오시 (午時)", range: "11:30 ~ 13:30" },
        { name: "미시 (未時)", range: "13:30 ~ 15:30" },
        { name: "신시 (申時)", range: "15:30 ~ 17:30" },
        { name: "유시 (酉時)", range: "17:30 ~ 19:30" },
        { name: "술시 (戌時)", range: "19:30 ~ 21:30" },
        { name: "해시 (亥時)", range: "21:30 ~ 23:30" }
    ];

    sajuHours.forEach((hour, index) => {
        const option = new Option(`${hour.name} (${hour.range})`, index);
        selectHour.add(option);
    });
    selectHour.add(new Option("시간 모름", "unknown"));

    // Theme logic
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        themeIcon.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value;
        const year = selectYear.value;
        const month = selectMonth.value;
        const day = selectDay.value;
        const hour = selectHour.value;
        const calendarType = document.querySelector('input[name="calendar-type"]:checked').value;

        if (!name || !year || !month || !day || !hour) {
            displayFortune("모든 항목을 선택해 주세요.");
            return;
        }

        // Use selected values for seed generation
        const birthdate = `${year}-${month}-${day}`;
        const birthtime = hour; // Can be index "0"-"11" or "unknown"

        const fortune = generateSajuFortune(name, birthdate, birthtime, calendarType);
        displayFortune(fortune);
    });

    function generateSajuFortune(name, birthdate, birthtime, calendarType) {
        const overallFortunes = [
            "천간의 기운이 조화로워 매사에 막힘이 없는 형국입니다. 스스로의 재능을 믿고 나아갈 때 큰 성취를 이룰 수 있는 사주입니다.",
            "지지의 기운이 요동치나 이는 곧 큰 변화를 위한 예비 단계입니다. 인내심을 갖고 때를 기다리면 반드시 만개할 운명입니다.",
            "오행의 흐름이 한쪽으로 치우치지 않아 평탄하고 안정적인 삶의 궤적을 그립니다. 주변 사람들과의 화합이 인생의 열쇠가 될 것입니다.",
            "강한 화(火)의 기운을 타고나 추진력이 남다릅니다. 시작은 창대하나 마무리를 차분히 한다면 명예와 부를 동시에 거머쥘 수 있습니다.",
            "토(土)의 기운이 굳건하여 신용이 두텁고 만인의 신뢰를 얻는 사주입니다. 한 분야에 정진할 때 전문가로서 대성할 기운입니다."
        ];

        const wealthLuck = [
            "재물운인 '재성'이 왕성하게 들어와 있어 생각지 못한 곳에서 이익이 발생할 수 있습니다. 특히 문서와 관련된 운이 좋습니다.",
            "재물이 모이는 속도보다 나가는 구멍이 클 수 있으니 지출 관리에 유의해야 합니다. 투기성 투자보다는 저축이 유리한 시기입니다.",
            "현재는 씨를 뿌리는 시기입니다. 당장의 큰 이득은 없으나 성실히 기반을 닦으면 훗날 거대한 부의 강을 이룰 것입니다."
        ];

        const careerLuck = [
            "'관직운'이 비치고 있어 조직 내에서의 승진이나 권한이 강화될 가능성이 큽니다. 리더십을 발휘하기에 최적의 시기입니다.",
            "창의적인 업무나 예술적인 분야에서 두각을 나타낼 '식신'의 기운이 강합니다. 본인만의 독특한 아이디어를 세상에 내놓으세요.",
            "직장 동료나 파트너와의 협업이 중요한 때입니다. 독단적인 결정보다는 의견 수렴을 통해 시너지를 내는 것이 성공의 지름길입니다."
        ];

        const loveLuck = [
            "인연운이 매우 길하여 미혼자라면 평생의 동반자를 만날 기회가 생기고, 기혼자라면 부부 사이가 더욱 독독해질 운세입니다.",
            "자신의 매력이 돋보이는 '도화살'의 기운이 긍정적으로 작용합니다. 대인관계에서 인기를 얻고 사람들의 주목을 받게 될 것입니다.",
            "감정의 기복이 있을 수 있는 시기입니다. 상대방의 입장을 먼저 생각하는 배려가 깊은 관계를 유지하는 비결이 될 것입니다."
        ];

        // Seed generation for consistent results based on input
        const dateObj = new Date(birthdate);
        const hourSeed = birthtime === 'unknown' ? 99 : parseInt(birthtime);
        const seed = name.length + dateObj.getFullYear() + dateObj.getMonth() + dateObj.getDate() + hourSeed;

        const getIdx = (arr, offset = 0) => (seed + offset) % arr.length;

        const resultHeader = calendarType === 'lunar' ? "[음력 정통 사주 풀이]" : "[양력 정통 사주 풀이]";
        
        const fortuneText = `
            <div class="fortune-header">${resultHeader}</div>
            <div class="fortune-section">
                <h3>✨ 총평</h3>
                <p>${overallFortunes[getIdx(overallFortunes)]}</p>
            </div>
            <div class="fortune-grid">
                <div class="fortune-item">
                    <h4>💰 재물운</h4>
                    <p>${wealthLuck[getIdx(wealthLuck, 1)]}</p>
                </div>
                <div class="fortune-item">
                    <h4>💼 직업/명예</h4>
                    <p>${careerLuck[getIdx(careerLuck, 2)]}</p>
                </div>
                <div class="fortune-item">
                    <h4>❤️ 애정/인연</h4>
                    <p>${loveLuck[getIdx(loveLuck, 3)]}</p>
                </div>
            </div>
            <div class="fortune-footer">
                * 위 내용은 명리학적 통계를 바탕으로 한 조언이며, 운명은 스스로의 노력으로 개척해 나가는 것입니다.
            </div>
        `;

        return fortuneText;
    }

    function displayFortune(fortune) {
        resultDiv.style.opacity = 0;
        setTimeout(() => {
            resultDiv.innerHTML = fortune;
            resultDiv.style.opacity = 1;
        }, 300);
    }
});
