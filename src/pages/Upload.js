import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

export default function Upload({ setData }) {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);

  const extractTextFromPDF = async (pdfFile) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(pdfFile);
    reader.onload = async () => {
      const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((item) => item.str).join(" ") + " ";
      }

      detectColumns(extractedText);
    };
  };

  const detectColumns = (text) => {
    const lines = text.split("\n");
    const firstLine = lines.find(line => line.includes("State") || line.includes("City"));
    if (firstLine) {
      setColumns(firstLine.split(/\s{2,}/));
    }
    parseAQIData(text);
  };

  const parseAQIData = (text) => {
    const rows = text.split("\n").slice(1); 
    const parsedData = rows.map(row => {
      const values = row.split(/\s{2,}/);
      return Object.fromEntries(columns.map((col, index) => [col, values[index] || ""]));
    });
    setData(parsedData);
  };

  const handleFileChange = (file) => {
    setFile(file);
    extractTextFromPDF(file);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Upload Air Quality Data</h2>
      <FileUploader handleChange={handleFileChange} name="file" types={["PDF"]} />
      {file && <p className="mt-2">Uploaded: {file.name}</p>}
      {columns.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Detected Columns:</h3>
          <ul className="list-disc pl-4">
            {columns.map((col, index) => <li key={index}>{col}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}