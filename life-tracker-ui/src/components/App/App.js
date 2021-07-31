import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react";
import ApiClient from "../../services/apiClient";
//import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Excercise from "../Excercise/Excercise";
import CreateExcercise from "../Excercise/CreateExcercise";
import Activity from "../Activity/Activity";
import "./App.css"
import apiClient from "../../services/apiClient";
import Unauthorized from "../Unauthorized/unauthorized";
// import { fetchAll } from "../../../../life-tracker-api/models/excercise";

export default function App() {
  //Dont know who user is yet...
  
  const [user, setUser] = useState(null)
  const[excercises, setexcercises] = useState([]);
  const[error, setError] = useState(null)
  const[isFetching, setIsFetching] = useState(false)
  const [initialized, setInitialized] = useState(false)



  useEffect(() =>{
    const fetchUser = async () => {
      const {data, error} = await apiClient.fetchUserFromToken()
      if(data) setUser(data.user)
      setInitialized(true)
      if(error) setError(error)
    }
    const token = localStorage.getItem("life_tracker_token")
    if(token){
      apiClient.setToken(token)
      fetchUser()
    }else{
      setInitialized(true)
    }

  }, [])




  
  useEffect(()=>{
      const fetchExcercises = async() => {
      setIsFetching(true)

      const{ data, error} = await apiClient.fetchAll()
      if(error) setError(error)
      if(data?.excercises){
        setexcercises(data.excercises)
      } 
      // setIsFetching(false)
    }
   
    fetchExcercises()
  },[])




  const handleOnLogout = async () =>{
    await apiClient.logoutUser()
    setUser({})
    setError(null)
}


  return (
    <div className="App">      
       <BrowserRouter>
          <NavBar user={user} setUser={setUser}  intialized={initialized} handleOnLogout={handleOnLogout}/>
            <Routes>
              <Route path = "/" element={ <Home /> }/>
              <Route path="/unauthorized" element={ <Unauthorized />}/>
              <Route path="/activity" element={ <Activity user={user} setUser={setUser} excercises={excercises} initialized={initialized} /> } />
              <Route path = "/excercises" element={ <Excercise user={user} setUser={setUser} excercises={excercises} initialized={initialized}/> }/>
              <Route path = "/excercises/create" element={ <CreateExcercise user={user} setUser={setUser}   setexcercises={setexcercises}/>} />
              <Route path="/register" element={ <Register user={user} setUser={setUser}/>} />
              <Route path="/login" element={ <Login user={user} setUser={setUser}/>}/>
             </Routes>
       
     
     
        </BrowserRouter>
    </div>
  );
}

// export default App;
