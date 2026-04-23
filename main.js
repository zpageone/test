document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Common UI: Modal Logic ---
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

    // --- 2. Tarot Logic (tarot.html) ---
    const cardSpread = document.getElementById('card-spread');
    if (cardSpread) {
        const tarotResults = [
            { name: "The Lovers (연인)", img: "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg", text: "상대방도 당신에게 강한 끌림을 느끼고 있습니다. 서로의 가치관이 일치하는 시기이며, 곧 기분 좋은 소식이 들려올 가능성이 높습니다." },
            { name: "The Moon (달)", img: "https://upload.wikimedia.org/wikipedia/en/f/f0/RWS_Tarot_18_Moon.jpg", text: "상대방의 마음이 아직 갈팡질팡하고 있네요. 불안함이 앞서기보다는 시간을 두고 지켜보는 것이 좋습니다. 진실이 드러날 때까지 기다리세요." },
            { name: "The Sun (태양)", img: "https://upload.wikimedia.org/wikipedia/en/1/17/RWS_Tarot_19_Sun.jpg", text: "매우 긍정적인 신호입니다! 상대방은 당신과 함께할 때 큰 행복을 느낍니다. 꾸밈없는 솔직한 모습이 최고의 무기가 될 것입니다." },
            { name: "The Tower (탑)", img: "https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg", text: "관계에 큰 변화가 찾아올 수 있습니다. 예기치 못한 사건이 발생할 수 있으나, 이는 더 나은 관계를 위해 낡은 것을 깨뜨리는 과정입니다." },
            { name: "The Star (별)", img: "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_17_Star.jpg", text: "희망적인 미래가 보입니다. 상대방은 당신을 동경하거나 이상형으로 생각하고 있을 확률이 높습니다. 서서히 마음이 열리고 있습니다." }
        ];

        // Generate 10 cards in a fan spread
        for (let i = 0; i < 10; i++) {
            const card = document.createElement('div');
            card.className = 'tarot-card-item';
            
            // Calculate fan position
            const angle = (i - 4.5) * 8; // -36 to 36 degrees
            const xPos = (i - 4.5) * 30; // Horizontal offset
            card.style.transform = `translateX(${xPos}px) rotate(${angle}deg)`;
            
            card.addEventListener('click', () => pickCard(card, tarotResults));
            cardSpread.appendChild(card);
        }

        function pickCard(selectedElement, results) {
            // Disable other cards
            const allCards = document.querySelectorAll('.tarot-card-item');
            allCards.forEach(c => c.style.pointerEvents = 'none');

            // Animation: Selection effect
            selectedElement.style.zIndex = '1000';
            selectedElement.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            selectedElement.style.transform = 'translateY(-150px) rotateY(180deg) scale(1.6)';
            selectedElement.style.opacity = '0';

            setTimeout(() => {
                const cardSpread = document.getElementById('card-spread');
                const tarotIntro = document.querySelector('.tarot-intro');
                if (cardSpread) cardSpread.style.display = 'none';
                if (tarotIntro) tarotIntro.style.display = 'none';
                
                const result = results[Math.floor(Math.random() * results.length)];
                const resultView = document.getElementById('tarot-result-view');
                const resultImg = document.getElementById('result-card-img');
                const resultName = document.getElementById('result-card-name');
                const resultText = document.getElementById('result-interpretation');
                
                if (resultImg) {
                    resultImg.src = result.img;
                    resultImg.onload = () => {
                        resultView.style.display = 'block';
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    };
                }
                
                if (resultName) resultName.textContent = result.name;
                if (resultText) resultText.textContent = result.text;
                
            }, 600);
        }
    }

    // --- 3. Saju Logic (saju.html) ---
    const fortuneForm = document.getElementById('fortune-form');
    if (fortuneForm) {
        // Populate Selects
        const populateSelect = (id, start, end, suffix) => {
            const select = document.getElementById(id);
            if (!select) return;
            for (let i = start; i <= end; i++) {
                const opt = document.createElement('option');
                opt.value = i; opt.textContent = `${i}${suffix}`;
                select.appendChild(opt);
            }
        };

        const yearSelect = document.getElementById('birth-year');
        if (yearSelect) {
            const currentYear = new Date().getFullYear();
            for (let y = currentYear; y >= 1950; y--) {
                const opt = document.createElement('option');
                opt.value = y; opt.textContent = `${y}년`;
                yearSelect.appendChild(opt);
            }
        }
        populateSelect('birth-month', 1, 12, '월');
        populateSelect('birth-day', 1, 31, '일');
        
        const hourSelect = document.getElementById('birth-hour');
        if (hourSelect) {
            const hours = ["모름", "子(23:30~01:29)", "丑(01:30~03:29)", "寅(03:30~05:29)", "卯(05:30~07:29)", "辰(07:30~09:29)", "巳(09:30~11:29)", "午(11:30~13:29)", "未(13:30~15:29)", "申(15:30~17:29)", "酉(17:30~19:29)", "戌(19:30~21:29)", "亥(21:30~23:29)"];
            hours.forEach((h, i) => {
                const opt = document.createElement('option');
                opt.value = i; opt.textContent = h;
                hourSelect.appendChild(opt);
            });
        }

        fortuneForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const resultDiv = document.getElementById('fortune-result');
            
            fortuneForm.style.display = 'none';
            document.querySelector('.sub-page header p').style.display = 'none';

            resultDiv.innerHTML = `
                <div class="result-container">
                    <div class="result-text-box">
                        <h3 style="font-size: 1.4rem;">${name}님의 연애 운명 분석</h3>
                        <p style="text-align: left; margin-top: 1.5rem;">
                            <strong>[총평]</strong> 당신의 사주에는 '온화한 불(火)'의 기운이 깃들어 있습니다. 주변 사람들을 끌어당기는 묘한 매력이 있네요.<br><br>
                            <strong>[연애운]</strong> 올해 하반기, 특히 10월과 11월 사이에 강한 인연법이 들어와 있습니다. 가까운 지인보다는 새로운 모임이나 장소에서 만나는 사람과 깊은 관계로 발전할 가능성이 높습니다.<br><br>
                            <strong>[결혼운]</strong> 30대 중반에 천생연분의 기운이 가장 강하게 들어옵니다. 상대방은 안정적인 직업군에 속하며, 당신의 마음을 편안하게 해주는 포용력이 넓은 사람일 것입니다.
                        </p>
                    </div>
                    <button class="retry-btn" onclick="location.reload()">다시 확인하기</button>
                </div>
            `;
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }
});