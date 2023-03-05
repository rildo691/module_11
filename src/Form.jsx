import React from "react";
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const Form = () => {
    const schema = yup.object().shape({
        fullName: yup.string().required("Full Name is required"),
        email: yup.string().email().required("You must enter a valid email"),
        age: yup.number().positive().integer().min(18).required("Minimum age: 18"),
        password: yup.string().min(4).max(20).required("The password must have at least 4 charachters"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").required()
    })

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Full Name" {...register("fullName")} />
            <p>{errors.fullName?.message}</p>
            <input type="text" placeholder="Email" {...register("email")} />
            <p>{errors.email?.message}</p>
            <input type="number" placeholder="Age" {...register("age")} />
            <p>{errors.age?.message}</p>
            <input type="password" placeholder="Password" {...register("password")} /> <p></p>
            <input type="password" placeholder="Confirm Password" {...register("confirmPassword")} /> <p></p>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default Form