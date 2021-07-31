import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "../../services/apiClient"
import "./CreateExcercise.css"


export default function CreateExcercise({ user, setUser, setexcercises }){
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: "",
    category:"",
    duration:"",
    intensity: "",
  })

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))  
}

 

  const handleOnSubmit = async () => {
    setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))

    const{ data, error } = await apiClient.createExcercise({ 
         name: form.name,
         category: form.category,
         duration: form.duration,
         intensity: form.intensity
    })
        
    if(error) setErrors( setErrors((e) => ({ ...e, form: error })))
    //?.user
    if(data?.user){
        // setUser(data.user)
        // apiClient.setToken(data.token)
        // console.log(form)
        setexcercises(excercises=>[...excercises, data.excercises])
    }
    setIsProcessing(false)
    navigate("/excercises")

  }
  

  return(
      <div className="createPage">
         <div className="Banner">
                <h1>EXCERCISE</h1>
          </div>

          <div className="feed">
            <h2>Add Exercise</h2>

            <div className="form">
              
              <div className="inputArea">
                <label for="name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Excercise Name"
                  value={form.name}
                  onChange={handleOnInputChange}
                />
              </div>

              <div className="inputArea">
                <label for="category">Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="Excercise Category"
                  value={form.category}
                  onChange={handleOnInputChange}
                />
              </div>

              <div className="split-input">
               
                <div className="inputArea">
                  <label for="duration">Duration (min)</label>
                  <input
                    type="number"
                    name="duration"
                    min="1"
                    max="1000000"
                    value={form.duration}
                    onChange={handleOnInputChange}
                  />
                </div>

                <div className="inputArea">
                  <label for="duration">Intensity(1-10)</label>
                  <input
                    type="number"
                    name="intensity"
                    min="0"
                    max="10"
                    value={form.intensity}
                    onChange={handleOnInputChange}
                  />
                </div>

              </div>

              <button 
              className="submit"
              type="submit"
              disabled={isProcessing} 
              onClick={handleOnSubmit}
        
              >{isProcessing ? "Loading..." : "Save"}
              
              </button>
                

            </div>
          </div>
              
          
      </div>







  );





}