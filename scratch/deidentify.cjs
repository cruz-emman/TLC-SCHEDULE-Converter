const fs = require('fs');
const path = require('path');

const namesMap = {
  "FRANCISCO, MARK D.": "ALVAREZ, CARLOS A.",
  "DE VERA , NATHANIEL B.": "GONZALES, NATHAN B.",
  "TRINIDAD, RONA MAYE G.": "MERCADO, ROSE M.",
  "BAUTISTA, TERESITA C.": "SANTOS, TERESA C.",
  "BUENVENIDA, SANTOS N.": "REYES, SAMUEL N.",
  "MAGALONG, LUCILA T.": "CRUZ, LUCIA T.",
  "MENA, MIGUELA M.": "VALDEZ, MICHAEL M.",
  "JARMIN, ROSADEL C.": "AQUINO, ROSA C.",
  "SABILLANO, LILIBETH R.": "RAMOS, LILY R.",
  "DELA CRUZ, TRISTAN JOURDAN C.": "DEL ROSARIO, TIMOTHY J.",
  "LANA, IAN R.": "MENDOZA, IAN R.",
  "DEMALEN, JULIET A.": "CASTRO, JULIA A.",
  "BALAKI, NALIZA S.": "BROWN, NANCY S.",
  "Angoluan, Mary Ana Seline L.": "Garcia, Mary Ann S.",
  "NAVA, DENNIS S.": "PASCUAL, DENNIS S.",
  "BOLO, HENRY B.": "HERNANDEZ, HENRY B.",
  "ESTIOKO, EDRECK D.": "SANTIAGO, ERIC D.",
  "SARAO, GRACIA D.": "FLORES, GRACE D.",
  "COLLANTES, LEONORA N.": "TORRES, LEONA N.",
  "VIZCARRA, GUILLERMINA C.": "VILLANUEVA, GUIA C.",
  "ULANDAY, GIANNE EDUARD L.": "TOLENTINO, GIAN L.",
  "SILVERIO, CHRISTOPHER M.": "SALVADOR, CHRIS M.",
  "FREMISTA, REY B.": "OCAMPO, REY B.",
  "JAVIER, RAMONCITO P.": "GOMEZ, RAMON P.",
  "TRINIDAD, FERNANDO V.": "SOLIS, FERNAN V.",
  "ADEM, MARK DAEVID M.": "DAVID, MARK M.",
  "MOSCOSA, SARAH T.": "SERRANO, SARAH T.",
  "SANTIAGO, IMELDA C.": "SABADO, IMELDA C.",
  "BATHAN, RODELIO L.": "BARRIOS, RODEL L.",
  "DOMINGUEZ, PIERANGELO A.": "DOMINGO, PIERO A.",
  "BAUTISTA, TERESITA  C.": "SANTOS, TERESA C.",
  "DE CASTRO, MARIA FE B.": "CASTILLO, MARIA B.",
  "DUCTA, ANTHONY H.": "DIAZ, ANTHONY H.",
  "SAN DIEGO, IMMANUEL T.": "DELA TORRE, IMMANUEL T."
};

const htmlPath = path.join(__dirname, 'input.html');
const tsvPath = path.join(__dirname, 'expected.tsv');

function processFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;

  for (const [realName, fakeName] of Object.entries(namesMap)) {
    const escapedName = realName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedName, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, fakeName);
      count++;
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`De-identified ${filePath}: replaced ${count} names.`);
}

console.log('Starting de-identification of scratch files...');
processFile(htmlPath);
processFile(tsvPath);
console.log('Done!');
