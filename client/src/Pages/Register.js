import { useState } from 'react'
import { Logo, Input, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'


const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
    showAlert: false
}


const Register = () => {
    const [values, setValues] = useState(initialState)



    const onChangeHandler = (event) => {
        console.log(event.target)
        
        setValues({
           
        })

    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        console.log(event.target)
    }
    const toggleHandler = () => {
        setValues({ ...values, isMember: !values.isMember })
    }
    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmitHandler}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {values.showAlert && <Alert />}
                {/* name field */}
                {!values.isMember && <Input type='text' value={values.name} name='name' onChange={onChangeHandler} />}
                <Input type='email' value={values.email} name='email' onChange={onChangeHandler} />
                <Input type='password' value={values.password} name='password' onChange={onChangeHandler} />

                <button type='submit' className='btn btn-block'>
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