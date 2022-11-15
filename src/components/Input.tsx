import {
  FormControl,
  IInputProps,
  Input as InputNativeBase,
  Stack,
  WarningOutlineIcon,
} from "native-base";

interface InputProps extends IInputProps {
  error?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({ error, label, ...props }) => {
  return (
    <FormControl>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <InputNativeBase
        {...props}
        borderColor="gray.300"
        height="10"
        _focus={{
          borderColor: "primary.500",
          backgroundColor: "primary.200",
        }}
        fontSize="sm"
        backgroundColor="white"
        _invalid={{
          color: "red.600",
          backgroundColor: "white",
          _focus: { backgroundColor: "red.50" },
        }}
      />

      {error && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};
