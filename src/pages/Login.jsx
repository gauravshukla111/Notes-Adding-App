import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {login} = useAuth();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const response = await axios.post('https://daily-task-app-b1cv.onrender.com/api/auth/login', { email, password})
            if(response.data.success){
              login(response.data.user)
                localStorage.setItem("token", response.data.token)
                navigate('/')
            }
            console.log(response)
        }catch(error){
            console.log(error)

        }

    }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <label className='block text-gray-700' htmlFor="email">Email</label>
            <input type="email" className='w-full px-3 py-2 border' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div>
            <label className='block text-gray-700' htmlFor="password">Password</label>
            <input type="password" className='w-full px-3 py-2 border' placeholder='********' onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <div className='mt-4'>
        <button type='submit' className='w-full bg-teal-600 text-white py-2'>Login</button>
        <p className='text-center mt-1'>Don't Have Account? <Link to="/register">Register</Link></p>
        </div>
        
      </form>

        </div>
      
    </div>
  )
}

export default Login





