const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Pure parser logic
function parseHtml(htmlContent, excludePlaceholder) {
  const cleanContent = htmlContent.trim();
  if (!cleanContent) return [];

  const wrappedHtml = /<table/i.test(cleanContent) ? cleanContent : `<table>${cleanContent}</table>`;
  const dom = new JSDOM(wrappedHtml);
  const doc = dom.window.document;
  const trElements = doc.querySelectorAll('tr');

  const results = [];
  let currentSection = '';

  trElements.forEach((tr) => {
    const textContent = tr.textContent || '';

    // 1. Detect and parse section headers
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
      return;
    }

    // 2. Detect subject rows
    const tds = tr.querySelectorAll('td');
    if (tds.length >= 8) {
      const code = tds[0].textContent?.trim() || '';
      const description = tds[1].textContent?.trim() || '';
      const units = tds[2].textContent?.trim() || '';
      const day = tds[3].textContent?.trim() || '';
      const time = tds[4].textContent?.trim() || '';
      const room = tds[5].textContent?.trim() || '';
      const enrolled = tds[6].textContent?.trim() || '';
      const faculty = tds[7].textContent?.trim() || '';

      // Skip header labels
      if (
        code.toLowerCase() === 'subject code' || 
        code.toLowerCase().includes('subject') || 
        description.toLowerCase() === 'subject description'
      ) {
        return;
      }

      // 3. Filter open/placeholder sections if toggle is active
      if (excludePlaceholder) {
        const isPlaceholder = 
          currentSection.toLowerCase().includes('open') || 
          enrolled === '0' || 
          time === '01:00AM-01:00AM';

        if (isPlaceholder) {
          return;
        }
      }

      if (code) {
        results.push({
          section: currentSection || 'Unknown Section',
          code,
          description: description.replace(/\s+/g, ' ').trim(),
          units,
          day,
          time,
          room,
          enrolled,
          faculty: faculty.replace(/\s+/g, ' ').trim()
        });
      }
    }
  });

  return results;
}

// Paths configuration
const htmlPath = path.join(__dirname, 'input.html');
const tsvPath = path.join(__dirname, 'expected.tsv');

if (!fs.existsSync(htmlPath) || !fs.existsSync(tsvPath)) {
  console.log('\n[ERROR]: Missing files! Please create:');
  console.log(`  1. "${htmlPath}" (paste your raw HTML here)`);
  console.log(`  2. "${tsvPath}" (paste your correct expected TSV rows here)`);
  console.log('\nThen run: node scratch/verify_parser.cjs\n');
  process.exit(1);
}

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const expectedTsv = fs.readFileSync(tsvPath, 'utf8');

const parsedRows = parseHtml(htmlContent, true);
const parsedTsvLines = parsedRows.map(row => 
  `${row.section}\t${row.code}\t${row.description}\t${row.units}\t${row.day}\t${row.time}\t${row.room}\t${row.enrolled}\t${row.faculty}`
);

const expectedLines = expectedTsv.trim().split('\n').map(l => l.trim()).filter(Boolean);

console.log('\n--- VERIFICATION REPORT ---');
console.log(`Parsed Rows from HTML: ${parsedTsvLines.length}`);
console.log(`Expected Rows from TSV : ${expectedLines.length}`);

let differences = 0;
const maxLength = Math.max(parsedTsvLines.length, expectedLines.length);

for (let i = 0; i < maxLength; i++) {
  const systemLine = parsedTsvLines[i] || '';
  const expectedLine = expectedLines[i] || '';

  if (systemLine !== expectedLine) {
    differences++;
    console.log(`\n[Row Mismatch at index ${i + 1}]:`);
    console.log(`  SYSTEM  : "${systemLine}"`);
    console.log(`  EXPECTED: "${expectedLine}"`);
  }
}

console.log('---------------------------');
if (differences === 0) {
  console.log(' SUCCESS: The system output matches your expected data EXACTLY!\n');
} else {
  console.log(` FAILED: Found ${differences} mismatches between system and expected TSV.\n`);
}
