interface IInput extends IStyles {
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
  name?: string;
  placeholder?: string;
  error?: string;
  label?: string;
  hasIconSearch?: boolean;
  className?: string;
}
