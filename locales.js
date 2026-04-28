const translations = {
    ko: {
        nav: {
            home: "홈",
            daily: "오늘의 운세",
            tarot: "타로",
            saju: "사주",
            match: "궁합",
            column: "연애 칼럼"
        },
        hero: {
            title: "2026 연애운 골든타임",
            subtitle: "당신의 인연은 어디에 있나요?"
        },
        premium: {
            title: "프리미엄 정밀 분석",
            reunion_title: "재회운 시기 리포트",
            reunion_desc: "상대방 심리 + 연락 확률 높은 날짜 특정",
            golden_title: "연애 골든타임 계산기",
            golden_desc: "사주 기반 연애운 상승 피크 타임 시각화",
            mbti_title: "연애 MBTI 궁합 정밀 진단",
            mbti_desc: "성격 유형 + 명리학 하이브리드 궁합"
        },
        keyword: {
            title: "연애 고민 키워드",
            mind_title: "속마음 분석",
            mind_desc: "나를 어떻게 생각할까?",
            reunion_title: "재회 가능성",
            reunion_desc: "다시 만날 수 있을까?",
            three_month_title: "3개월 연애운",
            three_month_desc: "곧 다가올 설레는 사건",
            spouse_title: "미래 배우자상",
            spouse_desc: "내가 결혼할 사람의 특징"
        },
        modal: {
            keyword: "키워드",
            title: "어떤 방식으로 풀이할까요?",
            tarot_btn: "타로 오라클",
            tarot_desc: "현재의 심리와 가까운 미래",
            saju_btn: "정통 사주",
            saju_desc: "타고난 운명과 시기 분석",
            close: "닫기"
        },
        footer: {
            privacy: "개인정보처리방침",
            terms: "이용약관",
            rights: "© 2026 Oracle of Love. All rights reserved."
        },
        tarot: {
            intro_title: "그 사람의 속마음",
            intro_desc: "눈을 감고 상대방을 떠올리며<br>가장 끌리는 카드 한 장을 선택하세요.",
            result_title: "연애운 해석",
            retry: "다시 고르기",
            cards: [
                { 
                    name: "The Lovers (연인)", 
                    text: "상대방도 당신에게 강력한 연애적 끌림을 느끼고 있습니다. 현재 두 분의 운명적인 흐름이 정점에 도달했네요. 서로에 대한 신뢰를 바탕으로 솔직한 대화를 나눈다면 조만간 관계가 급격히 가까워질 것입니다. 곧 행복한 연애의 시작을 알리는 소식이 들려올 것입니다." 
                },
                { 
                    name: "The Moon (달)", 
                    text: "상대방의 마음이 안개 속에 있는 것처럼 불투명합니다. 본인 스스로도 자신의 감정을 확신하지 못해 갈팡질팡하고 있는 시기이군요. 지금은 섣부르게 다가가기보다 상대방의 마음이 정리될 때까지 조금 더 기다려주는 인내심이 필요합니다. 시간이 지나면 진실이 자연스럽게 드러날 것입니다." 
                },
                { 
                    name: "The Sun (태양)", 
                    text: "축하드립니다! 당신은 상대방에게 아주 밝고 긍정적인 에너지를 주는 소중한 사람입니다. 상대방은 당신과 함께할 때 세상이 환해지는 기분을 느낍니다. 꾸밈없이 밝은 웃음이 최고의 무기가 될 것이며, 두 분의 관계는 앞으로도 매우 순탄하고 열정적으로 발전할 것입니다." 
                },
                { 
                    name: "The Tower (탑)", 
                    text: "두 분의 관계에 예상치 못한 큰 변화가 찾아오고 있습니다. 다소 충격적인 사건이 발생할 수 있으나, 이는 기존의 잘못된 기반을 무너뜨리고 더 단단하고 진실된 관계로 나아가기 위한 정화 과정입니다. 당황하지 말고 변화를 겸허히 받아들이며 새롭게 다시 시작하려는 의지가 중요합니다." 
                },
                { 
                    name: "The Star (별)", 
                    text: "상대방은 당신을 동경하며 당신과의 미래를 꿈꾸고 있습니다. 당신은 상대방에게 있어 꿈에 그리던 '이상형'에 가깝습니다. 지금 당장 불같은 연애가 시작되지는 않더라도, 서서히 서로에게 스며들며 낭만적인 인연으로 이어질 운세입니다. 긍정적인 기대로 마음을 열어두세요." 
                }
            ]
        },
        saju: {
            title: "정통 사주 오라클",
            subtitle: "나의 평생 인연과 결혼운이 들어오는 시기를 확인하세요",
            name_label: "이름",
            name_placeholder: "이름을 입력하세요",
            birth_label: "생년월일 및 태어난 시간",
            calendar_label: "양력/음력",
            solar: "양력",
            lunar: "음력",
            submit: "나의 사주 풀이 보기",
            result_header: "✨ {name}님의 프리미엄 연애 운명지",
            retry: "다시 확인하기",
            templates: {
                nature: "<strong>[타고난 연애 기운]</strong> {name}님의 사주에는 따스한 봄볕 같은 온화한 기운이 깃들어 있어, 주변 사람들에게 편안함과 신뢰감을 주는 매력을 타고나셨습니다.",
                flow: "<strong>[올해의 연애 흐름]</strong> 올해 하반기부터는 막혀있던 인연의 문이 활짝 열리는 '천희(天喜)'의 시기에 진입하게 됩니다.",
                spouse: "<strong>[운명적 배우자상]</strong> 당신과 합이 가장 잘 맞는 배우자는 금(金)의 기운을 가진 안정적이고 결단력 있는 사람입니다.",
                marriage: "<strong>[결혼운이 들어오는 시기]</strong> 가장 강력한 성혼의 기운은 앞으로 2년 뒤인 가을철에 집중되어 있습니다.",
                advice: "💡 {name}님을 위한 조언: 당신의 진심은 언제나 상대에게 닿습니다. 자신을 믿고 당당하게 사랑을 표현하세요."
            }
        },
        daily: {
            title: "오늘의 띠별 운세",
            subtitle: "나의 생년월일을 입력하고 오늘 하루의 기운을 확인하세요",
            year_placeholder: "태어난 년도",
            submit: "오늘의 운세 보기",
            result_title: "{year}년생 {zodiac}띠 운세",
            retry: "다른 년도 확인하기",
            color_label: "💡 오늘의 행운의 컬러:",
            zodiacs: ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"],
            fortunes: [
                "오늘은 뜻밖의 행운이 찾아올 수 있는 날입니다. 주변의 조언에 귀를 기울이세요.",
                "새로운 시작을 하기에 좋은 기운이 들어와 있습니다. 자신감을 가지고 도전해 보세요.",
                "금전운이 상승하는 시기입니다. 계획적인 소비를 한다면 더 큰 이득이 따를 것입니다.",
                "인간관계에서 기쁨을 찾을 수 있는 날입니다. 오랜 친구에게 연락해 보는 건 어떨까요?",
                "건강에 유의해야 하는 하루입니다. 충분한 휴식과 가벼운 운동이 에너지를 채워줄 것입니다.",
                "창의적인 아이디어가 샘솟는 날입니다. 기록하는 습관이 미래의 큰 자산이 될 거예요.",
                "차분하게 내실을 다지는 것이 중요한 날입니다. 서두르지 말고 천천히 나아가세요.",
                "사랑하는 사람과 깊은 교감을 나눌 수 있는 따뜻한 하루가 예상됩니다.",
                "노력한 만큼 결과가 나오는 정직한 운세입니다. 끝까지 포기하지 마세요.",
                "말조심이 필요한 하루입니다. 상대방의 입장에서 한 번 더 생각하고 말하세요."
            ],
            colors: ["핑크", "블루", "골드", "그린", "퍼플"]
        },
        email: {
            title: "결과 리포트 이메일로 받기",
            placeholder: "이메일 주소를 입력하세요",
            button: "발송",
            sending: "이메일을 보내는 중입니다...",
            success: "이메일이 성공적으로 발송되었습니다!",
            fail: "발송 실패: ",
            error: "서버 연결 오류가 발생했습니다.",
            report_subject: "[Oracle] {name}님의 {title} 결과입니다.",
            report_intro: "안녕하세요, {name}님!",
            report_body: "요청하신 <strong>{title}</strong> 결과입니다.",
            report_footer: "본 메일은 연애운 오라클에서 발송되었습니다."
        }
    },
    en: {
        nav: {
            home: "Home",
            daily: "Daily Fortune",
            tarot: "Tarot",
            saju: "Saju",
            match: "Compatibility",
            column: "Love Columns"
        },
        hero: {
            title: "2026 Love Fortune Golden Time",
            subtitle: "Where is your destiny waiting?"
        },
        premium: {
            title: "Premium Precision Analysis",
            reunion_title: "Reunion Timing Report",
            reunion_desc: "Partner's psychology + Specific high-contact dates",
            golden_title: "Love Golden Time Calculator",
            golden_desc: "Saju-based visualization of love fortune peaks",
            mbti_title: "MBTI Love Compatibility",
            mbti_desc: "Personality type + Astrology hybrid analysis"
        },
        keyword: {
            title: "Love Concern Keywords",
            mind_title: "Inner Thoughts",
            mind_desc: "What do they think of me?",
            reunion_title: "Reunion Chance",
            reunion_desc: "Can we meet again?",
            three_month_title: "3-Month Fortune",
            three_month_desc: "Upcoming exciting events",
            spouse_title: "Future Spouse",
            spouse_desc: "Characteristics of your life partner"
        },
        modal: {
            keyword: "Keyword",
            title: "Choose your reading method",
            tarot_btn: "Tarot Oracle",
            tarot_desc: "Current psychology & Near future",
            saju_btn: "Traditional Saju",
            saju_desc: "Destiny & Timing analysis",
            close: "Close"
        },
        footer: {
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            rights: "© 2026 Oracle of Love. All rights reserved."
        },
        tarot: {
            intro_title: "Their Inner Thoughts",
            intro_desc: "Close your eyes, think of them,<br>and pick the card you're most drawn to.",
            result_title: "Reading Interpretation",
            retry: "Pick Again",
            cards: [
                { 
                    name: "The Lovers", 
                    text: "Your partner also feels a strong romantic attraction to you. Your destiny is at its peak. Honest communication based on trust will bring you closer soon. Expect news of a happy relationship starting shortly." 
                },
                { 
                    name: "The Moon", 
                    text: "The partner's feelings are as unclear as if they were in a fog. They are currently confused about their own emotions. Now is a time for patience rather than rushing in. The truth will reveal itself naturally over time." 
                },
                { 
                    name: "The Sun", 
                    text: "Congratulations! You are a precious person who gives bright and positive energy to your partner. They feel the world brightening up when with you. Your bright smile will be your best weapon, and your relationship will develop smoothly and passionately." 
                },
                { 
                    name: "The Tower", 
                    text: "An unexpected big change is coming to your relationship. A somewhat shocking event may occur, but this is a purification process to break down old, wrong foundations and move towards a more sincere relationship. Stay calm and embrace the change." 
                },
                { 
                    name: "The Star", 
                    text: "Your partner admires you and dreams of a future with you. You are close to their 'ideal type.' Even if a fiery romance doesn't start immediately, you will gradually permeate each other's lives. Keep an open heart with positive expectations." 
                }
            ]
        },
        saju: {
            title: "Traditional Saju Oracle",
            subtitle: "Discover your life partner and marriage timing",
            name_label: "Name",
            name_placeholder: "Enter your name",
            birth_label: "Birth Date & Time",
            calendar_label: "Solar/Lunar",
            solar: "Solar",
            lunar: "Lunar",
            submit: "View My Reading",
            result_header: "✨ Premium Love Destiny for {name}",
            retry: "Check Again",
            templates: {
                nature: "<strong>[Innate Love Energy]</strong> {name}, your Saju carries a warm, spring-like energy, giving you a charm that brings comfort and trust to those around you.",
                flow: "<strong>[This Year's Flow]</strong> From the second half of this year, the doors to new connections will swing wide open, entering the 'Cheon-hui' (Heavenly Joy) period.",
                spouse: "<strong>[Ideal Spouse]</strong> Your best-matched partner is someone with a stable and decisive Metal (金) energy.",
                marriage: "<strong>[Marriage Timing]</strong> The strongest energy for marriage is concentrated in the autumn of two years from now.",
                advice: "💡 Advice for {name}: Your sincerity always reaches the other person. Believe in yourself and express your love confidently."
            }
        },
        daily: {
            title: "Daily Zodiac Fortune",
            subtitle: "Enter your birth year to check today's energy",
            year_placeholder: "Birth Year",
            submit: "View Fortune",
            result_title: "Fortune for {zodiac} (Born in {year})",
            retry: "Check Another Year",
            color_label: "💡 Today's Lucky Color:",
            zodiacs: ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"],
            fortunes: [
                "Today is a day when unexpected luck might find you. Listen to the advice of those around you.",
                "Good energy is flowing in for a new start. Take on challenges with confidence.",
                "Financial luck is on the rise. Planned spending will lead to greater gains.",
                "A day to find joy in human relationships. Why not contact an old friend?",
                "Pay attention to your health today. Sufficient rest and light exercise will recharge you.",
                "Creative ideas are bubbling up. The habit of recording them will be a great asset for the future.",
                "It's important to build internal strength calmly. Don't rush; move forward slowly.",
                "A warm day is expected where you can share deep connections with loved ones.",
                "This is an honest fortune where results follow effort. Don't give up until the end.",
                "Careful speech is needed today. Think once more from the other person's perspective."
            ],
            colors: ["Pink", "Blue", "Gold", "Green", "Purple"]
        },
        email: {
            title: "Get Result Report via Email",
            placeholder: "Enter your email address",
            button: "Send",
            sending: "Sending email...",
            success: "Email sent successfully!",
            fail: "Send failed: ",
            error: "Server connection error occurred.",
            report_subject: "[Oracle] {title} result for {name}",
            report_intro: "Hello, {name}!",
            report_body: "Here is your <strong>{title}</strong> result.",
            report_footer: "This email was sent from Oracle of Love."
        }
    }
};
