import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/invoiceStyles';
import { Test } from '../../../types';
import { formatCurrency } from '../../../utils/pdf/formatters';

interface TestsTableProps {
  tests: Test[];
}

export const TestsTable: React.FC<TestsTableProps> = ({ tests }) => (
  <View style={styles.table}>
    <View style={styles.tableHeader}>
      <Text style={[styles.tableCell, styles.testName]}>Test Name</Text>
      <Text style={[styles.tableCell, styles.amount]}>Amount</Text>
    </View>
    {tests.map((test, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.testName]}>{test.name}</Text>
        <Text style={[styles.tableCell, styles.amount]}>
          {formatCurrency(Number(test.offerPrice) || 0)}
        </Text>
      </View>
    ))}
  </View>
);