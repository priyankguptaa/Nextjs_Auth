'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Signuppage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email:"",
        password:""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading,setLoading] = useState(false)

    const onLogin = async() => {
        try {
          if(buttonDisabled === false){
            setLoading(true)
            const response = await axios.post("api/users/login", user)
            console.log("Login success", response.data)
            router.push('/profile')
          }else{
            console.log("fill all 2 values")
          }
          } catch (error:any) {
            console.log("login", error.message)
            toast.error(error.message)
        }
    }
    
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 ){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])
    

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing":"login up"}</h1>
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
      onClick={onLogin}
      >{buttonDisabled ? "Please enter details": "login"}
      </button>
      <Link href='/signup'>Visit Signup page</Link>
    </div>
  )
}


