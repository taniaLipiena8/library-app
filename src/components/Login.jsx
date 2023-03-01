import { useState, useEffect } from "react";
import axios from "axios";
import api from'../api/base'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit= async (e)=>{
        e.preventDefault()
        
        try {
            const response = await api.post('/perpustakaan/api/v1/user/login',{
                email : email,
                password : password
            })

            if(response.data.code === 200){
                setUser(response.data.data)
                localStorage.setItem('username', response.data.data.username)
                localStorage.setItem('user_id', response.data.data.user_id)
                setEmail('')
                setPassword('')
                console.log(response.data.data);
                navigate('/book')
            } else {
                alert('gagal login')
            }
            console.log(response.data.message);
        } catch ( err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div className="login">
            <h2> Login</h2>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input id="password" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit"> Submit </button>
            </form>
        </div>
    );
}

export default Login;