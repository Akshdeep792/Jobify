import { useState, useEffect } from 'react'
import { Logo, Input, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import {useNavigate} from 'react-router-dom'
const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,

}


const Register = () => {
    const [values, setValues] = useState(initialState)
    const { user, isLoading, showAlert, displayAlert, registerUser } = useAppContext()
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })

    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        const { name, email, password, isMember } = values
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }
        const currentUser = {name,email, password};
        if(isMember){
            console.log("Already a member")
        }
        else{
            registerUser(currentUser)
        }
        console.log(values)
    }
    const toggleHandler = () => {
        setValues({ ...values, isMember: !values.isMember })
    }

    useEffect(() => {
        if(user){
            setTimeout(() => { 
                navigate('/')
            }, 3000)
        }
        
    }, [user, navigate])
    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmitHandler}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {showAlert && <Alert />}
                {/* name field */}
                {!values.isMember && <Input type='text' value={values.name} name='name' onChange={onChangeHandler} />}
                <Input type='email' value={values.email} name='email' onChange={onChangeHandler} />
                <Input type='password' value={values.password} name='password' onChange={onChangeHandler} />

                <button type='submit' className='btn btn-block' disabled={isLoading}>
                    submit
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}

                    <button type='button' onClick={toggleHandler} className='member-btn'>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register