import * as Yup from "yup";

export const loginValidations = 
    Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 6 characters")
            .required("Password is required"),
    });


export const registerValidations = 
    Yup.object({
        email:Yup.string().required("Please enter email!").email("Please enter a valid email"),
        password:Yup.string().required("Please enter password!").min(8,"Password must be at least 8 characters long"),
        rePassword:Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        name : Yup.string().required("Please enter name!"),
        phone : Yup.string().required("Please enter phone!"),
        walletAddress:Yup.string().required("Please connect wallet !"),
    })

export const orderValidation = 
    Yup.object().shape({
        shippingInfo: Yup.object().shape({
            address : Yup.string().required("Please enter address!"),
            city : Yup.string().required("Please enter city!"),
            state : Yup.string().required("Please enter state!"),
            country : Yup.string().required("Please enter country!"),
            pincode : Yup.string().required("Please enter pincode!"),
        }),

    })

export const requestWarrantyValidation = 
    Yup.object().shape({
        name : Yup.string().required("Please enter name!"),
        phone : Yup.string().required("Please enter phone!"),
        email : Yup.string().required("Please enter email!"),
        walletAddress : Yup.string().required("Please enter wallet address!").length(42,"Please enter valid wallet address!"),
    })