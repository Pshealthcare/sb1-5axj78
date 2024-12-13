import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/invoiceStyles';

export const InvoiceFooter: React.FC = () => (
  <View style={styles.footer}>
    <Text>This is a computer-generated invoice. No signature required.</Text>
  </View>
);