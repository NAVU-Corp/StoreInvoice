interface ISelect {
  error?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  options: Array<{ id: number; title: string }>;
}
