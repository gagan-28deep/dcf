import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#fff'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        backgroundColor: '#fff',
        color: '#000',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'left',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '55%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'left',
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
        paddingLeft: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
        paddingLeft: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'center',
        paddingRight: 8,
        paddingLeft: 8,
    },
    index: {
        width: '5%',
        textAlign: 'left',
        paddingRight: 8,
        paddingLeft: 8,
    },
});

const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.index}>#</Text>
        <Text style={styles.description}>Item & Description</Text>
        <Text style={styles.qty}>Qty</Text>
        <Text style={styles.rate}>Price</Text>
        <Text style={styles.rate}>Discount</Text>
        <Text style={styles.amount}>Amount</Text>
    </View>
);

export default InvoiceTableHeader;