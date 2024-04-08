const eurgbpInput = document.getElementById("input-eurgbp");
const gbpeurInput = document.getElementById("input-gbpeur");

eurgbpInput.addEventListener('input', () => {
    const eur = eurgbpInput.value;

    const taux = gbpeurInput.getAttribute('data-taux');

    const eurNb = parseFloat(eur);
    const tauxNb = parseFloat(taux);

    const conv = eurNb * tauxNb;

    gbpeurInput.value = conv.toFixed(5);
})

gbpeurInput.addEventListener('input', () => {
    const gbp = gbpeurInput.value;

    const taux = gbpeurInput.getAttribute('data-taux');

    const gbpNb = parseFloat(gbp);
    const tauxNb = parseFloat(taux);

    const conv = gbpNb / tauxNb;

    eurgbpInput.value = conv.toFixed(5);
})