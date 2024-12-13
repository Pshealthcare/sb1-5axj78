import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../styles/invoiceStyles';

interface InvoiceHeaderProps {
  hospitalName: string;
  address: string;
  phone: string;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  hospitalName,
  address,
  phone
}) => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <Text style={styles.title}>{hospitalName}</Text>
      <Text style={styles.subtitle}>{address}</Text>
      <Text style={styles.subtitle}>Phone: {phone}</Text>
    </View>
  </View>
);