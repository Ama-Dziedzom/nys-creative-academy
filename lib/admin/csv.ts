/** Builds a CSV file. Cells that start like a formula are prefixed so spreadsheets show them as text. */
export function toCsv(header: string[], rows: (string | number | Date)[][]) {
  const cell = (value: string | number | Date) => {
    let text = value instanceof Date ? value.toISOString() : String(value);
    if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  // The byte-order mark makes Excel read the file as UTF-8.
  return '﻿' + [header, ...rows].map((row) => row.map(cell).join(',')).join('\r\n');
}

export function csvResponse(csv: string, name: string) {
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${name}-${date}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
