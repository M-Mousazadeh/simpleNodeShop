const yup = require('yup');

exports.schema = yup.object().shape({
    fullname : yup.string().required('Full Name is Required!').min(2, 'Name is Too Short!').max(50, 'Name is Too Long!'),
    email : yup.string().email('The Email Address is Not Valid!').required('Email is Required!'),
    phone : yup.string().matches(/\d/, "The Phone Number is Not Valid").required('Phone Number is Required!'),
    password : yup.string().required('Password is Required').min(6, 'The Password is Too Short'),
    confirmPassword : yup.string().required('Confirm Password Is required').oneOf([yup.ref('password'), null], "Password And it's Confirmation Does not Match!"),
})