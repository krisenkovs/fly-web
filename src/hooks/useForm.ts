import { useCallback, useMemo, useState } from 'react';

type ValueType = any;

type FieldType = {
  required?: {
    message?: string;
  };
  pattern?: {
    value?: RegExp;
    message?: string;
  };
  min?: {
    value?: number;
    message?: string;
  };
  max?: {
    value?: number;
    message?: string;
  };
  validator?: (value: ValueType, values: Record<string, ValueType>) => string | undefined;
  dependence?: string[];
};

type SchemaType = Record<string, FieldType>;

export function useForm(schema: SchemaType) {
  const [values, setValues] = useState<Record<keyof typeof schema, ValueType>>({});
  const [errors, setErrors] = useState<Record<keyof typeof schema, string | undefined>>({});
  const [changed, setChanged] = useState(false);

  const validateField = (
    key: keyof typeof schema,
    value: ValueType,
    allValues: Record<keyof typeof schema, ValueType>,
  ) => {
    const fieldType = schema[key];

    if (fieldType?.required?.message && !value) {
      return fieldType?.required?.message;
    }
    if (fieldType?.pattern?.value && !`${value}`?.match(fieldType?.pattern?.value)) {
      return fieldType?.pattern?.message;
    }
    if (fieldType?.min?.value && fieldType?.min?.value > value) {
      return fieldType?.min?.message;
    }

    if (fieldType?.max?.value && fieldType?.max?.value < value) {
      return fieldType?.max?.message;
    }

    if (fieldType?.validator) {
      return fieldType?.validator(value, allValues);
    }

    fieldType?.dependence?.forEach((item) => {
      const validateMessage = validateField(item, allValues[item], { ...allValues, [key]: value });
      setErrors((prevState) => ({ ...prevState, [item]: validateMessage }));
    });
  };

  const setFieldValue = useCallback(
    (field: keyof typeof schema, value: ValueType) => {
      setValues((prevState) => ({ ...prevState, [field]: value }));
      setErrors((prevState) => ({ ...prevState, [field]: validateField(field, value, values) }));
      setChanged(true);
    },
    [values],
  );

  const resetFields = useCallback((fieldValues?: Record<keyof typeof schema, ValueType>) => {
    fieldValues ? setValues(fieldValues) : setValues({});
    setErrors({});
    setChanged(false);
  }, []);

  const validateFields = useCallback(() => {
    for (const key of Object.keys(schema)) {
      const message = validateField(key, values[key], values);

      if (message) {
        setErrors((prevState) => ({ ...prevState, [key]: message }));
        return Promise.reject(message);
      }
    }

    return Promise.resolve(values);
  }, [values]);

  const hasError = useMemo(() => {
    return Object.values(errors).some((item) => item);
  }, [errors]);

  return useMemo(() => {
    return {
      validateFields,
      values,
      resetFields,
      errors,
      setFieldValue,
      hasError,
      changed,
    };
  }, [errors, values, validateFields, setFieldValue, resetFields, hasError, changed]);
}
