import "./Login.css"

import poster from "../../img/UEROHP.jpg"

import emails from "../../img/email.png"
import pass from "../../img/pass.png"
import eye from "../../img/eye.png"
import { useEffect, useState } from "react"

const Register = () => {
    const [showPass, setShowPass] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Email cant be empty')
    const [passwordError, setPasswordError] = useState('Password cant be empty')
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('This email is not correct')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 8) {
            setPasswordError('The password must be longer than 3 and less than 8')
        } else {
            setPasswordError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    return (
        <div className='login'>
            <div className="section">
                <div className="poster-block">
                    <img src={poster} alt="" />
                </div>

                <form>
                    <h1>Login</h1>
                    
                    {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
                    {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
                    <div className="inputs">
                        <div className="email-inp">
                            <img src={emails} alt="" />
                            <input onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name='email' type="text" placeholder="Email"/>
                        </div>
                        
                        <div className="pass-inp">
                            <img src={pass} alt="" />
                            <input onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name='password' type={!showPass ? 'text' : 'password'} placeholder="Password"/>
                            <img onClick={() => setShowPass(!showPass)} src={eye} alt="" />
                        </div>
                    </div>

                    <button disabled={!formValid} type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Register
