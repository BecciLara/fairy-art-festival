// Formular-Funktionalität
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvp-form');
    const formSuccess = document.getElementById('form-success');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Formularvalidierung
            if (validateForm()) {
                // Simuliere Formularübermittlung
                submitForm();
            }
        });
    }
    
    // Formularvalidierung
    function validateForm() {
        let isValid = true;
        
        // Entferne vorherige Fehlermeldungen
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.classList.remove('error');
            
            if (!input.value.trim()) {
                isValid = false;
                showError(input, 'Dieses Feld ist erforderlich');
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
                showError(input, 'Bitte gib eine gültige E-Mail-Adresse ein');
            }
        });
        
        // Überprüfe, ob die Teilnahmebedingungen akzeptiert wurden
        const termsCheckbox = form.querySelector('input[name="terms"]');
        if (!termsCheckbox.checked) {
            isValid = false;
            showError(termsCheckbox, 'Bitte bestätige deine Teilnahme');
        }
        
        return isValid;
    }
    
    // Zeige Fehlermeldung unter dem Eingabefeld
    function showError(input, message) {
        input.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        const parent = input.closest('.form-group');
        parent.appendChild(errorElement);
    }
    
    // Überprüfe, ob die E-Mail-Adresse gültig ist
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Formularübermittlung mit E-Mail-Benachrichtigung
   /* function submitForm() {
        // Sammle Formulardaten
        const formData = new FormData(form);
        const formDataObj = {};
        
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // E-Mail-Adresse des Veranstalters
        const ownerEmail = "rekeksa@aol.com";
        
        // In einer echten Anwendung würden die Daten an einen Server gesendet
        // und eine E-Mail an den Veranstalter geschickt
        console.log('Formulardaten:', formDataObj);
        console.log('E-Mail würde gesendet an:', ownerEmail);
        
        // Simuliere Ladezeit
        const submitButton = form.querySelector('.submit-button');
        submitButton.textContent = 'Wird gesendet...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            // Verstecke das Formular und zeige die Erfolgsmeldung
            form.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            
            // Füge Feenstaub-Animation zur Erfolgsmeldung hinzu
            addSuccessFairyDust();
            
            // Scrolle nach oben, um die Erfolgsmeldung zu sehen
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    }*/

        function submitForm() {
            const formData = new FormData(form);
        
            const submitButton = form.querySelector('.submit-button');
            submitButton.textContent = 'Wird gesendet...';
            submitButton.disabled = true;
        
            fetch(form.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    form.reset();
                    form.classList.add('hidden');
                    formSuccess.classList.remove('hidden');
                    addSuccessFairyDust();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message || "Fehler beim Senden.");
                    });
                }
            })
            .catch(error => {
                alert("Es gab ein Problem beim Senden: " + error.message);
            })
            .finally(() => {
                submitButton.textContent = 'Anmeldung absenden';
                submitButton.disabled = false;
            });
        }
        
    
    // Füge Feenstaub-Animation zur Erfolgsmeldung hinzu
    function addSuccessFairyDust() {
        const successContainer = document.querySelector('.form-success');
        
        for (let i = 0; i < 20; i++) {
            const dust = document.createElement('div');
            dust.classList.add('success-dust');
            
            // Zufällige Position und Animation
            dust.style.left = Math.random() * 100 + '%';
            dust.style.top = Math.random() * 100 + '%';
            dust.style.animationDelay = Math.random() * 2 + 's';
            dust.style.animationDuration = 3 + Math.random() * 5 + 's';
            
            successContainer.appendChild(dust);
        }
        
        // Füge CSS für Feenstaub hinzu
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .success-dust {
                position: absolute;
                width: 6px;
                height: 6px;
                background-color: rgba(255, 215, 0, 0.7);
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                box-shadow: 0 0 10px 2px rgba(255, 215, 0, 0.4);
                animation: float-success-dust linear infinite;
            }
            
            @keyframes float-success-dust {
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
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
});
