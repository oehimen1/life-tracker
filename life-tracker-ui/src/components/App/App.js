import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react";
import ApiClient from "../../services/apiClient";
//import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Excercise from "../Excercise/Excercise";
import "./App.css"
import apiClient from "../../services/apiClient";
// import { fetchAll } from "../../../../life-tracker-api/models/excercise";

export default function App() {
  //Dont know who user is yet...
  
  const [user, setUser] = useState(null)
  const[excercises, setexcercises] = useState([]);
  const[error, setError] = useState(null)
  const[isFetching, setIsFetching] = useState(false)
  
  useEffect(()=>{
      const fetchExcercises = async() => {
      setIsFetching(true)
      // try{
      //   const res= await axios.get("http://localhost:3000/excercises")
      //   //console.log(res)
      //   const data = res.data
      //   if(data){
      //     setexcercises(data.excercises)
      //   }
      // }catch(err){
      //   console.log(err)
      // }

      const{ data, error} = await ApiClient.listExcercises()
      if(data) setexcercises(data.excercises)
      if(error) setError(error)

      setIsFetching(false)
    }
   
    fetchExcercises()
  },[])

  useEffect(() =>{
    const fetchUser = async () => {
      const {data, error} = await ApiClient.fetchUserFromToken()
      if(data) setUser(data.user)
      if(error) setError(error)
    }
    const token = localStorage.getItem("life_tracker_token")
    if(token){
      ApiClient.setToken(token)
      fetchUser()
    }

  }, [])

  const handleOnLogout = async () =>{
    await ApiClient.logoutUser()
    setUser({})
    setError(null)
}


  return (
    <div className="App">      
       <BrowserRouter>
          <NavBar user={user} setUser={setUser}  handleOnLogout={handleOnLogout}/>
            <Routes>
              <Route path = "/" element={ <Home /> }/>
              <Route path = "/excercises" element={ <Excercise user={user} setUser={setUser} excercises={excercises}/> }/>
              <Route path="/register" element={ <Register user={user} setUser={setUser}/>} />
              <Route path="/login" element={ <Login user={user} setUser={setUser}/>}/>
             </Routes>
       
     
     
        </BrowserRouter>
    </div>
  );
}

// export default App;
