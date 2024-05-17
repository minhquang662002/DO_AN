import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
export const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <DatePicker
      {...field}
      {...props}
      autoComplete="damn"
      dateFormat="dd/MM/yyyy"
      selected={field.value ? new Date(field.value) : null}
      maxDate={new Date(`01-01-${new Date().getFullYear() - 18}`)}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
      placeholderText="DD/MM/YYYY"
    />
  );
};
