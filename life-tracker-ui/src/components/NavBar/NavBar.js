
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import ApiClient from "../../services/apiClient"
import "./NavBar.css"

export default function NavBar({user, setUser, handleOnLogout}){

  
        // const navigate = useNavigate()
        // const handleOnLogout = () => {
        //     setUser(null)
        //     localStorage.setItem("lifetracker_token", null)
        //     navigate("/activity")
        // }

        // const handleOnLogout = async () =>{
        //     await ApiClient.logoutUser()
        //     setUser({})
        // }
        

    
    return(
        <nav className="NavBar">
            <div className="content">
                <div className="logo">
                    <Link to="/">
                        <img src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg" alt="LifeTracker Logo"></img>
                    </Link>
                </div>
                <ul className="links" >

                    <li className="Activity">
                        <a className="acta" href="/activity">Activity</a>
                    </li>
                    <li className="Excercise">
                        <a href="/excercises">Excercise</a>
                    </li>
                    <li className="Nutrition">
                        <a href="/nutrition">Nutrition</a>
                    </li>
                    <li className="Sleep">
                        <a href="/sleep">Sleep</a>
                    </li>

                    {user?.id ? 
                     <li className="logout">
                        <span onClick={handleOnLogout}>LogOut</span>
                     </li>
                    :

                    <>

                    <li className= "Login">
                       <a href="/login">Login</a>
                    </li> 
                
                    <li className="register">
                        <a href="/register">Register</a>
                    </li>
                   
                    </>

                  
                }
                    
                    
                    
                    
                </ul>
            </div>
        </nav>


    )







}