// Hauptskript für die Einladungsseite
document.addEventListener('DOMContentLoaded', function() {
    // Animierte Elemente hinzufügen
    addFairyDust();
    
    // Parallax-Effekt für den Hintergrund
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        document.body.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
});

// Funktion zum Hinzufügen von animierten Feenstaub-Partikeln
function addFairyDust() {
    const container = document.querySelector('.container');
    const fairyDustCount = 20;
    
    for (let i = 0; i < fairyDustCount; i++) {
        const dust = document.createElement('div');
        dust.classList.add('fairy-dust');
        
        // Zufällige Position und Animation
        dust.style.left = Math.random() * 100 + 'vw';
        dust.style.top = Math.random() * 100 + 'vh';
        dust.style.animationDelay = Math.random() * 5 + 's';
        dust.style.animationDuration = 5 + Math.random() * 10 + 's';
        
        container.appendChild(dust);
    }
}

// Funktion zum Hinzufügen von CSS-Animationen für Feenstaub
function addFairyDustStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .fairy-dust {
            position: fixed;
            width: 6px;
            height: 6px;
            background-color: rgba(255, 215, 0, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            box-shadow: 0 0 10px 2px rgba(255, 215, 0, 0.3);
            animation: float-dust linear infinite;
        }
        
        @keyframes float-dust {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Feenstaub-Stile hinzufügen, wenn das Dokument geladen ist
document.addEventListener('DOMContentLoaded', addFairyDustStyles);
