import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ApiClient from "../../services/apiClient"
import "./Register.css"

export default function Register({ user, setUser}){
    const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    first_name: "",
    last_name:"",
    username:"",
    email: "",
    password: "",
    passwordConfirm: "",
  })

  useEffect(() => {
    // if user is already logged in,
    // redirect them to the detailed activity page aka an authenticated view
    if (user?.email) {
      navigate("/")
    }
  }, [user, navigate])

  //Something Extra to lett users know if say they didnt enter a  email that is valid for registration...Example nonvalid:mygamil.com vs valid: my@gmail.com
  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }
     //Also something extra doesnt allow registration to go through and gives an error if passwords dont match in the "password" input and the "confirm password" input
    if (event.target.name === "passwordConfirm") {
      if (event.target.value !== form.password) {
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }
  const handleOnSubmit = async () => {
    setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      setIsProcessing(false)
      return
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }))
    }

    const{ data, error } = await ApiClient.registerUser({ 
           first_name: form.first_name,
            last_name: form.last_name,
            username: form.username,
            email: form.email,
            password: form.password})
    if(error) setErrors( setErrors((e) => ({ ...e, form: error })))
    //?.user
    if(data){
        setUser(data.user)
        ApiClient.setToken(data.token)
    }
    setIsProcessing(false)
    //Connects to the backend register database, when are required fields are entered
    // try {
    //   const res = await axios.post("http://localhost:3001/auth/register", {
    //     first_name: form.first_name,
    //     last_name: form.last_name,
    //     username: form.username,
    //     email: form.email,
    //     password: form.password,
    //   })
    //   if (res?.data?.user) {
    //     setUser(res.data.user)
    //   } else {
    //     setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
    //   }
    // } catch (err) {
    //   console.log(err)
    //   const message = err?.response?.data?.error?.message
    //   setErrors((e) => ({ ...e, form: message ?? String(err) }))
    // } finally {
    //   setIsProcessing(false)
    // }
  }







    return(
        <div className="Register">
            <div className ="card">
                <h2>REGISTER</h2>
                <br/>
                <div className = "form">
                    <div className="inputField">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Enter valid email" value={form.email} onChange = {handleOnInputChange}/>
                    </div>
                    <div className="inputField">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="Enter a Username" value={form.username} onChange = {handleOnInputChange} />
                    </div>
                    <div className="split-input-field">
                        <div className = "inputField">
                             <input type="text" name="first_name" placeholder="First Name" value={form.first_name} onChange = {handleOnInputChange}/>
                             
                        </div>
                        <div className = "inputField">
                            <input type="text" name="last_name" placeholder="Last Name"  value={form.last_name} onChange = {handleOnInputChange}/>
                        </div>
                    </div>
                    <div className="inputField">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Enter a Password" value={form.password} onChange = {handleOnInputChange}/>
                    </div>
                    <div className="inputField">
                        <label htmlFor="passWordConfirm">Confirm Password</label>
                        <input type="password" name="passwordConfirm" placeholder="Confirm Password" value={form.passwordConfirm} onChange = {handleOnInputChange}/>
                    </div>
                    <button className = "btn" disabled={isProcessing} onClick={handleOnSubmit}>{isProcessing ? "Loading..." : "Create Account"}</button>




                </div>



            </div>
        </div>



    );



}