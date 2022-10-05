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

export const assignAdminValidations = 
    Yup.object().shape({
        name : Yup.string().required("Name is required"),
        walletAddress : Yup.string().required("Wallet Address is required").min(42, "Wallet Address must be at least 42 characters"),
    })