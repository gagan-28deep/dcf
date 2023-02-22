import React from 'react';
import { pdf, StyleSheet } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { PdfDocument } from '../invoicePDF';
import { apiAdminConfig } from '../../utils/api';

const useInvoicePDF = () => {


    const generatePdfDocument = async (data, snackbar) => {
        const blob = await pdf((
            <PdfDocument {...data} />
        )).toBlob();
        // saveAs(blob, `${data?.doctor_name}.pdf`);
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async function () {
            const base64data = reader.result;
            await apiAdminConfig.post(`invoice/view/${data?._id}`, {
                base64data: base64data
            }).then((response) => {
                if (response?.data) {
                    // setDownload({ href: response?.data?.url, index: index })
                    window.open(response?.data?.url, "_parent")
                    snackbar({
                        message: response?.data?.message,
                        severity: "success",
                    });
                } else {
                    snackbar({
                        message: response?.data?.message,
                        severity: "error",
                    });
                }
            }).catch((error) => {
                console.log("invoiceError", error)
                snackbar({
                    message: "Something went wrong...",
                    severity: "error",
                });
            })
        }

    };
    return { generatePdfDocument }
}

export default useInvoicePDF;