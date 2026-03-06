import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Service } from '../../utils/pricing';

// Registro de fuente para un look profesional
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: 2,
    borderBottomColor: '#0d33f2',
    paddingBottom: 20,
    marginBottom: 30,
  },
  logo: {
    width: 150,
  },
  headerInfo: {
    textAlign: 'right',
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#111111',
    marginBottom: 5,
  },
  folio: {
    fontSize: 10,
    color: '#0d33f2',
    fontWeight: 700,
  },
  clientSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#666666',
    textTransform: 'uppercase',
    marginBottom: 10,
    letterSpacing: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 700,
  },
  table: {
    width: 'auto',
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderBottom: 1,
    borderBottomColor: '#eeeeee',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: 1,
    borderBottomColor: '#eeeeee',
  },
  colDesc: { width: '70%', fontSize: 10 },
  colPrice: { width: '30%', textAlign: 'right', fontSize: 10, fontWeight: 700 },
  summary: {
    marginLeft: 'auto',
    width: '40%',
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTop: 1,
    borderTopColor: '#0d33f2',
    marginTop: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    borderTop: 1,
    borderTopColor: '#eeeeee',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 8,
    color: '#999999',
    marginBottom: 4,
  }
});

interface QuotePDFProps {
  clientName: string;
  businessName: string;
  selectedServices: Service[];
  totals: { subtotal: number; discount: number; total: number };
  folio: string;
}

export const QuotePDF = ({ clientName, businessName, selectedServices, totals, folio }: QuotePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Membretado */}
      <View style={styles.header}>
        <Image src="/logo/logoalt.png" style={styles.logo} />
        <View style={styles.headerInfo}>
          <Text style={styles.title}>COTIZACIÓN</Text>
          <Text style={styles.folio}>FOLIO: {folio}</Text>
          <Text style={{ fontSize: 9, marginTop: 5 }}>Fecha: {new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      {/* Información del Cliente */}
      <View style={styles.clientSection}>
        <Text style={styles.sectionTitle}>Preparado para:</Text>
        <Text style={styles.clientName}>{clientName}</Text>
        <Text style={{ fontSize: 10, color: '#666' }}>{businessName}</Text>
      </View>

      {/* Tabla de Servicios */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.colDesc}>Servicio / Concepto</Text>
          <Text style={styles.colPrice}>Inversión</Text>
        </View>
        {selectedServices.map((service) => (
          <View key={service.id} style={styles.tableRow}>
            <Text style={styles.colDesc}>{service.id.toUpperCase()} - {service.nameKey}</Text>
            <Text style={styles.colPrice}>${service.basePrice.toLocaleString('es-MX')}</Text>
          </View>
        ))}
      </View>

      {/* Resumen Financiero */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={{ fontSize: 9 }}>Subtotal:</Text>
          <Text style={{ fontSize: 9 }}>${totals.subtotal.toLocaleString('es-MX')}</Text>
        </View>
        {totals.discount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={{ fontSize: 9, color: '#0d33f2' }}>Descuento Paquete:</Text>
            <Text style={{ fontSize: 9, color: '#0d33f2' }}>-${totals.discount.toLocaleString('es-MX')}</Text>
          </View>
        )}
        <View style={styles.totalRow}>
          <Text style={{ fontSize: 12, fontWeight: 700 }}>TOTAL:</Text>
          <Text style={{ fontSize: 12, fontWeight: 700 }}>${totals.total.toLocaleString('es-MX')} MXN</Text>
        </View>
      </View>

      {/* Pie de Página */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Studio Creativo - Marketing Digital & Diseño Web</Text>
        <Text style={styles.footerText}>screativo.mkt@gmail.com | 55 9187 7538 | México CDMX</Text>
        <Text style={{ fontSize: 7, color: '#CCCCCC', marginTop: 10 }}>
          Esta cotización es informativa y sujeta a cambios tras la sesión de descubrimiento técnica. Válida por 30 días.
        </Text>
      </View>
    </Page>
  </Document>
);
