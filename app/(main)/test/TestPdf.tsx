'use client';
import { useEffect } from 'react';
import pdfjs from 'pdfjs-dist';

const TestPdf = () => {
  useEffect(() => {
    const pdfUrl = 'http://example.com/sample.pdf'; // 替换为您的PDF文件URL

    const loadPdf = async () => {
      const loadingTask = pdfjs.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;

      // 获取第一页
      const pageNumber = 1;
      const page = await pdf.getPage(pageNumber);

      // 设置缩放比例
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      // 创建一个新的canvas元素来显示PDF内容
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      document.body.appendChild(canvas);

      // 渲染PDF内容到canvas
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext).promise;
    };

    loadPdf();
  }, []);

  return null; // 在Next.js页面中，返回null表示不渲染任何内容到DOM
};

export default TestPdf;
