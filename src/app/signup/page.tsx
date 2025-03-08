'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Signuppage() {
    const router = useRouter()
    const [user, setUser] = useState({
        username:"",
        email:"",
        password:""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading,setLoading] = useState(false)

    const onSignup = async() => {
        try {
          if(buttonDisabled === false){
            setLoading(true)
            const response = await axios.post("api/users/signup", user)
            console.log("signup success", response.data)
            router.push('/login')
          }else{
            console.log("fill all 3 values")
          }
          } catch (error:any) {
            console.log("signup failed", error.message)
            toast.error(error.message)
        }
    }
    
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])
    

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
       <div>
    
      
    </div>
      <h1>{loading ? "Processing":"SignUp"}</h1>
      <label htmlFor="username">username</label>
      <input
        className='p-2 border border-white-300 mb-4 text-white rounded-lg'
        type="text"
        id='username'
        value={user.username}
        onChange={(e)=>setUser({...user, username: e.target.value})}
        placeholder='username'
      />
      <label htmlFor="email">email</label>
      <input
        className='p-2 border border-white-300 mb-4 text-white rounded-lg'
        type="email"
        id='email'
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder='email'
      />
      <label htmlFor="password">password</label>
      <input
        className='p-2 border border-gray-300 mb-4 text-white rounded-lg'
        type="text"
        id='password'
        value={user.password}
        onChange={(e)=>setUser({...user, password: e.target.value})}
        placeholder='password'
      />
      <button
      className='p-2 mb-4 border border-gray-300 rounded-lg'
      onClick={onSignup}
      >{buttonDisabled ? "Please enter details": "signup"}
      </button>
      <Link href='/login'>Visit login page</Link>
    </div>
  )
}


