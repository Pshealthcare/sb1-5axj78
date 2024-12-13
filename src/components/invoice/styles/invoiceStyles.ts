import { StyleSheet } from '@react-pdf/renderer';
import { pdfConfig } from '../../../utils/pdf/config';

const { fonts, colors } = pdfConfig;

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.text.primary,
    backgroundColor: colors.background.white
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10
  },
  headerLeft: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 10,
    color: colors.text.secondary,
    marginBottom: 2
  },
  divider: {
    backgroundColor: colors.background.light,
    padding: 8,
    marginVertical: 15
  },
  dividerText: {
    fontSize: 12,
    fontFamily: fonts.bold,
    textAlign: 'center',
    color: colors.text.primary
  },
  infoSection: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 20
  },
  infoColumn: {
    flex: 1
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5
  },
  label: {
    width: 100,
    fontFamily: fonts.bold,
    fontSize: 9
  },
  value: {
    flex: 1,
    fontSize: 9
  },
  table: {
    marginVertical: 15
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.background.light,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    minHeight: 25,
    alignItems: 'center'
  },
  tableCell: {
    padding: 8,
    fontSize: 9
  },
  testName: {
    flex: 3,
    fontFamily: fonts.bold
  },
  amount: {
    flex: 1,
    textAlign: 'right'
  },
  summary: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5
  },
  summaryLabel: {
    width: 120,
    textAlign: 'right',
    paddingRight: 10,
    fontFamily: fonts.bold,
    fontSize: 10
  },
  summaryValue: {
    width: 100,
    textAlign: 'right',
    fontSize: 10
  },
  amountInWords: {
    marginTop: 15,
    padding: 8,
    backgroundColor: colors.background.light,
    fontSize: 10,
    fontStyle: 'italic'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: colors.text.secondary
  }
});