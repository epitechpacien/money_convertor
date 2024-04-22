const DEVISES = {
};

const filterOption = document.querySelector(".filter_currency");

filterOption.addEventListener("input", choosed_currency);

const data = `
<gesmes:Envelope xmlns:gesmes="http://www.gesmes.org/xml/2002-08-01" xmlns="http://www.ecb.int/vocabulary/2002-08-01/eurofxref">
<gesmes:subject>Reference rates</gesmes:subject>
<gesmes:Sender>
<gesmes:name>European Central Bank</gesmes:name>
</gesmes:Sender>
<Cube>
    <Cube time='2024-04-15'>
        <Cube currency='USD' rate='1.0656'/>
        <Cube currency='JPY' rate='164.05'/>
        <Cube currency='BGN' rate='1.9558'/>
        <Cube currency='CZK' rate='25.324'/>
        <Cube currency='DKK' rate='7.4606'/>
        <Cube currency='GBP' rate='0.85405'/>
        <Cube currency='HUF' rate='394.25'/>
        <Cube currency='PLN' rate='4.2938'/>
        <Cube currency='RON' rate='4.9742'/>
        <Cube currency='SEK' rate='11.5583'/>
        <Cube currency='CHF' rate='0.9725'/>
        <Cube currency='ISK' rate='150.70'/>
        <Cube currency='NOK' rate='11.6260'/>
        <Cube currency='TRY' rate='34.5291'/>
        <Cube currency='AUD' rate='1.6441'/>
        <Cube currency='BRL' rate='5.4553'/>
        <Cube currency='CAD' rate='1.4645'/>
        <Cube currency='CNY' rate='7.7134'/>
        <Cube currency='HKD' rate='8.3419'/>
        <Cube currency='IDR' rate='17111.78'/>
        <Cube currency='ILS' rate='3.9578'/>
        <Cube currency='INR' rate='88.8950'/>
        <Cube currency='KRW' rate='1473.79'/>
        <Cube currency='MXN' rate='17.6561'/>
        <Cube currency='MYR' rate='5.0925'/>
        <Cube currency='NZD' rate='1.7943'/>
        <Cube currency='PHP' rate='60.558'/>
        <Cube currency='SGD' rate='1.4498'/>
        <Cube currency='THB' rate='39.124'/>
        <Cube currency='ZAR' rate='20.2067'/>
    </Cube>
</Cube>
</gesmes:Envelope>
`

const load_data = () => {
    const balise_cube = '<Cube>';
    const balise_cube_end = '</Cube>';
    const pos_cube_start = data.indexOf(balise_cube);
    const pos_cube_end = data.lastIndexOf(balise_cube_end);
    const len_end = balise_cube_end.length;
    const xml_data = data.substring(pos_cube_start, pos_cube_end + len_end);

    const parser = new DOMParser();
    const mimeTypeXML = 'text/xml';
    const documentXML = parser.parseFromString(xml_data, mimeTypeXML);

    const cube1 = documentXML.firstElementChild;
    const cube2 = cube1.firstElementChild;
    const cubeAttributs = cube2.attributes;
    const att_time = cubeAttributs.getNamedItem('time');

    const time = att_time.value;
    const time_element = document.getElementById('time');
    time_element.textContent = `Date des cours: ${time}`;

    const elements = cube2.children;
    for (const element of elements) {
        const attributs = element.attributes;
        const currency_text = attributs.getNamedItem('currency').value;
        const rate_text = attributs.getNamedItem('rate').value;

        const money = currency_text.toLowerCase();
        const taux = parseFloat(rate_text);

        DEVISES[money] = taux;
    }
}

load_data();

const eurInput = document.getElementById("input-eurgbp");
const currencyInput = document.getElementById("input-gbpeur");
currencyInput.value = DEVISES.gbp.toFixed(5);

eurInput.addEventListener('input', () => {
    const eur = eurInput.value;

    const eurNb = parseFloat(eur);

    const conv = eurNb * DEVISES.gbp;

    currencyInput.value = conv.toFixed(5);
})

currencyInput.addEventListener('input', () => {
    const gbp = currencyInput.value;

    const gbpNb = parseFloat(gbp);

    const conv = gbpNb / DEVISES.gbp;

    eurInput.value = conv.toFixed(5);
})

function choosed_currency(event) {
    switch(event.targer.value) {
        case "GBP":
            currencyInput.addEventListener('input', () => {
                const gbp = currencyInput.value;
                const gbpNb = parseFloat(gbp);
                const conv = gbpNb / DEVISES.gbp;
                eurInput.value = conv.toFixed(5);
            });
            break;
        case "USD":
            currencyInput.addEventListener('input', () => {
                const usd = currencyInput.value;
                const usdNb = parseFloat(usd);
                const conv_usd = usdNb / DEVISES.usd;
                eurInput.value = conv.toFixed(5);
            });
            break;
        case "JPY":
            currencyInput.addEventListener('input', () => {
                const jpy = currencyInput.value;
                const jpyNb = parseFloat(jpy);
                const conv_jpy = jpyNb / DEVISES.jpy;
                eurInput.value = conv.toFixed(5);
            });
            break;
    }
}