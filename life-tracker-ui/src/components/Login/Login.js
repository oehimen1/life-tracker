import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ApiClient from "../../services/apiClient"

// import axios from "axios"
import "./Login.css"

export default function Login({ user, setUser }){
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
      email: "",
      password: "",
    })
  
    useEffect(() => {
      // if user is already logged in,
      // redirect them to the detailed Activity page
      if (user?.email) {
        navigate("/activity")
      }
    }, [user, navigate])
  
    const handleOnInputChange = (event) => {
      if (event.target.name === "email") {
        if (event.target.value.indexOf("@") === -1) {
          setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
        } else {
          setErrors((e) => ({ ...e, email: null }))
        }
      }
  
      setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }
  
    const handleOnSubmit = async () => {
      setIsProcessing(true)
      setErrors((e) => ({ ...e, form: null }))

      const { data, error } = await ApiClient.loginUser({ email: form.email, password: form.password})
       if(error) setErrors( setErrors((e) => ({ ...e, form: error })))
        if(data){
            setUser(data.user)
            ApiClient.setToken(data.token)
        }
        setIsProcessing(false)
  
    //   try {
    //     const res = await axios.post("http://localhost:3001/auth/login", form)
    //     if (res?.data?.user) {
    //       setUser(res.data.user)
    //     } else {
    //       setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
    //     }
    //   } catch (err) {
    //     console.log(err)
    //     setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
    //   } finally {
    //     setIsProcessing(false)
    //   }
    }









    return(

        <div className ="Login">
            <div className = "card">
                <h2>LOGIN</h2>
                <br></br>
                <div className = "form">
                    <div className = "inputField">
                        <label htmlFor="email">Email</label>
                        <input type ="email" name="email" placeholder="person@gmail.com" value={form.email} onChange={handleOnInputChange}/>
                    </div>
                    <div className = "inputField">
                        <label htmlFor="password">Password</label>
                        <input type ="password" name="password" placeholder="password" value={form.password} onChange={handleOnInputChange}/>
                    </div>
                    <button className="btn" disabled={isProcessing} onClick={handleOnSubmit}>{isProcessing ? "Loading..." : "Login"}</button>
                </div>

            </div>


        </div>



    );



}