interface IInput extends IStyles {
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
  name?: string;
  placeholder?: string;
  error?: any;
  label?: string;
  hasIconSearch?: boolean;
  className?: string;
  type?: string;
}
