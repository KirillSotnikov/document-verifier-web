import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?worker';
import * as mammoth from 'mammoth';
import * as XLSX from 'xlsx';

pdfjs.GlobalWorkerOptions.workerPort = new pdfjsWorker();


export const sha256 = async(source: string) => {
  const sourceBytes = new TextEncoder().encode(source);
  const digest = await crypto.subtle.digest("SHA-256", sourceBytes);
  const resultBytes = [...new Uint8Array(digest)];
  return resultBytes.map(x => x.toString(16).padStart(2, '0')).join("");
}

export async function fileToHashBrowser(file: File): Promise<{ hash: string; text: string }> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    let text = '';
    const fileType = file.name.split('.').pop()?.toLowerCase() || '';

    if (fileType === 'pdf') {
      text = await extractTextFromPdf(uint8Array);
    } else if (fileType === 'docx') {
      text = await extractTextFromDocx(uint8Array);
    } else if (fileType === 'xlsx' || fileType === 'csv') {
      text = await extractTextFromExcel(uint8Array);
    } else {
      text = await file.text();
    }

    const hashHex = await sha256(text);

    return { hash: hashHex, text };
  } catch (error) {
    console.error('Error processing file:', error);
    throw error;
  }
}

async function extractTextFromPdf(data: Uint8Array): Promise<string> {
  const pdf = await pdfjs.getDocument(data).promise;
  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    console.log('content', content);
    text += content.items.map(item => 'str' in item ? item.str : '').filter(Boolean).join(' ');
  }

  return text;
}

async function extractTextFromDocx(data: Uint8Array): Promise<string> {
  const result = await mammoth.extractRawText({ arrayBuffer: data.buffer });
  return result.value;
}

async function extractTextFromExcel(data: Uint8Array): Promise<string> {
  const workbook = XLSX.read(data, { type: 'array' });
  let text = '';

  workbook.SheetNames.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    text += XLSX.utils.sheet_to_csv(worksheet) + '\n';
  });

  return text;
}
