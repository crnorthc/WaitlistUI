import Head from 'next/head'
import { useEffect, useState } from 'react'
import Router from "next/router"

// Redux
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { signup } from '../store/actions/user'

function Signup(props) {
    const [email, setEmail] = useState('')
    const [first_name, setFirst] = useState('')
    const [last_name, setLast] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [submitted, setSubmitted] = useState(false)

	Signup.propTypes = {
        signup: PropTypes.func.isRequired,
		logged_in: PropTypes.bool,
        user: PropTypes.object
	}

    const handleSubmit = () => {
        props.signup(email, password, first_name, last_name)
        setSubmitted(true)
    }   

    useEffect(() => {
        if (submitted && props.user) {
            Router.push('/login?email=' + props.user.email.S)
        }
    }, [submitted, props.user])

    // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
	return (
		<div className="main">
			<Head>
				<title>Signup</title>
			</Head>
            <div className="container flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-around bg-slate-400 w-1/2 rounded-xl mt-32 py-8">
                <h1 className='mb-8 text-4xl text-white'>Signup</h1>
                    <form className='w-2/3'>
                        <input
                            type='text'
                            className='block border w-full p-3 rounded mb-4'
                            value={first_name}
                            autoComplete='given-name'
                            onChange={(e) => setFirst(e.target.value)}
                            placeholder='First Name'
                        />
                        <input
                            type='text'
                            className='block border w-full p-3 rounded mb-4'
                            value={last_name}
                            autoComplete='family-name'
                            onChange={(e) => setLast(e.target.value)}
                            placeholder='Last Name'
                        />
                        <input
                            type='email'
                            className='block border w-full p-3 rounded mb-4'
                            value={email}
                            autoComplete='email'
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                        />
                        <input
                            type='password'
                            className='block border w-full p-3 rounded mb-4'
                            value={password}
                            autoComplete='new-password'                            
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                        />
                        <input
                            type='password'
                            className='block border w-full p-3 rounded mb-4'
                            value={password2}
                            autoComplete='new-password'                            
                            onChange={(e) => setPassword2(e.target.value)}
                            placeholder='Confirm Password'
                        />
                    </form>      
                    <button
                        onClick={() => handleSubmit()}
                        type='submit'
                        className='w-1/3 text-white text-center py-3 rounded-2xl bg-violet-500 text-xl hover:bg-violet-400 my-1'
                    >
                        Signup
                    </button>
                </div>
            </div>
		</div>
	)
}

const mapStateToProps = (state) => ({
    logged_in: state.user.logged_in,
    user: state.user.user
})

export default connect(mapStateToProps, { signup })(Signup)