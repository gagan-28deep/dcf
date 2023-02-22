import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        justifyContent: 'flex-start',
        width: 'auto',
        paddingBottom: 3,
    },
    headerContainer: {
        marginTop: 10,
        justifyContent: 'flex-start',
        width: 'auto',
        paddingBottom: 3,
    },
    text: {
        fontWeight: 600,
        fontSize: 12
    }
});

const BillTo = ({ invoice }) => (
    <View style={styles.headerContainer}>
        <View style={styles.container}>
            <Text style={styles.text}>Doctors Plaza</Text>
            <Text style={styles.text}>+91 9910415720, +91 9910295721,</Text>
            <Text style={styles.text}>011 49424130, 011 48018732</Text>
            <Text style={styles.text}>www.doctorsplaza.in</Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.text}>Docto Net Private Limited</Text>
            <Text style={styles.text}>HDFC BANK ACCOUNT</Text>
            <Text style={styles.text}>59210006300063</Text>
            <Text style={styles.text}>IFSC: HDFC0000091</Text>
        </View>
    </View>
);

export default BillTo;