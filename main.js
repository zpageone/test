
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('fortune-form');
    const nameInput = document.getElementById('name');
    const birthdateInput = document.getElementById('birthdate');
    const resultDiv = document.getElementById('fortune-result');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

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
        const birthdate = birthdateInput.value;
        const birthtime = document.getElementById('birthtime').value;
        const calendarType = document.querySelector('input[name="calendar-type"]:checked').value;

        if (!name || !birthdate || !birthtime) {
            displayFortune("모든 항목을 입력해 주세요.");
            return;
        }

        const fortune = generateSajuFortune(name, birthdate, birthtime, calendarType);
        displayFortune(fortune);
    });

    function generateSajuFortune(name, birthdate, birthtime, calendarType) {
        const fortunes = [
            `{name}님, 올해는 '재물운'이 강하게 들어오는 해입니다. 계획하던 투자가 있다면 긍정적으로 검토해 보세요.`,
            `{name}님의 사주에 '문창성'이 비치고 있습니다. 학업이나 전문 지식을 습득하는 데 아주 좋은 시기입니다.`,
            `올해 {name}님께는 '귀인'의 도움이 예상됩니다. 주변 사람들과의 관계를 소중히 하시면 큰 도움을 얻을 것입니다.`,
            `사주에 '역마살'의 기운이 있습니다. 이동이나 변화가 많을 수 있으나, 이는 오히려 성장의 발판이 될 것입니다.`,
            `{name}님은 '식신'의 기운이 풍부하여 의식주에 부족함이 없고 주변에 베푸는 마음이 복으로 돌아올 사주입니다.`,
            `현재 '관운'이 상승하고 있습니다. 직장에서의 승진이나 명예를 얻을 기회가 생길 수 있으니 자신감을 가지세요.`,
            `{name}님의 사주는 '오행'의 조화가 잘 이루어져 있어 건강하고 평탄한 운 흐름을 보이고 있습니다.`
        ];

        // Simple seed for randomness based on input
        const dateObj = new Date(birthdate);
        const timeParts = birthtime.split(':');
        const seed = name.length + dateObj.getFullYear() + dateObj.getMonth() + dateObj.getDate() + parseInt(timeParts[0]);
        
        const fortuneIndex = seed % fortunes.length;
        let result = fortunes[fortuneIndex].replace('{name}', name);

        if (calendarType === 'lunar') {
            result = "[음력 사주] " + result;
        }

        return result;
    }

    function displayFortune(fortune) {
        resultDiv.style.opacity = 0;
        setTimeout(() => {
            resultDiv.textContent = fortune;
            resultDiv.style.opacity = 1;
        }, 300);
    }
});
