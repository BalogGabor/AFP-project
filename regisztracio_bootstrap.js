
document.addEventListener('DOMContentLoaded', function() {
    'use strict'; 

    const form = document.querySelector('.needs-validation') || document.querySelector('form');
    const szallitoRadio = document.getElementById('szallito');
    const megbizoRadio = document.getElementById('megbizo');
    const emailInput = document.getElementById('email_cim') || document.querySelector('input[type="email"]');
    const telefonInput = document.getElementById('telefonszam') || document.querySelector('input[type="tel"]');

    
    telefonInput?.addEventListener('input', function() {
        
        this.value = this.value.replace(/[^0-9+]/g, '');
    });

    form?.addEventListener('submit', function(event) {
        
        
        let hasCustomError = false;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput && !emailRegex.test(emailInput.value)) {
            alert('Validációs hiba: Kérjük, érvényes e-mail címet adjon meg!');
            hasCustomError = true;
        }

        if (telefonInput && telefonInput.value.length < 9) {
            alert('Validációs hiba: A telefonszám túl rövid!');
            hasCustomError = true;
        }

        if (!form.checkValidity() || hasCustomError) {
            
            event.preventDefault();  
            event.stopPropagation(); 
        }

        form.classList.add('was-validated');

    }, false);
});