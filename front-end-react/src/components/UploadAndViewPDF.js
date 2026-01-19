import React, { useState } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import axios from 'axios';
import Tesseract from 'tesseract.js';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import Modal from 'react-modal';
import Sidebar from './Sidebar';
import './UploadAndViewPDF.css';

Modal.setAppElement('#root');

const UploadAndViewPDF = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ocrModalIsOpen, setOcrModalIsOpen] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [viewPdf, setViewPdf] = useState(null);

  GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

  const fileType = ['application/pdf', 'image/png', 'image/jpeg'];

  const handlePdfFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!fileType.includes(selectedFile.type)) {
      setPdfFile(null);
      setViewPdf(null);
      setEditedText('');
      setIsImage(false);
      setPdfFileError('Vă rugăm să selectați un fișier valid PDF, PNG, sau JPEG');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async (ev) => {
      setPdfFile(selectedFile);
      setViewPdf(ev.target.result);
      setPdfFileError('');
      setIsImage(selectedFile.type !== 'application/pdf');

      if (selectedFile.type === 'application/pdf') {
        const arrayBuffer = await selectedFile.arrayBuffer();
        await extractTextFromPdf(arrayBuffer);
      } else {
        try {
          const { data: { text } } = await Tesseract.recognize(selectedFile, 'eng');
          setEditedText(text);
        } catch (error) {
          console.error('Eroare la extragerea textului din imagine:', error);
        }
      }
    };
  };

  const extractTextFromPdf = async (pdfData) => {
    try {
      const pdf = await getDocument({ data: pdfData }).promise;
      const maxPages = pdf.numPages;
      let extractedText = '';

      for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const textItems = textContent.items;
        let pageText = '';

        textItems.forEach((item) => {
          pageText += item.str + ' ';
        });

        extractedText += pageText + '\n';
      }

      setEditedText(extractedText);
    } catch (error) {
      console.error('Eroare la extragerea textului din PDF:', error);
    }
  };

  const handlePdfFileSubmit = async (e) => {
    e.preventDefault();
    if (!pdfFile) return;

    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('title', title);
    formData.append('caseId', caseId);
    formData.append('extractedText', editedText);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Document adăugat cu succes');
      setModalIsOpen(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Eroare de server');
      console.error('Eroare la adăugarea documentului:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate(`/cases/${caseId}`);
  };

  return (
    <div className="upload-page">
      <Sidebar />

      <div className="upload-content">
        <div className="upload-header">
          <button className="header-button" onClick={() => navigate(`/cases/${caseId}`)}>
            Înapoi
          </button>

          <h1>Încărcare document</h1>

          <div /> 
        </div>

        <div className="upload-container">
          <form className="upload-form" onSubmit={handlePdfFileSubmit}>
            <label className="form-label">Fișier (PDF / PNG / JPEG)</label>
            <input
              type="file"
              className="form-control"
              required
              onChange={handlePdfFileChange}
            />
            {pdfFileError && <div className="error-msg">{pdfFileError}</div>}

            <label className="form-label">Titlu document</label>
            <input
              type="text"
              className="form-control"
              placeholder="Titlu Document"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div className="upload-actions">
              <button type="submit" className="primary-button">
                Încărcați
              </button>

              {editedText && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setOcrModalIsOpen(true)}
                >
                  Verifică text extras
                </button>
              )}
            </div>
          </form>

          <div className="section-divider" />

          <h2 className="section-title">Previzualizare</h2>

          <div className="preview-container">
            {viewPdf ? (
              isImage ? (
                <img className="preview-image" src={viewPdf} alt="Preview" />
              ) : (
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                  <Viewer fileUrl={viewPdf} plugins={[defaultLayoutPluginInstance]} />
                </Worker>
              )
            ) : (
              <p className="empty-text">Niciun fișier selectat</p>
            )}
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Succes Încărcare Document"
          className="custom-modal"
          overlayClassName="custom-overlay"
        >
          <h2 className="modal-title">{message}</h2>
          <button className="primary-button" onClick={closeModal}>OK</button>
        </Modal>

        <Modal
          isOpen={ocrModalIsOpen}
          onRequestClose={() => setOcrModalIsOpen(false)}
          contentLabel="Text Extras"
          className="ocr-modal"
          overlayClassName="custom-overlay"
        >
          <h2 className="modal-title">Text extras</h2>

          <textarea
            className="ocr-textarea"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={15}
          />

          <button className="primary-button" onClick={() => setOcrModalIsOpen(false)}>
            Salvează și continuă
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default UploadAndViewPDF;
