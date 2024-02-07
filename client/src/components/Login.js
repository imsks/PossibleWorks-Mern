import { useEffect, useState } from "react"
import { loginFields } from "../constants/formFields"
import FormAction from "./FormAction"
import Input from "./Input"
import useAPI from "../hooks/useAPI"
import useLocalStorage from "../hooks/useLocalStorage"
import { localStorageKeys } from "../constants/global"
import { useNavigate } from "react-router-dom"

const fields = loginFields
let fieldsState = {}
fields.forEach((field) => (fieldsState[field.id] = ""))

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState)
    const { response, error, makeAPI } = useAPI()
    const { set } = useLocalStorage()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        authenticateUser()
    }

    //Handle Login API Integration here
    const authenticateUser = () => {
        makeAPI({ slug: "auth/login", payload: loginState })
    }

    useEffect(() => {
        if (response && response.token) {
            set(localStorageKeys.TOKEN, response.token)
            navigate("/dashboard")
        }
    }, [response])

    return (
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <div className='-space-y-px'>
                {fields.map((field) => (
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={loginState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                ))}
            </div>

            <FormAction handleSubmit={handleSubmit} text='Login' />
            {error && <p>{error}</p>}
        </form>
    )
}
