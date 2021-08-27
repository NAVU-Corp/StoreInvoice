interface IPagination {
  totalPage: number;
  page: number;
  handleSelectNumber?: (page: number) => void;
}
