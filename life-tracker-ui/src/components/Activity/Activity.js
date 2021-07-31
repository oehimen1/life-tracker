import "./Activity.css"
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Activity({ user, excercises, initialized }){
    const navigate = useNavigate();

    useEffect(() => {
        // if user is already logged in,
        // redirect them to the detailed activity page aka an authenticated view
        if (user?.id) {
          navigate("/activity")
        }
        else if(!user?.id && initialized){
          
          navigate("/unauthorized")
        }
      }, [user, navigate, initialized])


    
    const totalMinutes =() =>{
        var sum = 0
        var date = new Date()
       excercises.forEach(function (item, index){
           //if (new Date(excercises[index].timestamp).toLocaleDateString()=== date.toLocaleDateString())
           sum += excercises[index].duration
       }) 
       console.log(sum)
       return sum
        
    }

    const avgIntensity =()=>{
        var sum=0
        var avg=0
        excercises.forEach(function (item,index){
            sum+= excercises[index].intensity
            avg++;
        })
       return sum/avg
    }



    return(
        <div className="ActivityPage">
            <div className="content">
                <div className="actions">
                    <h2>Activity Feed</h2>
                    <div className="buttons">
                        <Link to="/excercises/create">
                            <button>Add Excercise</button>
                        </Link>

                    </div>
                </div>
                <div className="stats">
                    <div className="main">
                        <div className="summary-stat">
                            <div className="background">
                                <p>Total Excercise Minutes</p>
                                <h1>{ totalMinutes() }</h1>
                            </div>
                        </div>
                    </div>
                    <div className="more">
                    <div className="summary-stat">
                            <div className="background">
                                <p>Average Excercise Intensity</p>
                                <h1>{ avgIntensity() }</h1>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    );
}