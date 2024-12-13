import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../styles/invoiceStyles';
import { Patient, Invoice } from '../../../types';
import { formatDate, formatFullName } from '../../../utils/formatters';

interface PatientInfoProps {
  patient: Patient;
  invoice: Invoice;
}

export const PatientInfo: React.FC<PatientInfoProps> = ({ patient, invoice }) => (
  <View style={styles.infoSection}>
    <View style={styles.infoColumn}>
      <InfoRow label="Invoice No:" value={invoice.invoiceNumber} />
      <InfoRow label="Date:" value={formatDate(invoice.date)} />
      <InfoRow 
        label="Patient Name:" 
        value={formatFullName(patient.title, patient.firstName, patient.lastName)} 
      />
      <InfoRow label="Age/Gender:" value={`${patient.age} / ${patient.gender}`} />
      <InfoRow label="Contact:" value={patient.mobileNumber} />
    </View>
    <View style={styles.infoColumn}>
      <InfoRow label="PRN:" value={patient.prn} />
      <InfoRow label="Ref Doctor:" value={invoice.refDoctor} />
      <InfoRow label="Payment Mode:" value={invoice.paymentMode} />
      {invoice.upiTransactionId && (
        <InfoRow label="UPI ID:" value={invoice.upiTransactionId} />
      )}
      <InfoRow label="Address:" value={patient.address} />
    </View>
  </View>
);

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);