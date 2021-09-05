import { CSSProperties } from "react";

interface IButton extends IStyles {
  isRed?: boolean;
  isBig?: boolean;
  isWhite?: boolean;
  isPrimary?: boolean;
  isDanger?: boolean;
  isSuccess?: boolean;
  isSecondary?: boolean;
  isOutlinePrimary?: boolean;
  isOutlineSecondary?: boolean;
  isOutlineDark?: boolean;
  isWithImage?: boolean;
  isDark?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  isExtraBig?: boolean;
  style?: CSSProperties;
}
