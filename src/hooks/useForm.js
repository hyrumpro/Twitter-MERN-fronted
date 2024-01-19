import { useState } from 'react';

const useForm = (initialValues = {}, validationRules = {}) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        setErrors({}); // Clear errors on change
    };

    const handleSubmit = (onSubmit) => {
        setIsSubmitting(true); // Set submitting state to prevent multiple submissions

        const validationErrors = {};

        for (const [fieldName, rule] of Object.entries(validationRules)) {
            if (!rule(formData[fieldName])) {
                validationErrors[fieldName] = rule.errorMessage || `Invalid ${fieldName}`;
            }
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            onSubmit(formData); // Call the provided onSubmit callback with form data
        } else {
            setIsSubmitting(false); // Reset submitting state if errors exist
        }
    };

    return { formData, errors, handleChange, handleSubmit, isSubmitting };
};

export default useForm;
