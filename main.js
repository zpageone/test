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
            { 
                name: "The Lovers (연인)", 
                img: "https://www.sacred-texts.com/tarot/pkt/img/ar06.jpg", 
                text: "상대방도 당신에게 강력한 연애적 끌림을 느끼고 있습니다. 현재 두 분의 운명적인 흐름이 정점에 도달했네요. 서로에 대한 신뢰를 바탕으로 솔직한 대화를 나눈다면 조만간 관계가 급격히 가까워질 것입니다. 곧 행복한 연애의 시작을 알리는 소식이 들려올 것입니다." 
            },
            { 
                name: "The Moon (달)", 
                img: "https://www.sacred-texts.com/tarot/pkt/img/ar18.jpg", 
                text: "상대방의 마음이 안개 속에 있는 것처럼 불투명합니다. 본인 스스로도 자신의 감정을 확신하지 못해 갈팡질팡하고 있는 시기이군요. 지금은 섣부르게 다가가기보다 상대방의 마음이 정리될 때까지 조금 더 기다려주는 인내심이 필요합니다. 시간이 지나면 진실이 자연스럽게 드러날 것입니다." 
            },
            { 
                name: "The Sun (태양)", 
                img: "https://www.sacred-texts.com/tarot/pkt/img/ar19.jpg", 
                text: "축하드립니다! 당신은 상대방에게 아주 밝고 긍정적인 에너지를 주는 소중한 사람입니다. 상대방은 당신과 함께할 때 세상이 환해지는 기분을 느낍니다. 꾸밈없이 밝은 웃음이 최고의 무기가 될 것이며, 두 분의 관계는 앞으로도 매우 순탄하고 열정적으로 발전할 것입니다." 
            },
            { 
                name: "The Tower (탑)", 
                img: "https://www.sacred-texts.com/tarot/pkt/img/ar16.jpg", 
                text: "두 분의 관계에 예상치 못한 큰 변화가 찾아오고 있습니다. 다소 충격적인 사건이 발생할 수 있으나, 이는 기존의 잘못된 기반을 무너뜨리고 더 단단하고 진실된 관계로 나아가기 위한 정화 과정입니다. 당황하지 말고 변화를 겸허히 받아들이며 새롭게 다시 시작하려는 의지가 중요합니다." 
            },
            { 
                name: "The Star (별)", 
                img: "https://www.sacred-texts.com/tarot/pkt/img/ar17.jpg", 
                text: "상대방은 당신을 동경하며 당신과의 미래를 꿈꾸고 있습니다. 당신은 상대방에게 있어 꿈에 그리던 '이상형'에 가깝습니다. 지금 당장 불같은 연애가 시작되지는 않더라도, 서서히 서로에게 스며들며 낭만적인 인연으로 이어질 운세입니다. 긍정적인 기대로 마음을 열어두세요." 
            }
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
                
                // Set content
                if (resultImg) resultImg.src = result.img;
                if (resultName) resultName.textContent = result.name;
                if (resultText) resultText.textContent = result.text;
                
                // Show view immediately and scroll to top
                if (resultView) {
                    resultView.style.display = 'block';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                
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
            const subTitle = document.querySelector('.sub-page-title');
            if (subTitle) subTitle.style.display = 'none';

            resultDiv.innerHTML = `
                <div class="result-container" style="animation: fadeIn 0.8s ease;">
                    <div class="result-text-box" style="text-align: left; border-top: 4px solid var(--primary-purple);">
                        <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem; font-family: 'Noto Serif KR', serif;">✨ ${name}님의 프리미엄 연애 운명지</h3>
                        <p style="margin-bottom: 1.2rem; line-height: 1.8;">
                            <strong>[타고난 연애 기운]</strong> ${name}님의 사주에는 따스한 봄볕 같은 온화한 기운이 깃들어 있어, 주변 사람들에게 편안함과 신뢰감을 주는 매력을 타고나셨습니다. 본인은 인지하지 못할 수 있으나, 은근히 이성을 끌어당기는 '도화'의 기운이 내재되어 있어 한 번 인연을 맺으면 상대방이 쉽게 잊지 못하는 깊은 여운을 남기는 스타일입니다.
                        </p>
                        <p style="margin-bottom: 1.2rem; line-height: 1.8;">
                            <strong>[올해의 연애 흐름]</strong> 올해 하반기부터는 막혀있던 인연의 문이 활짝 열리는 '천희(天喜)'의 시기에 진입하게 됩니다. 특히 오는 10월부터 12월 사이에는 예상치 못한 장소에서 강한 설렘을 느낄 수 있는 귀인이 나타날 운세이며, 그분은 당신의 가치관을 깊이 이해해 주는 성숙한 성품을 지닌 사람일 확률이 매우 높습니다.
                        </p>
                        <p style="margin-bottom: 1.2rem; line-height: 1.8;">
                            <strong>[운명적 배우자상]</strong> 당신과 합이 가장 잘 맞는 배우자는 금(金)의 기운을 가진 안정적이고 결단력 있는 사람입니다. 다소 보수적일 수 있으나 책임감이 강해 평생 당신을 든든하게 지켜줄 버팀목이 되어줄 것이며, 두 분이 함께한다면 자산의 축적은 물론 정서적인 풍요로움까지 모두 누릴 수 있는 '상생'의 관계가 될 것입니다.
                        </p>
                        <p style="margin-bottom: 1.2rem; line-height: 1.8;">
                            <strong>[결혼운이 들어오는 시기]</strong> 가장 강력한 성혼의 기운은 앞으로 2년 뒤인 가을철에 집중되어 있습니다. 이 시기에는 주변의 축복 속에서 결실을 맺을 운세가 강하니, 조급해하기보다는 현재의 인연 하나하나에 정성을 다하며 스스로를 가꾸는 시간을 가진다면 반드시 최고의 결실을 얻게 될 것입니다.
                        </p>
                        <p style="line-height: 1.8; color: var(--primary-purple); font-weight: 600;">
                            💡 ${name}님을 위한 조언: 당신의 진심은 언제나 상대에게 닿습니다. 자신을 믿고 당당하게 사랑을 표현하세요.
                        </p>
                    </div>
                    <button class="retry-btn" onclick="location.reload()" style="margin-top: 1rem;">다시 확인하기</button>
                </div>
            `;
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }
});