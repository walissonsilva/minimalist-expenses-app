import {
  FormControl,
  Icon,
  ISelectProps,
  Select as SelectNativeBase,
  WarningOutlineIcon,
} from "native-base";
import Feather from "react-native-vector-icons/Feather";

export interface ISelectItem {
  label: string;
  value: string;
  icon?: string;
}

interface SelectProps extends ISelectProps {
  errorMessage?: string;
  label?: string;
  isInvalid?: boolean;
  options: ISelectItem[];
}

export const Select: React.FC<SelectProps> = ({
  options,
  errorMessage,
  label,
  isInvalid,
  ...props
}) => {
  return (
    <FormControl isInvalid={isInvalid}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <SelectNativeBase
        {...props}
        borderColor={isInvalid ? "red.500" : "gray.300"}
        height="10"
        fontSize="sm"
        backgroundColor="white"
        _selectedItem={{
          bg: "emerald.600",
          _text: {
            color: "white",
            fontWeight: 600,
          },
          _icon: {
            color: "white",
          },
          endIcon: (
            <Icon as={Feather} name="check" mt={1} size={4} color="white" />
          ),
        }}
        dropdownIcon={<Icon as={Feather} name="chevron-down" size={4} mr={2} />}
        borderWidth={1}
      >
        {options.map((option) => (
          <SelectNativeBase.Item
            key={option.value}
            label={option.label}
            value={option.value}
            startIcon={
              option.icon ? (
                <Icon as={Feather} name={option.icon} size={4} mt={1} />
              ) : undefined
            }
          />
        ))}
      </SelectNativeBase>

      {{ errorMessage } && (
        <FormControl.ErrorMessage
          _text={{
            color: "red.600",
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
