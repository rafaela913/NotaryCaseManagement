import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 14
  }
});

const MyDocument = ({ documentType, ...data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {documentType === "procura-generala" && (
          <Text>
            Operator de date cu caracter personal notificat sub numarul 5286.
            S-a cerut autentificarea prezentului înscris: PROCURA GENERALA.
            Subsemnatul/a {data.clientName}, nascut/a la data de {data.birthDate}, in {data.birthPlace},
            cu domiciliul in {data.address}, identificat prin {data.idInfo}, avand codul numeric personal {data.cnp},
            imputernicesc pe {data.representativeName}, nascut/a la data de {data.representativeBirthDate}, in {data.representativeBirthPlace},
            domiciliat/a in {data.representativeAddress}, identificat/a prin {data.representativeIdInfo}, avand codul numeric personal {data.representativeCnp},
            sa ma reprezinte în fata institutiilor publice, instantelor judecatoresti, precum si fata de particulari, pentru a-mi sustine drepturile si interesele in legatura cu {data.purpose}.
            Pentru aducerea la indeplinire a prezentului mandat, mandatarul meu va semna pentru mine oriunde va fi necesar, semnatura sa fiindu-mi opozabila.
            Redactata astazi {data.issueDate}.
            Sunt de acord cu prelucrarea datelor prezentate in conformitate cu Legea 677/2001.
          </Text>
        )}
        {documentType === "certificat-casatorie" && (
          <Text>
            Certificam ca {data.husbandName} si {data.wifeName} s-au casatorit la data de {data.marriageDate}, in {data.marriagePlace}.
          </Text>
        )}
      </View>
    </Page>
  </Document>
);

export default MyDocument;
