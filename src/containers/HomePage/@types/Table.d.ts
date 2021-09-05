interface ITable {
  typeInvoice?: number;
  dataTable?: Array<IResInvoice>;
  handleDeleteInvoice?: (id: number) => void;
  handlePreviewPDF?: (link: string) => void;
  handleOpenFile?: (link: string) => void;
  handleOpenFolder?: (link: string) => void;
}
