// Loading Screen Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create loading screen elements if they don't exist
    if (!document.querySelector('.loading-screen')) {
        createLoadingScreen();
    }
    
    // Simulate loading progress
    simulateLoading();
});

// Create loading screen elements
function createLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    
    const loadingImage = document.createElement('img');
    loadingImage.className = 'loading-image';
    loadingImage.src = 'loading-screen.png';
    loadingImage.alt = 'Fairy Art Festival';
    
    const loadingProgress = document.createElement('div');
    loadingProgress.className = 'loading-progress';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    loadingProgress.appendChild(progressBar);
    
    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'Betreten des verzauberten Waldes...';
    
    loadingScreen.appendChild(loadingImage);
    loadingScreen.appendChild(loadingProgress);
    loadingScreen.appendChild(loadingText);
    
    document.body.prepend(loadingScreen);
}

// Simulate loading progress
function simulateLoading() {
    const progressBar = document.querySelector('.progress-bar');
    const loadingText = document.querySelector('.loading-text');
    const loadingScreen = document.querySelector('.loading-screen');
    
    let width = 0;
    const texts = [
        'Betreten des verzauberten Waldes...',
        'Sammeln von Feenstaub...',
        'Pilze wachsen lassen...',
        'Feen zum Tanzen bringen...',
        'Fast fertig...'
    ];
    
    const interval = setInterval(function() {
        if (width >= 100) {
            clearInterval(interval);
            
            // Hide loading screen after a short delay
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                
                // Remove loading screen from DOM after transition
                setTimeout(function() {
                    loadingScreen.remove();
                }, 1000);
            }, 500);
            
        } else {
            width += Math.random() * 10;
            if (width > 100) width = 100;
            
            progressBar.style.width = width + '%';
            
            // Update loading text based on progress
            const textIndex = Math.floor(width / 25);
            if (textIndex < texts.length) {
                loadingText.textContent = texts[textIndex];
            }
        }
    }, 200);
}
