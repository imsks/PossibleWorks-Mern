import { useState } from "react"
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction"
import FormExtra from "./FormExtra"
import Input from "./Input"
import { redirect, useNavigate } from "react-router-dom"
import useAPI from "../hooks/useAPI"

const fields = signupFields
let fieldsState = {}

fields.forEach((field) => (fieldsState[field.id] = ""))

export default function Signup() {
    const [signupState, setSignupState] = useState(fieldsState)
    const { response, error, makeAPI } = useAPI()
    const navigate = useNavigate()

    const handleChange = (e) =>
        setSignupState({ ...signupState, [e.target.id]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(signupState)
        createAccount()
    }

    const handleAdminCheck = (status) => {
        const isAdmin = status ? "admin" : "regular"

        setSignupState({ ...signupState, UserType: isAdmin })
    }

    const createAccount = () => {
        makeAPI({ slug: "auth/register", payload: signupState })
    }

    if (response) {
        navigate("/")
    }

    return (
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <div className=''>
                {fields.map((field) => (
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={signupState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                ))}
                <FormExtra handleAdminCheck={handleAdminCheck} />
                <FormAction handleSubmit={handleSubmit} text='Signup' />
                {error && <p>{error}</p>}
            </div>
        </form>
    )
}
