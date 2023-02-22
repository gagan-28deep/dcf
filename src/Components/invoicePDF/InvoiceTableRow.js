import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#000000'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '55%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'left',
        paddingRight: 8,
        paddingLeft: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'left',
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
    },
});

const InvoiceTableRow = ({ items }) => {
    const rows = items.map((item, index) =>
        <View key={`InvoiceTableRow-${index}`} style={styles.row}>
            <Text style={styles.index}></Text>
            <Text style={styles.description}>{item?.title}</Text>
            <Text style={styles.qty}>{item?.qty}</Text>
            <Text style={styles.rate}>{item?.price}</Text>
            <Text style={styles.qty}>{item?.discounted_price}</Text>
            <Text style={styles.amount}>{item?.final_price}</Text>
        </View>
    );
    return (<Fragment>{rows}</Fragment>)
};

export default InvoiceTableRow;