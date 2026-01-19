import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './MyDocument';
import './FormPage.css';

const FormPage = () => {
  const { type } = useParams();
  const { register, handleSubmit } = useForm();
  const [formData, setFormData] = React.useState(null);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFormData({ ...data, documentType: type });
  };

  return (
    <div className="form-page-container">
      <button onClick={() => navigate('/generate')}>Înapoi</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {type === 'procura-generala' && (
          <>
            <div>
              <label htmlFor="clientName">Nume client:</label>
              <input id="clientName" {...register('clientName')} required />
            </div>
            <div>
              <label htmlFor="birthDate">Data nașterii:</label>
              <input id="birthDate" type="date" {...register('birthDate')} required />
            </div>
            <div>
              <label htmlFor="birthPlace">Locul nașterii:</label>
              <input id="birthPlace" {...register('birthPlace')} required />
            </div>
            <div>
              <label htmlFor="address">Domiciliu:</label>
              <input id="address" {...register('address')} required />
            </div>
            <div>
              <label htmlFor="idInfo">Informații act identitate:</label>
              <input id="idInfo" {...register('idInfo')} required />
            </div>
            <div>
              <label htmlFor="cnp">CNP:</label>
              <input id="cnp" {...register('cnp')} required />
            </div>
            <div>
              <label htmlFor="representativeName">Nume readereprezentant:</label>
              <input id="representativeName" {...register('representativeName')} required />
            </div>
            <div>
              <label htmlFor="representativeBirthDate">Data nașterii reprezentant:</label>
              <input id="representativeBirthDate" type="date" {...register('representativeBirthDate')} required />
            </div>
            <div>
              <label htmlFor="representativeBirthPlace">Locul nașterii reprezentant:</label>
              <input id="representativeBirthPlace" {...register('representativeBirthPlace')} required />
            </div>
            <div>
              <label htmlFor="representativeAddress">Domiciliu reprezentant:</label>
              <input id="representativeAddress" {...register('representativeAddress')} required />
            </div>
            <div>
              <label htmlFor="representativeIdInfo">Informații act identitate reprezentant:</label>
              <input id="representativeIdInfo" {...register('representativeIdInfo')} required />
            </div>
            <div>
              <label htmlFor="representativeCnp">CNP reprezentant:</label>
              <input id="representativeCnp" {...register('representativeCnp')} required />
            </div>
            <div>
              <label htmlFor="purpose">Scop:</label>
              <textarea id="purpose" {...register('purpose')} required />
            </div>
            <div>
              <label htmlFor="issueDate">Data elementmiterii:</label>
              <input id="issueDate" type="date" {...register('issueDate')} required />
            </div>
            <div>
              <label htmlFor="docName">Nume document:</label>
              <input id="docName" {...register('docName')} required />
            </div>
          </>
        )}
        {type === 'certificat-casatorie' && (
          <>
            <div>
              <label htmlFor="husbandName">Nume soț:</label>
              <input id="husbandName" {...register('husbandName')} required />
            </div>
            <div>
              <label htmlFor="wifeName">Nume soție:</label>
              <input id="wifeName" {...register('wifeName')} required />
            </div>
            <div>
              <label htmlFor="marriageDate">Data căsătoriei:</label>
              <input id="marriageDate" type="date" {...register('marriageDate')} required />
            </div>
            <div>
              <label htmlFor="marriagePlace">Locul căsătoriei:</label>
              <input id="marriagePlace" {...register('marriagePlace')} required />
            </div>
            <div>
              <label htmlFor="docName">Nume document:</label>
              <input id="docName" {...register('docName')} required />
            </div>
          </>
        )}
        <button type="submit">Generare PDF</button>
      </form>
      {formData && (
        <PDFDownloadLink
          document={<MyDocument {...formData} />}
          fileName={formData.docName || "document.pdf"}
        >
          {({ loading }) => (loading ? 'Generare PDF...' : 'Descarcă PDF')}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default FormPage;
