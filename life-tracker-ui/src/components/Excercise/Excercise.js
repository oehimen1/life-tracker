import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import "./Excercise.css"

const Addexcercise = () => {
    return (
      <Link className="createLink" to="/excercises/create">
        <button className="addExcerciseBttn">Add Excercise</button>
      </Link>
    )
  }
  


export default function Excercise({ excercises, initialized, user }){
    
    const navigate = useNavigate()

    useEffect(() => {
        // if user is already logged in,
        // redirect them to the detailed activity page aka an authenticated view
        if (user?.email) {
          navigate("/excercises")
        }
        else if(!user?.email && initialized){
          
          navigate("/unauthorized")
        }
      }, [user, navigate, initialized])




    const handleOnClick =  () =>{
       
            console.log("create here")
            navigate("/create")
        
        
    }



    return(
        <div className="ExcercisePage">
            <div className="Banner">
                <h1>EXCERCISE</h1>
            </div>
            <div className="Content">
                <div className="ExcerciseSummary">
                    <div className="header">
                        <h3>Overview</h3>
                        <Addexcercise />
                        {/* <button className="addExcerciseBttn" onClick={handleOnClick} >Add Excercise</button> */}
                    </div>
                    <div className="feed">
                        
                        {excercises.map((excercise) => {
                            var date = new Date(excercise.timestamp).toLocaleDateString()
                            const time = new Date(excercise.timestamp).toLocaleTimeString()


                            return(
                                <div className = "ExcerciseCard">
                                    <div className= "card-header">
                                        <h2>{excercise.name}</h2>
                                    </div>
        
                                    <div className="card-stats">
                                        
                                        <div className="CardStat">
                                            <p>Duration</p>
                                            <span>{excercise.duration}</span>
                                        </div>

                                        <div className="CardStat">
                                            <p>Intensity</p>
                                            <span>{excercise.intensity}</span>
                                        </div>

                                    </div>

                                    <div className="card-meta">
                                        <small> Created {date} at {time}</small>
                                        <small className="category">{excercise.category}</small>

                                    </div>

                                </div>
                            )
                            
                        })}
                        

                    </div>
                </div>


            </div>


        </div>
    );

}