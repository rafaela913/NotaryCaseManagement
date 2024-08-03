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
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async (e) => {
          setPdfFile(selectedFile);
          setViewPdf(e.target.result);
          setPdfFileError('');
          setIsImage(selectedFile.type !== 'application/pdf');

          if (selectedFile.type === 'application/pdf') {
            const arrayBuffer = await selectedFile.arrayBuffer();
            await extractTextFromPdf(arrayBuffer);
          } else {
            try {
              const { data: { text } } = await Tesseract.recognize(selectedFile, 'eng');
              setEditedText(text);
              console.log('Text extras din imagine:', text);
            } catch (error) {
              console.error('Eroare la extragerea textului din imagine:', error);
            }
          }
        };
      } else {
        setPdfFile(null);
        setViewPdf(null);
        setPdfFileError('Vă rugăm să selectați un fișier valid PDF, PNG, sau JPEG');
      }
    } else {
      console.log('Selectați fișierul');
    }
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
      console.log('Text extras din PDF:', extractedText);
    } catch (error) {
      console.error('Eroare la extragerea textului din PDF:', error);
    }
  };

  const handlePdfFileSubmit = async (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
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
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate(`/cases/${caseId}`);
  };

  const openOcrModal = () => {
    setOcrModalIsOpen(true);
  };

  const closeOcrModal = () => {
    setOcrModalIsOpen(false);
  };

  const handleEditedTextChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <div className='container'>
      <button className="btn btn-back" onClick={() => navigate(`/cases/${caseId}`)}>Înapoi</button>
      <p> </p>
      <br></br>
      <form className='form-group' onSubmit={handlePdfFileSubmit}>
        <input
          type="file"
          className='form-control'
          required
          onChange={handlePdfFileChange}
        />
        {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
        <input
          type="text"
          className='form-control'
          placeholder="Titlu Document"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {editedText && (
          <>
            <br></br>
            <p> </p>
            <button type="button" className='btn btn-info btn-lg' onClick={openOcrModal}>
              Verifică text extras
            </button>
          </>
        )}
        <br></br>
        <p> </p>
        <button type="submit" className='btn btn-success btn-lg'>
          Încărcați
        </button>
      </form>
      <br></br>
      <h4>Vizualizare PDF</h4>
      <div className='pdf-container'>
        {viewPdf && (
          <>
            {isImage ? (
              <img src={viewPdf} alt="Preview" />
            ) : (
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <Viewer fileUrl={viewPdf} plugins={[defaultLayoutPluginInstance]} />
              </Worker>
            )}
          </>
        )}
        {!viewPdf && <>Niciun fișier selectat</>}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Succes Încărcare Document"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <h2 className="success-message">{message}</h2>
        <button className="btn btn-primary" onClick={closeModal}>OK</button>
      </Modal>
      <Modal
        isOpen={ocrModalIsOpen}
        onRequestClose={closeOcrModal}
        contentLabel="Text Extras"
        className="ocr-modal"
        overlayClassName="custom-overlay"
      >
        <h2 className="ocr-title">Text extras</h2>
        <div className="ocr-text-container">
          <textarea 
            value={editedText} 
            onChange={handleEditedTextChange}
            rows={15}
            style={{ width: '100%', padding: '20px', borderRadius: '10px', border: '1px solid #800020' }}
          />
        </div>
        <p> </p>
        <button className="btn btn-primary" onClick={closeOcrModal}>Salvează și continuă</button>
      </Modal>
    </div>
  );
};

export default UploadAndViewPDF;
