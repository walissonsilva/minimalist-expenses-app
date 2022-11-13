import { IButtonProps, Button as ButtonNativeBase } from "native-base";

interface ButtonProps extends IButtonProps {
  children?: React.ReactNode;
  type?: "primary" | "secondary" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "primary",
  ...props
}) => {
  function getBackground(): string {
    switch (type) {
      case "primary":
        return "primary.500";
      case "secondary":
        return "secondary.500";
      default:
        return "transparent";
    }
  }

  return (
    <ButtonNativeBase
      {...props}
      borderWidth={type === "outline" ? 1 : 0}
      borderColor={type === "outline" ? "primary.500" : "transparent"}
      backgroundColor={getBackground()}
      _text={{
        textTransform: "uppercase",
        fontWeight: 700,
        color: type === "outline" ? "primary.500" : "white",
      }}
    >
      {children}
    </ButtonNativeBase>
  );
};
