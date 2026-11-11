

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const form = document.querySelector('.needs-validation') || document.querySelector('form');
    
   
    const rendszamMezo = document.getElementById('rendszam');         
    const sulyMezo = document.getElementById('teherbiras');           
    const tipusValaszto = document.getElementById('jarmutípus');       
    

    const szabadEttolMezo = document.getElementById('szabad_ettol');
    const szabadEddigMezo = document.getElementById('szabad_eddig');

    rendszamMezo?.addEventListener('input', function() {
        this.value = this.value.toUpperCase();
    });

    sulyMezo?.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

  
    form?.addEventListener('submit', function(event) {
        
        let hasCustomError = false;

        if (sulyMezo && sulyMezo.value) {
            const sulySzammal = parseInt(sulyMezo.value, 10);
            const kivalasztottTipus = tipusValaszto.value;

            if (kivalasztottTipus === 'furgon' && sulySzammal > 3500) {
                const megerosit = confirm('Figyelmeztetés: A furgon teherbírása általában maximum 3500 kg. Biztosan jól adta meg?');
                if (!megerosit) {
                    hasCustomError = true;
                }
            }
        }

        if (szabadEttolMezo && szabadEddigMezo && szabadEttolMezo.value && szabadEddigMezo.value) {
            
            const indulasDate = new Date(szabadEttolMezo.value);
            const erkezesDate = new Date(szabadEddigMezo.value);

            if (erkezesDate < indulasDate) {
                alert('Validációs hiba: A szabad kapacitás vége nem lehet korábbi dátum, mint a kezdete!');
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