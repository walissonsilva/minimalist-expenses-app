import { IInputProps, Input as InputNativeBase } from "native-base";

interface InputProps extends IInputProps {}

export const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <InputNativeBase
      {...props}
      borderColor="gray.300"
      height="10"
      _focus={{ borderColor: "primary.500", backgroundColor: "primary.200" }}
      fontSize="sm"
      backgroundColor="white"
      _invalid={{
        color: "red.600",
        backgroundColor: "white",
        _focus: { backgroundColor: "red.50" },
      }}
    />
  );
};
