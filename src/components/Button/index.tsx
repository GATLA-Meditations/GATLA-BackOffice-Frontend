import "./styles.css";

interface ButtonProps {
  onClick: () => void;
  variant: "primary" | "red" | "green";
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  size?: "small" | "medium" | "large";
}

const Button = ({
  onClick,
  variant,
  className,
  disabled,
  children,
  size
}: ButtonProps) => {
  return (
    <button
      className={"button" + " " + size + " " + variant + " " + className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
