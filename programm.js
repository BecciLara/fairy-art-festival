document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addFoodButton');
    const foodInput = document.getElementById('newFoodItem');
    const foodList = document.getElementById('food-items');
    const headings = document.querySelectorAll('section.timetable h3');

    // Neues Essen hinzufügen
    addButton.addEventListener('click', function() {
        const newItemText = foodInput.value.trim();
        if (newItemText !== '') {
            const li = document.createElement('li');
            li.textContent = newItemText;
            li.style.opacity = 0;
            foodList.appendChild(li);
            setTimeout(() => {
                li.style.transition = 'opacity 0.5s';
                li.style.opacity = 1;
            }, 10);
            foodInput.value = '';
        }
    });

    // Akkordeon-Funktion für den Zeitplan
    headings.forEach(heading => {
        heading.addEventListener('click', function() {
            const nextUl = heading.nextElementSibling;
            nextUl.classList.toggle('collapsed');
        });
    });
});
