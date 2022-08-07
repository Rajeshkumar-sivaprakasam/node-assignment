const yup = require('yup');

const userSchema = yup.object().shape({
  firstName: yup.string().required('fname required'),
  lastName: yup.string().required('lname required'),
  email: yup.string().email().required('email required'),
  password: yup.string().min(4).max(10).required('password required'),
  addressLine1: yup.string().required('address required'),
  city: yup.string().required('city required'),
  state: yup.string().required('state required'),
  zip: yup.string().required('zip required'),
});

module.exports = userSchema;
