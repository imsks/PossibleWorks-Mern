import { useState } from "react"
import axios from "axios"

const API_BASE_URL = "http://localhost:4000"

const useAPI = () => {
    const [response, setResponse] = useState()
    const [error, setError] = useState()

    const makeAPI = ({ slug, payload }) => {
        axios
            .post(`${API_BASE_URL}/${slug}`, payload)
            .then(function (response) {
                setResponse(response.data)
            })
            .catch(function (error) {
                setError(error)
            })
    }

    return { response, error, makeAPI }
}

export default useAPI
