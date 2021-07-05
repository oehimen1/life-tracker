import "./Excercise.css"
import { Link } from "react-router-dom";


export default function Excercise({user, setUser, excercises=[] }){

    return(
        <div className="ExcercisePage">
            <div className="Banner">
                <h1>EXCERCISE</h1>
            </div>
            <div className="Content">
                <div className="ExcerciseSummary">
                    <div className="header">
                        <h3>Overview</h3>
                        <Link className="createLink" to="/excercises/create">
                          <button className="addExcerciseBttn">Add Excercise</button>
                        </Link>
                       
                    </div>
                    <div className="feed">
                       {/* {excercises.map(excercise=>(
                           




                       ))} */}
                        <div className = "feedEmpty">
                            <h2>No entries</h2>
                        </div>

                    </div>
                </div>


            </div>


        </div>








    );






}