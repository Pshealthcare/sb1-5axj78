import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/invoiceStyles';
import { formatCurrency } from '../../../utils/pdf/formatters';

interface InvoiceSummaryProps {
  grossAmount: number;
  discountAmount: number;
  paidAmount: number;
  balanceAmount: number;
  amountInWords: string;
  discountRemark?: string;
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({
  grossAmount,
  discountAmount,
  paidAmount,
  balanceAmount,
  amountInWords,
  discountRemark
}) => (
  <>
    <View style={styles.summary}>
      <SummaryRow label="Gross Amount:" value={formatCurrency(grossAmount)} />
      <SummaryRow label="Discount:" value={formatCurrency(discountAmount)} />
      {discountRemark && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount Remark:</Text>
          <Text style={styles.summaryValue}>{discountRemark}</Text>
        </View>
      )}
      <SummaryRow label="Paid Amount:" value={formatCurrency(paidAmount)} />
      <SummaryRow label="Balance:" value={formatCurrency(balanceAmount)} />
    </View>
    <View style={styles.amountInWords}>
      <Text>Amount in Words: {amountInWords}</Text>
    </View>
  </>
);

interface SummaryRowProps {
  label: string;
  value: string;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ label, value }) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={styles.summaryValue}>{value}</Text>
  </View>
);