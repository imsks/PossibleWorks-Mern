import { Navigate } from "react-router-dom"

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
    return authenticated ? <Component {...rest} /> : <Navigate to='/' replace />
}
export default PrivateRoute
