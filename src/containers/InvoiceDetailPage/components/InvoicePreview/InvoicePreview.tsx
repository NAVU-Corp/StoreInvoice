import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import { BoxShadow } from "../../../../components";
import "./InvoicePreview.scss";

export const InvoicePreview: React.FC<IInvoicePreview> = ({ link }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(data: { numPages: any }) {
    setNumPages(data.numPages);
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <BoxShadow>
        <Document
          file={
            "C:\\Users\\minht\\AppData\\Roaming\\app-pdf-ts\\store-pdf\\01GTKT0_0004532_3b126a1a-d8ea-45c4-8346-8eada99fe49a.pdf"
          }
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={1} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </BoxShadow>
    </div>
  );
};
