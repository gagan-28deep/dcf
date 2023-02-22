import React from "react";
import { Page, Document, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../../Assets/images/logo.jpeg";
import InvoiceTitle from "./InvoiceTitle";
import InvoiceNo from "./InvoiceNo";
import BillTo from "./BillTo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceHeader from "./invoiceHeader";

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: "200px",
        height: 70,
        textAlign: "left"
    }
});

const PdfDocument = (data) => {
    return (
        <Document>
            <Page size="A4" style={styles.page} >
                <Image style={styles.logo} src={logo} />
                <InvoiceHeader header={"Docto Net Private Limited"} subHeader={"Delhi, India"} />
                <InvoiceTitle title={'Tax Invoice'} />
                <InvoiceNo invoice={data} />
                <InvoiceItemsTable invoice={data} />
                {/* <BillTo invoice={data} /> */}
            </Page>
        </Document>
    );
}

export default PdfDocument;