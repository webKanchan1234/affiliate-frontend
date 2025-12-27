

import { useState } from "react";

const useFormValidation = (schema) => {
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};

    Object.keys(schema).forEach((field) => {
      for (let rule of schema[field]) {
        const error = rule(data[field]);
        if (error) {
          newErrors[field] = error;
          break;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default useFormValidation;
