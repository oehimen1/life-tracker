
import { useState } from "react"
import { Link } from "react-router-dom"
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

                    <li className="Home">
                       <Link to="/">Home</Link>
                    </li>

                    <li className="Activity">
                        <Link className="acta" to="/activity">Activity</Link>
                    </li>
                    
                    <li className="Excercise">
                        <Link to="/excercises">Excercise</Link>
                    </li>
                    
                    {/* <li className="Nutrition">
                        <Link to="/nutrition">Nutrition</Link>
                    </li>
                    
                    <li className="Sleep">
                        <Link to="/sleep">Sleep</Link>
                    </li> */}

                    {user?.id ? 
                     <li className="logout">
                        <span onClick={handleOnLogout}>LogOut</span>
                     </li>
                    :

                    <>

                    <li className= "Login">
                       <Link to="/login">Login</Link>
                    </li> 
                
                    <li className="register">
                        <Link to="/register">Register</Link>
                    </li>
                   
                    </>

                  
                }
                    
                    
                    
                    
                </ul>
            </div>
        </nav>


    );







}