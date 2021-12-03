import React from 'react';

const useForm = (options) => {
  const [data, setData] = React.useState(options.initialValues || {});
  const [errors, setErrors] = React.useState({});

  const handleChangeValue = (key, prependCallback) => (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const fieldValue = prependCallback ? prependCallback(value) : value;

    setData({
      ...data,
      [key]: fieldValue,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const validationRules = options?.rules;

    if (validationRules) {
      let isValid = true;

      const newErrors = {};

      for (const key in validationRules) {
        const value = data[key];
        const validation = validationRules[key];

        if (validation?.required?.value && !value) {
          isValid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;

        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          isValid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;

        if (custom?.isValid && !custom.isValid(value)) {
          isValid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!isValid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      if (options?.resetOnSubmit) {
        e.target.reset();
        setData({});
      }

      options.onSubmit();
    }
  };

  return { data, errors, handleChangeValue, handleSubmitForm };
};

export default useForm;
