import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-start'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'flex-start'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
        textAlign: "left"
    },
    label: {
        width: "auto",
        marginRight: "10px"
    }
});

const InvoiceNo = ({ invoice }) => (
    <Fragment>
        <View style={styles.invoiceNoContainer}>
            <Text style={styles.label}>Sr No:</Text>
            <Text style={styles.invoiceDate}>{invoice?.invoice_num}</Text>
        </View>
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Invoice Date:</Text>
            <Text style={styles.invoiceDate}>{moment(invoice?.createdAt?.split("T")[0]).format("DD-MM-YYYY")}</Text>
        </View >
        {/* <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Due Date: </Text>
            <Text >{moment(invoice?.createdAt?.split("T")[0]).format("DD-MM-YYYY")}</Text>
        </View> */}
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Payment Method: </Text>
            <Text >{invoice?.payment_mode}</Text>
        </View>
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Place Of Supply: </Text>
            <Text >{invoice?.place_supply}</Text>
        </View>
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Doctor: </Text>
            <Text >{invoice?.doctor_name}</Text>
        </View>
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Bill To: </Text>
            <Text >{invoice?.patient_name}</Text>
        </View>
    </Fragment>
);

export default InvoiceNo;