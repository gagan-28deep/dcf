import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import BillTo from './BillTo';

const borderColor = '#000000'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        // borderBottomColor: '#000000',
        // borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '82%',
        textAlign: 'right',
        borderRightColor: "#fff",
        borderRightWidth: 1,
        paddingLeft: 8,
        paddingRight: 8,
    },
    total: {
        width: '13%',
        textAlign: 'right',
        paddingRight: 8,
    },
    lastRow: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    index: {
        width: '5%',
        textAlign: 'left',
        // paddingRight: 8,
        paddingLeft: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: 8
    },
    footer1: {
        marginTop: 20,
    }
});

const InvoiceTableFooter = ({ invoice }) => {

    return (
        <>
            <View style={styles?.footer}>
                <BillTo />
                <View style={styles.footer1}>
                    <View style={styles.row}>
                        <Text style={styles.index}></Text>
                        <Text style={styles.description}>Sub Total:</Text>
                        <Text style={styles.total}>{invoice?.sub_total}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.index}></Text>
                        <Text style={styles.description}>Total Discount:</Text>
                        <Text style={styles.total}>{invoice?.total_discount}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.index}></Text>
                        <Text style={styles.description}>Total GST:</Text>
                        <Text style={styles.total}>{invoice?.total_gst}</Text>
                    </View>
                    <View style={styles.lastRow}>
                        <Text style={styles.index}></Text>
                        <Text style={styles.description}>Total:</Text>
                        <Text style={styles.total}>{invoice?.total_amount}</Text>
                    </View>
                </View>
            </View>

        </>
    )
};

export default InvoiceTableFooter;