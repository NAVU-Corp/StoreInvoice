import React, { useState } from "react";
import { Document, Page } from "react-pdf";

import { BoxShadow } from "../../../../components";
import "./InvoicePreview.scss";

export const InvoicePreview: React.FC<IInvoicePreview> = ({ link }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(data: { numPages: any }) {
    setNumPages(data.numPages);
  }
  return (
    <div>
      <BoxShadow>
        <Document file={link} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </BoxShadow>
    </div>
  );
};
