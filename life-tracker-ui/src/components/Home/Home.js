import "./Home.css"
export default function Home(){
    
    return(
        //The Landing page ~ that renders for everyone no matter if the user is an authenticated user or not.
        //This page doesnt cantain any backend or sensitive data, which is why I am able to do it this way.
        
        <div className = "Landing">
            <div className = "Hero">
                <img src="https://images.unsplash.com/photo-1517502474097-f9b30659dadb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1482&q=80" alt= "Hero "/>
                <h1>Life Tracker</h1>
                <p>Helping you take back control of your world</p>
            </div>
            <div className = "tiles">
                <div className ="tile">
                    <img src="http://codepath-lifetracker.surge.sh/static/media/icons-workout-48.4f4cdb05.svg" alt = "fitness"/>
                    <p>Fitness</p>
                </div>
                <div className ="tile">
                    <img src="http://codepath-lifetracker.surge.sh/static/media/icons8-porridge-100.132d2715.svg" alt = "food"/>
                    <p>Food</p>
                </div>
                <div className ="tile">
                    <img src="http://codepath-lifetracker.surge.sh/static/media/icons8-resting-100.81067336.svg" alt = "rest"/>
                    <p>Rest</p>
                </div>
                
             </div>
            
        </div>
        



    );

}