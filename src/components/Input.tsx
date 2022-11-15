import {
  FormControl,
  IInputProps,
  Input as InputNativeBase,
  WarningOutlineIcon,
} from "native-base";

interface InputProps extends IInputProps {
  errorMessage?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  errorMessage,
  label,
  ...props
}) => {
  return (
    <FormControl isInvalid={props.isInvalid}>
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
          borderColor: "red.600",
          _focus: { backgroundColor: "red.50" },
        }}
      />

      {{ errorMessage } && (
        <FormControl.ErrorMessage
          _text={{
            color: "red.500",
          }}
          marginTop={2}
          leftIcon={<WarningOutlineIcon size="xs" />}
        >
          {errorMessage}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};
