import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../styles/invoiceStyles';

interface InvoiceDividerProps {
  text: string;
}

export const InvoiceDivider: React.FC<InvoiceDividerProps> = ({ text }) => (
  <View style={styles.divider}>
    <Text style={styles.dividerText}>{text}</Text>
  </View>
);