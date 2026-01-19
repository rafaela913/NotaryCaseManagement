import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ClientList from './components/ClientList';
import AddClientForm from './components/AddClientForm';
import ClientDetails from './components/ClientDetails';
import AddCaseForm from './components/AddCaseForm';
import CaseListAll from './components/CaseListAll'; 
import MyCalendar from './components/Calendar';
import ViewCase from './components/ViewCase'; 
import EditCase from './components/EditCase'; 
import SelectPage from './components/SelectPage';
import FormPage from './components/FormPage';
import UploadAndViewPDF from './components/UploadAndViewPDF';
import StatisticsPage from './components/StatisticsPage';
import DocumentList from './components/DocumentList';
import GeneratePDF from './components/GeneratePDF';
import GenerateRentalContract from './components/GenerateRentalContract';
import GenerateNotorietyDeclaration from './components/GenerateNotorietyDeclaration';
import GenerateMinorTravelConsent from './components/GenerateMinorTravelConsent';
import GeneratePowerOfAttorney from './components/GeneratePowerOfAttorney';
import GenerateAnnualReport from './components/GenerateAnnualReport';
import ClientCaseChart from './components/ClientCaseChart';
import CaseStatsChart from './components/CaseStatsChart';
import CalculatorNotarialFees from './components/CalculatorNotrialFees';
import PropertyDivisionCalculator from './components/PropertyDivisionCalculator';
import AlimonyCalculator from './components/AlimonyCalculator';
import CalculatorPage from './components/CalculatorPage';
import Notifications from './components/Notifications';
import AllDocumentTransactions from './components/AllDocumentTransactions';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<AuthForm isSignup={false} />} />
          <Route path="/signup" element={<AuthForm isSignup={true} />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/clients" element={<ProtectedRoute><ClientList /></ProtectedRoute>} />
          <Route path="/clients/add" element={<ProtectedRoute><AddClientForm /></ProtectedRoute>} />
          <Route path="/clients/:clientId" element={<ProtectedRoute><ClientDetails /></ProtectedRoute>} />
          <Route path="/clients/:clientId/add-case" element={<ProtectedRoute><AddCaseForm /></ProtectedRoute>} />
          <Route path="/cases" element={<ProtectedRoute><CaseListAll /></ProtectedRoute>} /> 
          <Route path="/calendar" element={<ProtectedRoute><MyCalendar /></ProtectedRoute>} /> 
          <Route path="/cases/:caseId" element={<ProtectedRoute><ViewCase /></ProtectedRoute>} />
          <Route path="/cases/:caseId/edit" element={<ProtectedRoute><EditCase /></ProtectedRoute>} />
          <Route path="/generate" element={<ProtectedRoute><SelectPage /></ProtectedRoute>} />
          <Route path="/form/:type" element={<ProtectedRoute><FormPage /></ProtectedRoute>} />
          <Route path="/cases/:caseId/add-document" element={<ProtectedRoute><UploadAndViewPDF /></ProtectedRoute>} />
          <Route path="/statistics" element={<ProtectedRoute><StatisticsPage /></ProtectedRoute>} /> 
          <Route path="/documents" element={<ProtectedRoute><DocumentList /></ProtectedRoute>} />
          <Route path="/generate-annual-report" element={<GenerateAnnualReport />} />         
          <Route path="/generate-pdf" element={<ProtectedRoute><GeneratePDF /></ProtectedRoute>} />
          <Route path="/generate-rental-contract" element={<ProtectedRoute><GenerateRentalContract /></ProtectedRoute>} />
          <Route path="/generate-declaratie-notorietate" element={<ProtectedRoute><GenerateNotorietyDeclaration /></ProtectedRoute>} />
          <Route path="/generate-minor-travel-consent" element={<ProtectedRoute> <GenerateMinorTravelConsent /></ProtectedRoute>} />
          <Route path="/generate-power-of-attorney" element={<ProtectedRoute><GeneratePowerOfAttorney /> </ProtectedRoute>} />
          <Route path="/client-case-chart" element={<ClientCaseChart />} />
          <Route path="/case-stats-chart" element={<ProtectedRoute><CaseStatsChart /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><AllDocumentTransactions/></ProtectedRoute>}/>
          <Route path="/calculator-notarial-fees" element={<ProtectedRoute><CalculatorNotarialFees/></ProtectedRoute>}/>
          <Route path="/property-division-calculator" element={<ProtectedRoute><PropertyDivisionCalculator /></ProtectedRoute>} />
          <Route path="/alimony-calculator" element={<ProtectedRoute><AlimonyCalculator /></ProtectedRoute>} />
          <Route path="/calculator" element={<ProtectedRoute><CalculatorPage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} /> 
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
