import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 10,
    },
    reportTitle: {
        color: '#000000',
        letterSpacing: 0.2,
        fontSize: 28,
        textAlign: 'left',
        textTransform: 'uppercase',
    },
    reportSubTitle: {
        color: '#000000',
        letterSpacing: 0.2,
        fontSize: 20,
        textAlign: 'left',
        textTransform: 'uppercase',
    }
});

const InvoiceHeader = ({ header, subHeader }) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{header}</Text>
        <Text style={styles.reportSubTitle}>{subHeader}</Text>
    </View>
);

export default InvoiceHeader;