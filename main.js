document.addEventListener('DOMContentLoaded', () => {
    // --- 1. i18n Core Logic ---
    let currentLang = localStorage.getItem('lang') || (navigator.language.startsWith('ko') ? 'ko' : 'en');

    function updateUI() {
        const langData = translations[currentLang];
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            
            // Handle placeholders
            if (key.startsWith('[placeholder]')) {
                const actualKey = key.replace('[placeholder]', '');
                el.placeholder = getNestedValue(langData, actualKey);
            } 
            // Handle text content specifically (for select options etc)
            else if (key.startsWith('[text]')) {
                const actualKey = key.replace('[text]', '');
                el.textContent = getNestedValue(langData, actualKey);
            }
            else {
                el.innerHTML = getNestedValue(langData, key);
            }
        });

        // Update Toggle Button Text
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.textContent = currentLang === 'ko' ? '🌐 EN' : '🌐 KO';
        }

        // Update HTML lang attribute
        document.documentElement.lang = currentLang;
    }

    function getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj) || path;
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        updateUI();
        // Custom logic for pages that need refresh or specific updates
        if (typeof populateSajuSelects === 'function') populateSajuSelects();
        if (typeof populateDailySelect === 'function') populateDailySelect();
    }

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setLanguage(currentLang === 'ko' ? 'en' : 'ko');
        });
    }

    // Initialize UI
    updateUI();

    // --- 2. Common UI: Modal Logic ---
    const modal = document.getElementById('method-modal');
    const keywordCards = document.querySelectorAll('.keyword-card');
    const displayKeyword = document.getElementById('display-keyword');
    const closeModal = document.querySelector('.close-modal');

    if (modal) {
        keywordCards.forEach(card => {
            card.addEventListener('click', () => {
                const keyword = card.getAttribute('data-keyword');
                displayKeyword.textContent = keyword;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        const hideModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        if (closeModal) closeModal.addEventListener('click', hideModal);
        window.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });
    }

    // --- 3. Tarot Logic (tarot.html) ---
    const cardSpread = document.getElementById('card-spread');
    if (cardSpread) {
        const tarotImgBase = "https://www.sacred-texts.com/tarot/pkt/img/";
        const tarotImgs = ["ar06.jpg", "ar18.jpg", "ar19.jpg", "ar16.jpg", "ar17.jpg"];

        // Generate 10 cards in a fan spread
        for (let i = 0; i < 10; i++) {
            const card = document.createElement('div');
            card.className = 'tarot-card-item';
            const angle = (i - 4.5) * 8;
            const xPos = (i - 4.5) * 30;
            card.style.transform = `translateX(${xPos}px) rotate(${angle}deg)`;
            card.addEventListener('click', () => pickCard(card));
            cardSpread.appendChild(card);
        }

        function pickCard(selectedElement) {
            const allCards = document.querySelectorAll('.tarot-card-item');
            allCards.forEach(c => c.style.pointerEvents = 'none');

            selectedElement.style.zIndex = '1000';
            selectedElement.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            selectedElement.style.transform = 'translateY(-150px) rotateY(180deg) scale(1.6)';
            selectedElement.style.opacity = '0';

            setTimeout(() => {
                const cardSpread = document.getElementById('card-spread');
                const tarotIntro = document.querySelector('.tarot-intro');
                if (cardSpread) cardSpread.style.display = 'none';
                if (tarotIntro) tarotIntro.style.display = 'none';
                
                const cardIndex = Math.floor(Math.random() * translations[currentLang].tarot.cards.length);
                const result = translations[currentLang].tarot.cards[cardIndex];
                const resultView = document.getElementById('tarot-result-view');
                const resultImg = document.getElementById('result-card-img');
                const resultName = document.getElementById('result-card-name');
                const resultText = document.getElementById('result-interpretation');
                
                if (resultImg) resultImg.src = tarotImgBase + tarotImgs[cardIndex];
                if (resultName) resultName.textContent = result.name;
                if (resultText) resultText.textContent = result.text;
                
                if (resultView) {
                    resultView.style.display = 'block';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 600);
        }
    }

    // --- 4. Saju Logic (saju.html) ---
    function populateSajuSelects() {
        const populateSelect = (id, start, end, suffix) => {
            const select = document.getElementById(id);
            if (!select) return;
            const currentVal = select.value;
            select.innerHTML = `<option value="" disabled selected>${select.options[0].text}</option>`;
            for (let i = start; i <= end; i++) {
                const opt = document.createElement('option');
                opt.value = i; opt.textContent = `${i}${currentLang === 'ko' ? suffix : ''}`;
                select.appendChild(opt);
            }
            if (currentVal) select.value = currentVal;
        };

        const yearSelect = document.getElementById('birth-year');
        if (yearSelect) {
            const currentVal = yearSelect.value;
            yearSelect.innerHTML = `<option value="" disabled selected data-i18n="[text]daily.year_placeholder">${translations[currentLang].daily.year_placeholder}</option>`;
            const currentYear = new Date().getFullYear();
            for (let y = currentYear; y >= 1950; y--) {
                const opt = document.createElement('option');
                opt.value = y; opt.textContent = `${y}${currentLang === 'ko' ? '년' : ''}`;
                yearSelect.appendChild(opt);
            }
            if (currentVal) yearSelect.value = currentVal;
        }
        populateSelect('birth-month', 1, 12, '월');
        populateSelect('birth-day', 1, 31, '일');
        
        const hourSelect = document.getElementById('birth-hour');
        if (hourSelect) {
            const currentVal = hourSelect.value;
            const hours = currentLang === 'ko' ? 
                ["모름", "子(23:30~01:29)", "丑(01:30~03:29)", "寅(03:30~05:29)", "卯(05:30~07:29)", "辰(07:30~09:29)", "巳(09:30~11:29)", "午(11:30~13:29)", "未(13:30~15:29)", "申(15:30~17:29)", "酉(17:30~19:29)", "戌(19:30~21:29)", "亥(21:30~23:29)"] :
                ["Unknown", "Rat (23:30~01:29)", "Ox (01:30~03:29)", "Tiger (03:30~05:29)", "Rabbit (05:30~07:29)", "Dragon (07:30~09:29)", "Snake (09:30~11:29)", "Horse (11:30~13:29)", "Goat (13:30~15:29)", "Monkey (15:30~17:29)", "Rooster (17:30~19:29)", "Dog (19:30~21:29)", "Pig (21:30~23:29)"];
            hourSelect.innerHTML = `<option value="" disabled selected>${currentLang === 'ko' ? '시' : 'Hour'}</option>`;
            hours.forEach((h, i) => {
                const opt = document.createElement('option');
                opt.value = i; opt.textContent = h;
                hourSelect.appendChild(opt);
            });
            if (currentVal) hourSelect.value = currentVal;
        }
    }
    populateSajuSelects();

    const fortuneForm = document.getElementById('fortune-form');
    if (fortuneForm) {
        fortuneForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const resultDiv = document.getElementById('fortune-result');
            const sajuLang = translations[currentLang].saju;
            
            fortuneForm.style.display = 'none';
            const subTitle = document.querySelector('.sub-page-title');
            if (subTitle) subTitle.style.display = 'none';

            resultDiv.innerHTML = `
                <div class="result-container" style="animation: fadeIn 0.8s ease;">
                    <div class="result-text-box" style="text-align: left; border-top: 4px solid var(--primary-purple);">
                        <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem; font-family: 'Noto Serif KR', serif;">
                            ${sajuLang.result_header.replace('{name}', name)}
                        </h3>
                        <p style="margin-bottom: 1.2rem; line-height: 1.8;">${sajuLang.templates.nature.replace('{name}', name)}</p>
                        <p style="margin-bottom: 1.2rem; line-height: 1.8;">${sajuLang.templates.flow}</p>
                        <p style="margin-bottom: 1.2rem; line-height: 1.8;">${sajuLang.templates.spouse}</p>
                        <p style="margin-bottom: 1.2rem; line-height: 1.8;">${sajuLang.templates.marriage}</p>
                        <p style="line-height: 1.8; color: var(--primary-purple); font-weight: 600;">${sajuLang.templates.advice.replace('{name}', name)}</p>
                    </div>
                    <button class="retry-btn" onclick="location.reload()" style="margin-top: 1rem;">${sajuLang.retry}</button>
                </div>
            `;
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- 5. Daily Zodiac Fortune (daily.html) ---
    function populateDailySelect() {
        const dailyYearSelect = document.getElementById('birth-year-daily');
        if (dailyYearSelect) {
            const currentVal = dailyYearSelect.value;
            dailyYearSelect.innerHTML = `<option value="" disabled selected>${translations[currentLang].daily.year_placeholder}</option>`;
            const currentYear = new Date().getFullYear();
            for (let y = currentYear; y >= 1950; y--) {
                const opt = document.createElement('option');
                opt.value = y; opt.textContent = `${y}${currentLang === 'ko' ? '년' : ''}`;
                dailyYearSelect.appendChild(opt);
            }
            if (currentVal) dailyYearSelect.value = currentVal;
        }
    }
    populateDailySelect();

    const viewDailyBtn = document.getElementById('view-daily-fortune');
    if (viewDailyBtn) {
        viewDailyBtn.addEventListener('click', () => {
            const year = document.getElementById('birth-year-daily').value;
            if (!year) return;

            const dailyLang = translations[currentLang].daily;
            const zodiacEmojis = ["🐭", "🐮", "🐯", "🐰", "🐲", "🐍", "🐴", "🐑", "🐵", "🐔", "🐶", "🐷"];
            const zodiacIndex = (year - 4) % 12;
            const myZodiac = dailyLang.zodiacs[zodiacIndex];
            const myEmoji = zodiacEmojis[zodiacIndex];
            
            const daySeed = new Date().getDate();
            const fortuneIndex = (parseInt(year) + daySeed) % dailyLang.fortunes.length;
            const todayFortune = dailyLang.fortunes[fortuneIndex];
            const resultDiv = document.getElementById('daily-fortune-result');

            resultDiv.innerHTML = `
                <div class="result-text-box" style="margin-top: 2rem; border-top: 4px solid var(--accent-pink);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">${myEmoji}</div>
                    <h3 style="font-size: 1.4rem; margin-bottom: 1rem;">${dailyLang.result_title.replace('{year}', year).replace('{zodiac}', myZodiac)}</h3>
                    <p style="font-size: 1.1rem; line-height: 1.8; color: #333d4b;">${todayFortune}</p>
                    <div style="margin-top: 1.5rem; padding: 1rem; background: #fff5f8; border-radius: 12px; font-size: 0.9rem; color: #ff5c8d;">
                        ${dailyLang.color_label} <strong>${dailyLang.colors[daySeed % 5]}</strong>
                    </div>
                </div>
                <button class="retry-btn" onclick="location.reload()" style="margin-top: 1rem; background-color: var(--accent-pink);">${dailyLang.retry}</button>
            `;
            resultDiv.style.display = 'block';
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- 6. Email Report Logic ---
    async function sendEmailReport(buttonId, emailInputId, statusId, reportData) {
        const sendBtn = document.getElementById(buttonId);
        const emailInput = document.getElementById(emailInputId);
        const statusText = document.getElementById(statusId);
        if (!sendBtn || !emailInput || !statusText) return;

        const emailLang = translations[currentLang].email;

        sendBtn.addEventListener('click', async () => {
            const email = emailInput.value.trim();
            if (!email || !email.includes('@')) return;

            sendBtn.disabled = true;
            sendBtn.textContent = '...';
            statusText.textContent = emailLang.sending;
            statusText.style.display = 'block';
            statusText.style.color = '#666';

            try {
                const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                const apiUrl = isLocal ? 'http://localhost:3000/api/send-report' : '/api/send-report';

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, lang: currentLang, ...reportData }),
                });

                if (response.ok) {
                    statusText.textContent = emailLang.success;
                    statusText.style.color = 'green';
                    emailInput.value = '';
                } else {
                    const res = await response.json();
                    statusText.textContent = emailLang.fail + (res.error || '');
                    statusText.style.color = 'red';
                }
            } catch (error) {
                statusText.textContent = emailLang.error;
                statusText.style.color = 'red';
            } finally {
                sendBtn.disabled = false;
                sendBtn.textContent = emailLang.button;
            }
        });
    }

    // Setup Observers for dynamically displayed email sections
    const tarotResultView = document.getElementById('tarot-result-view');
    if (tarotResultView) {
        new MutationObserver(() => {
            if (tarotResultView.style.display === 'block') {
                const title = document.getElementById('tarot-title')?.textContent;
                const cardName = document.getElementById('result-card-name')?.textContent;
                const interpretation = document.getElementById('result-interpretation')?.textContent;
                sendEmailReport('send-email-btn', 'user-email', 'email-status', {
                    reportTitle: title,
                    name: currentLang === 'ko' ? '고객' : 'Customer',
                    reportContent: `${currentLang === 'ko' ? '선택하신 카드' : 'Selected Card'}: ${cardName}\n\n${interpretation}`
                });
            }
        }).observe(tarotResultView, { attributes: true, attributeFilter: ['style'] });
    }

    const fortuneResult = document.getElementById('fortune-result');
    const sajuEmailSection = document.getElementById('saju-email-section');
    if (fortuneResult && sajuEmailSection) {
        new MutationObserver(() => {
            if (fortuneResult.innerHTML.trim() !== '') {
                sajuEmailSection.style.display = 'block';
                const name = document.getElementById('name').value;
                sendEmailReport('send-email-btn-saju', 'user-email-saju', 'email-status-saju', {
                    reportTitle: translations[currentLang].saju.title,
                    name: name || (currentLang === 'ko' ? '고객' : 'Customer'),
                    reportContent: fortuneResult.innerText
                });
            }
        }).observe(fortuneResult, { childList: true });
    }
});
