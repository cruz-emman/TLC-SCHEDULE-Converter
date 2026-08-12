import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useEffect } from 'react'
import {
  Clipboard,
  ClipboardCheck,
  RefreshCw,
  Trash2,
  Download,
  Info,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Search,
  Table
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: LwsisHtmlConverter,
})

interface ParsedRow {
  section: string
  code: string
  description: string
  units: string
  day: string
  time: string
  room: string
  enrolled: string
  faculty: string
}

// Sample HTML provided by the user
const SAMPLE_HTML = `<tbody><tr style="font-family:arial;font-size:12px;">
  <td colspan="9"><hr></td>
</tr>

<tr style="font-family:arial;font-size:12px;">
  <td align="left">Subject Code</td>
  <td align="left">Subject Description</td>
  <td align="center">Units</td>
  <td align="left">Day</td>
  <td align="left" width="250">Time</td>
  <td align="left">Room</td>
  <td align="left">Enrolled</td>
  <td align="left">Faculty</td>

</tr>

<tr style="font-family:arial;font-size:12px;">
  <td colspan="9"><hr></td>
</tr>
<tr style="font-family:arial;font-size:12px;">

<td colspan="3" '="">Section: <u>1CPE OPEN</u></td>
<td colspan="6" '="">Section: <u>
Course: 3024A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Year: 1</u></td>
</tr>
<tr style="font-family:arial;font-size:12px;">
  <td colspan="9"><br></td>
</tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">ENGG-111</td>
    <td align="left">Calculus 1</td>
    <td align="center">3</td>
    <td align="left">M</td>
    <td align="left" width="250">01:00AM-01:00AM</td>
    <td align="left">TBA</td>
    <td align="left">0</td>
    <td align="left">,  .</td>

  </tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">CHEM-101</td>
    <td align="left">Chemistry for Engineers</td>
    <td align="center">4</td>
    <td align="left">M</td>
    <td align="left" width="250">01:00AM-01:00AM</td>
    <td align="left">TBA</td>
    <td align="left">0</td>
    <td align="left">,  .</td>

  </tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">ENGG-112</td>
    <td align="left">Computer Engineering as a Discipline</td>
    <td align="center">1</td>
    <td align="left">M</td>
    <td align="left" width="250">01:00AM-01:00AM</td>
    <td align="left">TBA</td>
    <td align="left">0</td>
    <td align="left">,  .</td>

  </tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">ENGG-113</td>
    <td align="left">Programming Logic and Design</td>
    <td align="center">2</td>
    <td align="left">M</td>
    <td align="left" width="250">01:00AM-01:00AM</td>
    <td align="left">TBA</td>
    <td align="left">0</td>
    <td align="left">,  .</td>

  </tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">GEC113</td>
    <td align="left">Mathematics in the Modern World</td>
    <td align="center">3</td>
    <td align="left">M</td>
    <td align="left" width="250">01:00AM-01:00AM</td>
    <td align="left">TBA</td>
    <td align="left">0</td>
    <td align="left">,  .</td>

  </tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">NSTP111</td>
    <td align="left">National Service Training Program 1</td>
    <td align="center">3</td>
    <td align="left">M</td>
    <td align="left" width="250">01:00AM-01:00AM</td>
    <td align="left">TBA</td>
    <td align="left">0</td>
    <td align="left">,  .</td>

  </tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">PATHFIT1</td>
    <td align="left">Physical Activities Toward Health and Fitness 1</td>
    <td align="center">2</td>
    <td align="left">M</td>
    <td align="left" width="250">01:00AM-01:00AM</td>
    <td align="left">TBA</td>
    <td align="left">0</td>
    <td align="left">,  .</td>

  </tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">TCE111</td>
    <td align="left">The First and Greatest Commandment and the Trinitian</td>
    <td align="center">3</td>
    <td align="left">M</td>
    <td align="left" width="250">01:00AM-01:00AM</td>
    <td align="left">TBA</td>
    <td align="left">0</td>
    <td align="left">,  .</td>

  </tr>


<tr style="font-family:arial;font-size:12px;">
  <td colspan="9"><hr></td>
</tr>

<tr style="font-family:arial;font-size:12px;">
  <td align="left">Subject Code</td>
  <td align="left">Subject Description</td>
  <td align="center">Units</td>
  <td align="left">Day</td>
  <td align="left" width="250">Time</td>
  <td align="left">Room</td>
  <td align="left">Enrolled</td>
  <td align="left">Faculty</td>

</tr>

<tr style="font-family:arial;font-size:12px;">
  <td colspan="9"><hr></td>
</tr>
<tr style="font-family:arial;font-size:12px;">

<td colspan="3" '="">Section: <u>1CPE01</u></td>
<td colspan="6" '="">Section: <u>
Course: 3024A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Year: 1</u></td>
</tr>
<tr style="font-family:arial;font-size:12px;">
  <td colspan="9"><br></td>
</tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">ENGG-112</td>
    <td align="left">Computer Engineering as a Discipline</td>
    <td align="center">1</td>
    <td align="left">M</td>
    <td align="left" width="250">02:00PM-03:00PM</td>
    <td align="left">SSC 404</td>
    <td align="left">8</td>
    <td align="left">SMITH, JOHN A.</td>

  </tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">GEC113</td>
    <td align="left">Mathematics in the Modern World</td>
    <td align="center">3</td>
    <td align="left">M</td>
    <td align="left" width="250">10:30AM-01:30PM</td>
    <td align="left">SSC 411</td>
    <td align="left">7</td>
    <td align="left">,  .</td>

  </tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">ENGG-113</td>
    <td align="left">Programming Logic and Design</td>
    <td align="center">2</td>
    <td align="left">M/TH</td>
    <td align="left" width="250">07:30AM-10:30AM/07:30AM-10:30AM</td>
    <td align="left">SSC 411</td>
    <td align="left">7</td>
    <td align="left">DOE, JANE B.</td>

  </tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">PATHFIT1</td>
    <td align="left">Physical Activities Toward Health and Fitness 1</td>
    <td align="center">2</td>
    <td align="left">T</td>
    <td align="left" width="250">01:00PM-03:00PM</td>
    <td align="left">GYM</td>
    <td align="left">7</td>
    <td align="left">WILLIAMS, ROBERT C.</td>

  </tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">TCE111</td>
    <td align="left">The First and Greatest Commandment and the Trinitian</td>
    <td align="center">3</td>
    <td align="left">T</td>
    <td align="left" width="250">09:00AM-12:00PM</td>
    <td align="left">SSC 411</td>
    <td align="left">11</td>
    <td align="left">BROWN, LINDA D.</td>

  </tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">ENGG-111</td>
    <td align="left">Calculus 1</td>
    <td align="center">3</td>
    <td align="left">TH</td>
    <td align="left" width="250">12:30PM-03:30PM</td>
    <td align="left">SSC 411</td>
    <td align="left">7</td>
    <td align="left">MILLER, PATRICIA E.</td>

  </tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">NSTP111</td>
    <td align="left">National Service Training Program 1</td>
    <td align="center">3</td>
    <td align="left">W</td>
    <td align="left" width="250">07:30AM-10:30AM</td>
    <td align="left">SSC 409</td>
    <td align="left">7</td>
    <td align="left">DAVIS, ELIZABETH F.</td>

  </tr>


  
  <tr style="font-family:arial;font-size:10px;">
    <td align="left">CHEM-101</td>
    <td align="left">Chemistry for Engineers</td>
    <td align="center">4</td>
    <td align="left">W/S</td>
    <td align="left" width="250">12:00PM-03:00PM/12:00PM-03:00PM</td>
    <td align="left">305LAB. B</td>
    <td align="left">7</td>
    <td align="left">,  .</td>

  </tr>
</tbody>`


