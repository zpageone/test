document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('method-modal');
    const keywordCards = document.querySelectorAll('.keyword-card');
    const displayKeyword = document.getElementById('display-keyword');
    const closeModal = document.querySelector('.close-modal');

    // 1. Open Modal on Keyword Click
    keywordCards.forEach(card => {
        card.addEventListener('click', () => {
            const keyword = card.getAttribute('data-keyword');
            displayKeyword.textContent = keyword;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // 2. Close Modal
    const hideModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    closeModal.addEventListener('click', hideModal);

    // Close on background click
    window.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

    // 3. Form Logic for Saju Page (if applicable)
    const yearSelect = document.getElementById('birth-year');
    if (yearSelect) {
        const currentYear = new Date().getFullYear();
        for (let y = currentYear; y >= 1950; y--) {
            const option = document.createElement('option');
            option.value = y;
            option.textContent = `${y}년`;
            yearSelect.appendChild(option);
        }
        // Additional selects (month, day, hour) should be populated here similarly
    }
});