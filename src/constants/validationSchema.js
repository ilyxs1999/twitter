import * as yup from "yup"

export default  schema= yup.object().shape({
    username: yup.string().required().min(4),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  });