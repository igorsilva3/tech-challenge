import * as Yup from 'yup'

const passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$")

export const userSchemaValidation = Yup.object().shape({
  username: Yup.string().required('username is required').min(3, 'username length minimum are of 3 characters'),
  password: Yup.string()
    .required('password is required')
    .matches(passwordRegex, 'password must contain 8 or more characters with at least one of each: uppercase, lowercase and number.'),
})
