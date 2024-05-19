'use client';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const defaultLayoutPluginInstance = defaultLayoutPlugin();

const PdfViewer = ({ url }: { url: string }) => {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
      <div style={{ height: '750px' }}>
        <Viewer fileUrl="/pdf-open-parameters.pdf" plugins={[defaultLayoutPluginInstance]} />
      </div>
    </Worker>
  );
};

export default PdfViewer;
