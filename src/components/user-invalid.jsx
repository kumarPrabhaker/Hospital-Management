import { Link } from "react-router-dom"



export function UserInvalid(){

    return(
        <div>
            <h2>Invalid Credintials</h2>
            <Link to="/login">Try again</Link>
        </div>
    )
}