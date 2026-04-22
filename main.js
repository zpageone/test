
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('fortune-form');
    const nameInput = document.getElementById('name');
    const birthdateInput = document.getElementById('birthdate');
    const resultDiv = document.getElementById('fortune-result');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value;
        const birthdate = new Date(birthdateInput.value);

        if (!name || !birthdateInput.value) {
            displayFortune("Please fill out all fields.");
            return;
        }

        const fortune = generateFortune(name, birthdate);
        displayFortune(fortune);
    });

    function generateFortune(name, birthdate) {
        const fortunes = [
            `{name}, a grand adventure awaits you just around the corner.`,
            `The stars suggest that a long-lost friend will soon re-enter your life, {name}.`,
            `For {name}, financial prosperity is on the horizon. Keep your eyes open for new opportunities.`,
            `Your creativity will be your greatest asset in the coming weeks, {name}.`,
            `A journey of self-discovery is about to begin for you, {name}. Embrace it.`,
            `The seeds of a new relationship have been planted for {name}. Nurture them well.`,
            `{name}, expect an unexpected windfall. It might not be monetary, but it will be valuable.`
        ];

        const day = birthdate.getDate();
        const fortuneIndex = (name.length + day) % fortunes.length;

        return fortunes[fortuneIndex].replace('{name}', name);
    }

    function displayFortune(fortune) {
        resultDiv.style.opacity = 0;
        setTimeout(() => {
            resultDiv.textContent = fortune;
            resultDiv.style.opacity = 1;
        }, 300);
    }
});
