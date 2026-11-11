
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

   
    const form = document.querySelector('.needs-validation') || document.querySelector('form');
    
    
    const sulyInput = document.getElementById('osszsuly') || document.querySelector('input[name*="weight"]');
    const terjedelemInput = document.getElementById('terjedelem') || document.querySelector('input[name*="space"]');
    const iranyarInput = document.getElementById('iranyar') || document.querySelector('input[name*="price"]');
    
  
    const felrakasDatumMezo = document.getElementById('felrakas_datum') || document.querySelector('input[type="date"]:first-of-type');
    const lerakasDatumMezo = document.getElementById('lerakas_datum') || document.querySelector('input[type="date"]:last-of-type');

   
    sulyInput?.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    terjedelemInput?.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    iranyarInput?.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });


    form?.addEventListener('submit', function(event) {
        
        let hasCustomError = false;

        if (felrakasDatumMezo && lerakasDatumMezo && felrakasDatumMezo.value && lerakasDatumMezo.value) {
            
            const felrakasDate = new Date(felrakasDatumMezo.value);
            const lerakasDate = new Date(lerakasDatumMezo.value);

            if (lerakasDate < felrakasDate) {
                alert('Validációs hiba: A lerakás dátuma nem lehet korábbi, mint a felrakás dátuma!');
                hasCustomError = true;
            }
        }

        if (!form.checkValidity() || hasCustomError) {
            
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add('was-validated');

    }, false);
});