function LwsisHtmlConverter() {
  const [inputText, setInputText] = useState('')
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([])
  const [excludePlaceholder, setExcludePlaceholder] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Trigger parsing whenever HTML or filter settings change
  useEffect(() => {
    const results = parseHtml(inputText, excludePlaceholder)
    setParsedRows(results)
  }, [inputText, excludePlaceholder])

  // Generate tab-separated text output

  // Generate tab-separated text output
  const generateTabText = () => {
    return parsedRows
      .map(row => 
        `${row.section}\t${row.code}\t${row.description}\t${row.units}\t${row.day}\t${row.time}\t${row.room}\t${row.enrolled}\t${row.faculty}`
      )
      .join('\n')
  }

  const tabTextOutput = generateTabText()

  const handleCopy = () => {
    if (!tabTextOutput) return
    navigator.clipboard.writeText(tabTextOutput)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!tabTextOutput) return
    const blob = new Blob([tabTextOutput], { type: 'text/tab-separated-values' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'lwsis-parsed-schedule.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Filter parsed rows for list view searching
  const filteredRows = parsedRows.filter(row => 
    row.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.faculty.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="text-center mb-8 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300 text-xs font-semibold mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>HTML Table Parser</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
          LWSIS Schedule Converter
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
          Paste the raw HTML source of your LWSIS schedule tables. It instantly extracts, cleans, and formats it as tab-separated rows ready for spreadsheets.
        </p>
      </div>

      {/* Main Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left: Input Textarea */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-md flex flex-col flex-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold tracking-wide uppercase text-zinc-400 flex items-center gap-2">
                <FileText className="h-4 w-4 text-violet-400" />
                <span>Paste raw HTML here</span>
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setInputText(SAMPLE_HTML)}
                  className="text-xs px-2.5 py-1.5 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition"
                >
                  Load Sample HTML
                </button>
                <button
                  onClick={() => setInputText('')}
                  className="text-xs px-2.5 py-1.5 rounded border border-zinc-800 text-zinc-400 hover:text-zinc-300 transition"
                >
                  Clear
                </button>
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Right-click page -> Inspect -> Copy the <tbody> or <table> element from LWSIS and paste it here..."
              className="w-full flex-1 min-h-[300px] bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 font-mono focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none resize-none"
            />

            {/* Explicit Action Button */}
            <button
              onClick={() => setParsedRows(parseHtml(inputText, excludePlaceholder))}
              className="mt-3 w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-violet-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Convert HTML to TSV</span>
            </button>

            <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-400 hover:text-zinc-200 select-none">
                <input
                  type="checkbox"
                  checked={excludePlaceholder}
                  onChange={(e) => setExcludePlaceholder(e.target.checked)}
                  className="rounded border-zinc-800 bg-zinc-950 text-violet-500 focus:ring-violet-500/20 h-4 w-4"
                />
                <span>Exclude Open Sections</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Output Textarea */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-md flex flex-col flex-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold tracking-wide uppercase text-zinc-400 flex items-center gap-2">
                <Table className="h-4 w-4 text-violet-400" />
                <span>Tab-Separated Output</span>
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!tabTextOutput}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
                >
                  {isCopied ? (
                    <>
                      <ClipboardCheck className="h-3.5 w-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-3.5 w-3.5" />
                      <span>Copy Output</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!tabTextOutput}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded border border-zinc-800 text-zinc-300 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <textarea
              readOnly
              value={tabTextOutput}
              placeholder="The parsed tab-separated TSV output will display here..."
              className="w-full flex-1 min-h-[300px] bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300 font-mono outline-none resize-none select-all"
            />
          </div>
        </div>
      </div>

      {/* Preview Table Section */}
      {parsedRows.length > 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-3 border-b border-zinc-800">
            <div>
              <h2 className="text-sm font-bold tracking-wide uppercase text-zinc-400">
                Visual Schedule Preview
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Showing {filteredRows.length} of {parsedRows.length} subjects found
              </p>
            </div>
            
            {/* Search filter input */}
            <div className="relative max-w-xs w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                <Search className="h-3.5 w-3.5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search code, section, desc..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 outline-none focus:border-violet-500 transition"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950/40 max-h-[400px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase bg-zinc-900/40 sticky top-0 z-10">
                  <th className="p-3">Section</th>
                  <th className="p-3">Code</th>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">Units</th>
                  <th className="p-3">Day</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Room</th>
                  <th className="p-3 text-center">Enrolled</th>
                  <th className="p-3">Faculty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {filteredRows.map((row, index) => (
                  <tr key={index} className="hover:bg-zinc-900/30">
                    <td className="p-3 font-semibold text-violet-400">{row.section}</td>
                    <td className="p-3 font-mono font-semibold text-zinc-200">{row.code}</td>
                    <td className="p-3 text-zinc-300 max-w-[200px] truncate" title={row.description}>
                      {row.description}
                    </td>
                    <td className="p-3 text-center font-mono text-zinc-300">{row.units}</td>
                    <td className="p-3 font-semibold text-zinc-400">{row.day}</td>
                    <td className="p-3 font-mono text-zinc-400">{row.time}</td>
                    <td className="p-3 text-zinc-300">{row.room}</td>
                    <td className="p-3 text-center font-mono text-zinc-300">{row.enrolled}</td>
                    <td className="p-3 text-zinc-400 truncate max-w-[150px]" title={row.faculty}>
                      {row.faculty === ',' ? '-' : row.faculty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// Pure DOM Parser for HTML
export const parseHtml = (htmlContent: string, excludePlaceholder: boolean): ParsedRow[] => {
  try {
    const cleanContent = htmlContent.trim()
    if (!cleanContent) {
      return []
    }

    // Wrap in table tags if missing to prevent DOMParser from stripping table elements
    const wrappedHtml = /<table/i.test(cleanContent)
      ? cleanContent
      : `<table>${cleanContent}</table>`

    const parser = new DOMParser()
    const doc = parser.parseFromString(wrappedHtml, 'text/html')
    const trElements = doc.querySelectorAll('tr')

    const results: ParsedRow[] = []
    let currentSection = ''

    trElements.forEach((tr) => {
      const textContent = tr.textContent || ''

      // 1. Detect and parse section headers
      if (/section:/i.test(textContent)) {
        const uElements = tr.querySelectorAll('u')
        let sectionText = ''

        // Find the u element that contains the actual section name (not Course: 3025I...)
        uElements.forEach(u => {
          const text = u.textContent?.trim() || ''
          if (text && !/course:/i.test(text) && !sectionText) {
            sectionText = text
          }
        })

        if (sectionText) {
          currentSection = sectionText
        } else {
          // Fallback to match text content if <u> tags are absent
          const match = textContent.match(/section:\s*([^\n\t\r<]+)/i)
          if (match && !/course:/i.test(match[1])) {
            currentSection = match[1].trim()
          }
        }
        
        // Always skip the section header row itself from output
        return
      }

      // 2. Detect subject rows (usually has 8 or more columns/td elements)
      const tds = tr.querySelectorAll('td')
      if (tds.length >= 8) {
        const code = tds[0].textContent?.trim() || ''
        const description = tds[1].textContent?.trim() || ''
        const units = tds[2].textContent?.trim() || ''
        const day = tds[3].textContent?.trim() || ''
        const time = tds[4].textContent?.trim() || ''
        const room = tds[5].textContent?.trim() || ''
        const enrolled = tds[6].textContent?.trim() || ''
        const faculty = tds[7].textContent?.trim() || ''

        // Skip header labels
        if (
          code.toLowerCase() === 'subject code' || 
          code.toLowerCase().includes('subject') || 
          description.toLowerCase() === 'subject description'
        ) {
          return
        }

        // 3. Filter open/placeholder sections if toggle is active
        if (excludePlaceholder) {
          const isPlaceholder = 
            /(open|opne|oepn|opn)/i.test(currentSection) || 
            time === '01:00AM-01:00AM'

          if (isPlaceholder) {
            return
          }
        }

        if (code) {
          // Clean up space formatting
          const cleanFaculty = faculty.replace(/\s+/g, ' ').trim()
          const cleanDescription = description.replace(/\s+/g, ' ').trim()

          results.push({
            section: currentSection || 'Unknown Section',
            code,
            description: cleanDescription,
            units,
            day,
            time,
            room,
            enrolled,
            faculty: cleanFaculty
          })
        }
      }
    })

    return results
  } catch (error) {
    console.error('HTML parsing error:', error)
    return []
  }
}

