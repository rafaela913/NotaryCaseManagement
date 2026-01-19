import express from 'express';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const {
      clientName,
      birthDate,
      birthPlace,
      address,
      idInfo,
      cnp,
      representativeName,
      representativeBirthDate,
      representativeBirthPlace,
      representativeAddress,
      representativeInfo,
      representativeCnp,
      purpose,
      issueDate,
      docName,
      numberOfCopies,
      copiesHandedToParties
    } = req.body;

    const pdfPath = path.resolve('templates/Procura_generala.pdf');
    const existingPdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    // Completează câmpurile din formularul PDF cu datele primite
    form.getTextField('clientName').setText(clientName);
    form.getTextField('birthDate').setText(birthDate);
    form.getTextField('birthPlace').setText(birthPlace);
    form.getTextField('address').setText(address);
    form.getTextField('idInfo').setText(idInfo);
    form.getTextField('cnp').setText(cnp);
    form.getTextField('representativeName').setText(representativeName);
    form.getTextField('representativeBirthDate').setText(representativeBirthDate);
    form.getTextField('representativeBirthPlace').setText(representativeBirthPlace);
    form.getTextField('representativeAddress').setText(representativeAddress);
    form.getTextField('representativeInfo').setText(representativeInfo);  // corectat de la 'representativeInfo'
    form.getTextField('representativeCnp').setText(representativeCnp);
    form.getTextField('purpose').setText(purpose);
    form.getTextField('issueDate').setText(issueDate);
    form.getTextField('docName').setText(docName);
    form.getTextField('numberOfCopies').setText(numberOfCopies);
    form.getTextField('copiesHandedToParties').setText(copiesHandedToParties);

    form.flatten();

    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${docName || 'document_completat'}.pdf`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Eroare la generarea PDF-ului:', error);
    res.status(500).send('Eroare la generarea PDF-ului');
  }
});

router.post('/generate-rental-contract', async (req, res) => {
    try {
      const {
        husbandName,
        wifeName,
        addressMunicipality,
        addressStreet,
        addressNumber,
        addressCounty,
        companyName,
        companyMunicipality,
        companyStreet,
        companyNumber,
        companyCounty,
        tribunal,
        registrationNumber,
        representativeName,
        representativeMunicipality,
        representativeStreet,
        representativeNumber,
        representativeCounty,
        squareMeters,
        plot,
        parcel,
        propertyMunicipality,
        propertyStreet,
        propertyNumber,
        propertyCounty,
        rentalStartDate,
        rentalEndDate,
        constructionAuthorizationNumber,
        constructionAuthorizationCityHall,
        propertyTitleNumber,
        propertyTitleCommission,
        monthlyRent,
        totalRent,
        rentDueDay,
        notaryName
      } = req.body;
  
      const pdfPath = path.resolve('templates/inchierere-spatiu-comercial-ncc.pdf');
      const existingPdfBytes = fs.readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();
  
      // Completează câmpurile din formularul PDF cu datele primite
      form.getTextField('husbandName').setText(husbandName);
      form.getTextField('wifeName').setText(wifeName);
      form.getTextField('addressMunicipality').setText(addressMunicipality);
      form.getTextField('addressStreet').setText(addressStreet);
      form.getTextField('addressNumber').setText(addressNumber);
      form.getTextField('addressCounty').setText(addressCounty);
      form.getTextField('companyName').setText(companyName);
      form.getTextField('companyMunicipality').setText(companyMunicipality);
      form.getTextField('companyStreet').setText(companyStreet);
      form.getTextField('companyNumber').setText(companyNumber);
      form.getTextField('companyCounty').setText(companyCounty);
      form.getTextField('tribunal').setText(tribunal);
      form.getTextField('registrationNumber').setText(registrationNumber);
      form.getTextField('representativeName').setText(representativeName);
      form.getTextField('representativeMunicipality').setText(representativeMunicipality);
      form.getTextField('representativeStreet').setText(representativeStreet);
      form.getTextField('representativeNumber').setText(representativeNumber);
      form.getTextField('representativeCounty').setText(representativeCounty);
      form.getTextField('squareMeters').setText(squareMeters);
      form.getTextField('plot').setText(plot);
      form.getTextField('parcel').setText(parcel);
      form.getTextField('propertyMunicipality').setText(propertyMunicipality);
      form.getTextField('propertyStreet').setText(propertyStreet);
      form.getTextField('propertyNumber').setText(propertyNumber);
      form.getTextField('propertyCounty').setText(propertyCounty);
      form.getTextField('rentalStartDate').setText(rentalStartDate);
      form.getTextField('rentalEndDate').setText(rentalEndDate);
      form.getTextField('constructionAuthorizationNumber').setText(constructionAuthorizationNumber);
      form.getTextField('constructionAuthorizationCityHall').setText(constructionAuthorizationCityHall);
      form.getTextField('propertyTitleNumber').setText(propertyTitleNumber);
      form.getTextField('propertyTitleCommission').setText(propertyTitleCommission);
      form.getTextField('monthlyRent').setText(monthlyRent);
      form.getTextField('totalRent').setText(totalRent);
      form.getTextField('rentDueDay').setText(rentDueDay);
      form.getTextField('notaryName').setText(notaryName);
  
      form.flatten();
  
      const pdfBytes = await pdfDoc.save();
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=Contract_de_Inchiriere_Spatiu_Comercial.pdf');
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error('Eroare la generarea PDF-ului:', error);
      res.status(500).send('Eroare la generarea PDF-ului');
    }
  });

  router.post('/generate-declaratie-notorietate', async (req, res) => {
    try {
      const {
        firstPersonName,
        firstPersonCitizen,
        firstPersonBirthDate,
        firstPersonBirthPlace,
        firstPersonFatherName,
        firstPersonMotherName,
        firstPersonAddress,
        firstPersonStreet,
        firstPersonNumber,
        firstPersonBlock,
        firstPersonStaircase,
        firstPersonFloor,
        firstPersonApartment,
        firstPersonSectorCounty,
        secondPersonName,
        secondPersonCitizen,
        secondPersonBirthDate,
        secondPersonBirthPlace,
        secondPersonFatherName,
        secondPersonMotherName,
        secondPersonAddress,
        secondPersonStreet,
        secondPersonNumber,
        secondPersonBlock,
        secondPersonStaircase,
        secondPersonFloor,
        secondPersonApartment,
        secondPersonSectorCounty,
        knownPersonName,
        knownPersonCitizen,
        knownPersonAddress,
        knownPersonStreet,
        knownPersonNumber,
        knownPersonBlock,
        knownPersonStaircase,
        knownPersonFloor,
        knownPersonApartment,
        knownPersonSectorCounty,
        knownPersonFatherName,
        knownPersonMotherName,
        knownPersonBirthDate,
        knownPersonBirthPlace,
        knownPersonOtherNames,
        purpose,
        notaryOfficeName
      } = req.body;
  
      const pdfPath = path.resolve('templates/declaratie-notorietate.pdf');
      const existingPdfBytes = fs.readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();
  
      // Completează câmpurile din formularul PDF cu datele primite
      form.getTextField('firstPersonName').setText(firstPersonName);
      form.getTextField('firstPersonCitizen').setText(firstPersonCitizen);
      form.getTextField('firstPersonBirthDate').setText(firstPersonBirthDate);
      form.getTextField('firstPersonBirthPlace').setText(firstPersonBirthPlace);
      form.getTextField('firstPersonFatherName').setText(firstPersonFatherName);
      form.getTextField('firstPersonMotherName').setText(firstPersonMotherName);
      form.getTextField('firstPersonAddress').setText(firstPersonAddress);
      form.getTextField('firstPersonStreet').setText(firstPersonStreet);
      form.getTextField('firstPersonNumber').setText(firstPersonNumber);
      form.getTextField('firstPersonBlock').setText(firstPersonBlock);
      form.getTextField('firstPersonStaircase').setText(firstPersonStaircase);
      form.getTextField('firstPersonFloor').setText(firstPersonFloor);
      form.getTextField('firstPersonApartment').setText(firstPersonApartment);
      form.getTextField('firstPersonSectorCounty').setText(firstPersonSectorCounty);
      
      form.getTextField('secondPersonName').setText(secondPersonName);
      form.getTextField('secondPersonCitizen').setText(secondPersonCitizen);
      form.getTextField('secondPersonBirthDate').setText(secondPersonBirthDate);
      form.getTextField('secondPersonBirthPlace').setText(secondPersonBirthPlace);
      form.getTextField('secondPersonFatherName').setText(secondPersonFatherName);
      form.getTextField('secondPersonMotherName').setText(secondPersonMotherName);
      form.getTextField('secondPersonAddress').setText(secondPersonAddress);
      form.getTextField('secondPersonStreet').setText(secondPersonStreet);
      form.getTextField('secondPersonNumber').setText(secondPersonNumber);
      form.getTextField('secondPersonBlock').setText(secondPersonBlock);
      form.getTextField('secondPersonStaircase').setText(secondPersonStaircase);
      form.getTextField('secondPersonFloor').setText(secondPersonFloor);
      form.getTextField('secondPersonApartment').setText(secondPersonApartment);
      form.getTextField('secondPersonSectorCounty').setText(secondPersonSectorCounty);
  
      form.getTextField('knownPersonName').setText(knownPersonName);
      form.getTextField('knownPersonCitizen').setText(knownPersonCitizen);
      form.getTextField('knownPersonAddress').setText(knownPersonAddress);
      form.getTextField('knownPersonStreet').setText(knownPersonStreet);
      form.getTextField('knownPersonNumber').setText(knownPersonNumber);
      form.getTextField('knownPersonBlock').setText(knownPersonBlock);
      form.getTextField('knownPersonStaircase').setText(knownPersonStaircase);
      form.getTextField('knownPersonFloor').setText(knownPersonFloor);
      form.getTextField('knownPersonApartment').setText(knownPersonApartment);
      form.getTextField('knownPersonSectorCounty').setText(knownPersonSectorCounty);
      form.getTextField('knownPersonFatherName').setText(knownPersonFatherName);
      form.getTextField('knownPersonMotherName').setText(knownPersonMotherName);
      form.getTextField('knownPersonBirthDate').setText(knownPersonBirthDate);
      form.getTextField('knownPersonBirthPlace').setText(knownPersonBirthPlace);
      form.getTextField('knownPersonOtherNames').setText(knownPersonOtherNames);
      form.getTextField('purpose').setText(purpose);
      form.getTextField('notaryOfficeName').setText(notaryOfficeName);
  
      form.flatten();
  
      const pdfBytes = await pdfDoc.save();
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=Declaratie_Notorietate.pdf');
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error('Eroare la generarea PDF-ului:', error);
      res.status(500).send('Eroare la generarea PDF-ului');
    }
  });

  router.post('/generate-minor-travel-consent', async (req, res) => {
    try {
      const {
        parentName, parentAddress, parentId, parentIdSeries, parentIdNumber, parentIdIssuer, parentIdIssueDate, parentCnp,
        minorName, minorBirthDate, minorId, minorIdSeries, minorIdNumber, minorCnp, minorPassportNumber, minorPassportIssuer,
        minorPassportIssueDate, minorPassportExpiryDate, accompanyingParentName, accompanyingParentAddress, accompanyingParentId,
        accompanyingParentIdSeries, accompanyingParentIdNumber, accompanyingParentIdIssuer, accompanyingParentIdIssueDate,
        accompanyingParentBirthDate, accompanyingParentCnp, notaryName
      } = req.body;
  
      const pdfPath = path.resolve('templates/procura-declaratie-iesire-minor-din-tara.pdf');
      const existingPdfBytes = fs.readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();
  
      // Completează câmpurile din formularul PDF cu datele primite
      form.getTextField('parentName').setText(parentName);
      form.getTextField('parentAddress').setText(parentAddress);
      form.getTextField('parentId').setText(parentId);
      form.getTextField('parentIdSeries').setText(parentIdSeries);
      form.getTextField('parentIdNumber').setText(parentIdNumber);
      form.getTextField('parentIdIssuer').setText(parentIdIssuer);
      form.getTextField('parentIdIssueDate').setText(parentIdIssueDate);
      form.getTextField('parentCnp').setText(parentCnp);
      form.getTextField('minorName').setText(minorName);
      form.getTextField('minorBirthDate').setText(minorBirthDate);
      form.getTextField('minorId').setText(minorId);
      form.getTextField('minorIdSeries').setText(minorIdSeries);
      form.getTextField('minorIdNumber').setText(minorIdNumber);
      form.getTextField('minorCnp').setText(minorCnp);
      form.getTextField('minorPassportNumber').setText(minorPassportNumber);
      form.getTextField('minorPassportIssuer').setText(minorPassportIssuer);
      form.getTextField('minorPassportIssueDate').setText(minorPassportIssueDate);
      form.getTextField('minorPassportExpiryDate').setText(minorPassportExpiryDate);
      form.getTextField('accompanyingParentName').setText(accompanyingParentName);
      form.getTextField('accompanyingParentAddress').setText(accompanyingParentAddress);
      form.getTextField('accompanyingParentId').setText(accompanyingParentId);
      form.getTextField('accompanyingParentIdSeries').setText(accompanyingParentIdSeries);
      form.getTextField('accompanyingParentIdNumber').setText(accompanyingParentIdNumber);
      form.getTextField('accompanyingParentIdIssuer').setText(accompanyingParentIdIssuer);
      form.getTextField('accompanyingParentIdIssueDate').setText(accompanyingParentIdIssueDate);
      form.getTextField('accompanyingParentBirthDate').setText(accompanyingParentBirthDate);
      form.getTextField('accompanyingParentCnp').setText(accompanyingParentCnp);
      form.getTextField('notaryName').setText(notaryName);
  
      form.flatten();
  
      const pdfBytes = await pdfDoc.save();
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=Procura_declaratie_iesire_minor_din_tara.pdf');
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error('Eroare la generarea PDF-ului:', error);
      res.status(500).send('Eroare la generarea PDF-ului');
    }
  });
  
  router.post('/generate-power-of-attorney', async (req, res) => {
    try {
      const { principalName, agentName, actionDescription, documentatia } = req.body;
  
      const pdfPath = path.resolve('templates/procura-imputernicire.pdf');
      const existingPdfBytes = fs.readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();
  
      // Fill the fields in the PDF form
      form.getTextField('principalName').setText(principalName);
      form.getTextField('agentName').setText(agentName);
      form.getTextField('actionDescription').setText(actionDescription);
      form.getTextField('documentatia').setText(documentatia);
     
  
      form.flatten();
  
      const pdfBytes = await pdfDoc.save();
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=Procura_Imputernicire_Completata.pdf');
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Error generating PDF');
    }
  });

export { router };
