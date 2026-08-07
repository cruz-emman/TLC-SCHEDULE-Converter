const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const htmlContent = fs.readFileSync(path.join(__dirname, 'input.html'), 'utf8');
const dom = new JSDOM(`<table>${htmlContent}</table>`);
const doc = dom.window.document;
const trs = doc.querySelectorAll('tr');

console.log('Total TRs found:', trs.length);

let currentSection = '';
let subjectCount = 0;
let sectionsSeen = {};

trs.forEach((tr, i) => {
  const textContent = tr.textContent || '';
  if (/section:/i.test(textContent)) {
    const uElements = tr.querySelectorAll('u');
    let sectionText = '';
    uElements.forEach(u => {
      const text = u.textContent?.trim() || '';
      if (text && !/course:/i.test(text) && !sectionText) {
        sectionText = text;
      }
    });

    if (sectionText) {
      currentSection = sectionText;
    } else {
      const match = textContent.match(/section:\s*([^\n\t\r<]+)/i);
      if (match && !/course:/i.test(match[1])) {
        currentSection = match[1].trim();
      }
    }
    
    sectionsSeen[currentSection] = (sectionsSeen[currentSection] || 0) + 1;
    console.log(`[TR #${i}] Section row: "${currentSection}" (original text: "${textContent.replace(/\s+/g, ' ')}")`);
    return;
  }

  const tds = tr.querySelectorAll('td');
  if (tds.length >= 8) {
    const code = tds[0].textContent?.trim() || '';
    const enrolled = tds[6].textContent?.trim() || '';
    const time = tds[4].textContent?.trim() || '';

    // skip header
    if (code.toLowerCase() === 'subject code' || code.toLowerCase().includes('subject')) {
      return;
    }

    const isPlaceholder = 
      currentSection.toLowerCase().includes('open') || 
      enrolled === '0' || 
      time === '01:00AM-01:00AM';

    if (isPlaceholder) {
      return;
    }

    subjectCount++;
  }
});

console.log('Total subjects parsed (excluding placeholders):', subjectCount);
console.log('Sections map:', Object.keys(sectionsSeen));
