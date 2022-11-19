import * as Yup from 'yup'

export const transactionSchemaValidation = Yup.object().shape({
  username: Yup.string().required('username is required').min(3, 'username length minimum are of 3 characters'),
  value: Yup.number()
    .required('value is required')
    .positive()
    .min(0.1)
})

export const transactionSchemaQueryParamsValidation = Yup.object().shape({
  cashIn: Yup.bool().optional(),
  cashOut: Yup.bool().optional(),
  createdAt: Yup.date().optional()
})
