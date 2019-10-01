import * as yup from "yup"

export const schemaUsername = yup.object().shape({
    name: yup.string().required(),
  });
  export const schemaEmail = yup.object().shape({
    email: yup.string().email().required(),
  });
  export const schemaPassword = yup.object().shape({
    password: yup.string().required().min(8),
  });