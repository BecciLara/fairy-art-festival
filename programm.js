document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addFoodButton');
    const foodInput = document.getElementById('newFoodItem');
    const foodList = document.getElementById('food-items');

    addButton.addEventListener('click', function() {
        const newItemText = foodInput.value.trim();
        if (newItemText !== '') {
            const li = document.createElement('li');
            li.textContent = newItemText;
            foodList.appendChild(li);
            foodInput.value = '';
        }
    });
});
