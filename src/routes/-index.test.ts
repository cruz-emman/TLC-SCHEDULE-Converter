import { describe, it, expect } from 'vitest'
import { parseHtml } from './index'

describe('parseHtml parser logic', () => {
  it('should parse valid schedule rows under a section', () => {
    const html = `
      <table>
        <tr>
          <td colspan="3">Section: <u>1CPE01</u></td>
          <td colspan="6">Section: <u>Course: 3024A Year: 1</u></td>
        </tr>
        <tr>
          <td>ENGG-112</td>
          <td>Computer Engineering as a Discipline</td>
          <td>1</td>
          <td>M</td>
          <td>02:00PM-03:00PM</td>
          <td>SSC 404</td>
          <td>8</td>
          <td>VARONA, MARCELO E.</td>
        </tr>
      </table>
    `
    const results = parseHtml(html, true)
    expect(results).toHaveLength(1)
    expect(results[0]).toEqual({
      section: '1CPE01',
      code: 'ENGG-112',
      description: 'Computer Engineering as a Discipline',
      units: '1',
      day: 'M',
      time: '02:00PM-03:00PM',
      room: 'SSC 404',
      enrolled: '8',
      faculty: 'VARONA, MARCELO E.'
    })
  })

  it('should skip placeholder rows when excludePlaceholder is active', () => {
    const html = `
      <table>
        <tr>
          <td colspan="3">Section: <u>1CPE OPEN</u></td>
          <td colspan="6">Section: <u>Course: 3024A Year: 1</u></td>
        </tr>
        <tr>
          <td>ENGG-111</td>
          <td>Calculus 1</td>
          <td>3</td>
          <td>M</td>
          <td>01:00AM-01:00AM</td>
          <td>TBA</td>
          <td>0</td>
          <td>,  .</td>
        </tr>
      </table>
    `
    const results = parseHtml(html, true)
    expect(results).toHaveLength(0)
  })

  it('should include placeholder rows when excludePlaceholder is disabled', () => {
    const html = `
      <table>
        <tr>
          <td colspan="3">Section: <u>1CPE OPEN</u></td>
          <td colspan="6">Section: <u>Course: 3024A Year: 1</u></td>
        </tr>
        <tr>
          <td>ENGG-111</td>
          <td>Calculus 1</td>
          <td>3</td>
          <td>M</td>
          <td>01:00AM-01:00AM</td>
          <td>TBA</td>
          <td>0</td>
          <td>,  .</td>
        </tr>
      </table>
    `
    const results = parseHtml(html, false)
    expect(results).toHaveLength(1)
    expect(results[0].section).toBe('1CPE OPEN')
    expect(results[0].code).toBe('ENGG-111')
  })
})
