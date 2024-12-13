import { StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf' },
    { 
      src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf',
      fontWeight: 'bold'
    }
  ]
});

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#000',
    paddingBottom: 10
  },
  headerLeft: {
    flex: 1
  },
  headerRight: {
    width: 120,
    height: 120,
    marginLeft: 20
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#2563eb'
  },
  subtitle: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 2
  },
  section: {
    margin: 10,
    padding: 10
  },
  patientInfo: {
    marginBottom: 20
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
    flexWrap: 'wrap'
  },
  infoColumn: {
    flex: 1,
    minWidth: '50%'
  },
  label: {
    width: 120,
    fontWeight: 'bold',
    fontSize: 10
  },
  value: {
    flex: 1,
    fontSize: 10
  },
  table: {
    display: 'table',
    width: 'auto',
    marginVertical: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
  tableHeader: {
    backgroundColor: '#f0f0f0'
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: '#000'
  },
  testName: {
    width: '60%'
  },
  amount: {
    width: '40%',
    textAlign: 'right'
  },
  summary: {
    marginTop: 20,
    borderTop: 1,
    borderTopColor: '#000',
    paddingTop: 10
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
    paddingRight: 10
  },
  summaryLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    width: 100,
    textAlign: 'right',
    marginRight: 10
  },
  summaryValue: {
    fontSize: 9,
    width: 80,
    textAlign: 'right'
  },
  amountInWords: {
    marginTop: 10,
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
    padding: 5,
    backgroundColor: '#f8f8f8'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30
  },
  notes: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: 1,
    borderTopColor: '#666'
  },
  noteTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5
  },
  noteText: {
    fontSize: 8,
    color: '#444',
    marginBottom: 3
  }
});