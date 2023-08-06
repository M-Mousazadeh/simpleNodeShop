const yup = require('yup');

exports.schema = yup.object().shape({
    title : yup.string().required("Title is Required!").min(3, "Length of Title is too Short!").max(100,"Length of Title is too Long!"),
    detail : yup.string().required("Detail is Required!").min(3, "Length of Detail is too Short!"),
    price : yup.string().required('Price is Required!').matches(/\d/g, "Price is Invalid"),
    status : yup.mixed().oneOf(["available", "not available"], "Status Must be Either Available or Not Available"),
    thumbnail : yup.string().required("Thumbnail is Required!"),
})