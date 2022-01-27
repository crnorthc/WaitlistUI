import Head from 'next/head'
import { useEffect, useState } from 'react'
import { login } from '../store/actions/user'
import Link from 'next/link'
import Router from 'next/router'

// Redux
import { connect } from "react-redux"
import PropTypes from "prop-types"



function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState()
    const [remember, setRemember] = useState(false)

	Login.propTypes = {
        login: PropTypes.func.isRequired,
		logged_in: PropTypes.bool,
	}

    useEffect(() => {
        const myUrl = new URL(window.location.href)
        const user_email = myUrl.searchParams.get('email')
        if (user_email) {
            setEmail(user_email)
        }
    }, [])

    const handleSubmit = () => {
        props.login(email, password)
    }

    useEffect(() => {
        if (props.logged_in) {
            Router.push('/')
        }
    })

	return (
		<div className="main">
			<Head>
				<title>Login</title>
			</Head>
            <div className="container flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-around bg-slate-400 w-1/2 rounded-xl mt-32 py-8">
                <h1 className='mb-8 text-4xl text-white'>Login</h1>
                    <form className='w-2/3'>
                        <input
                            type='text'
                            className='block border w-full p-3 rounded mb-4'
                            value={email}
                            autoComplete={email ? 'off' : 'email'}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                        />
                        <input
                            type='password'
                            className='block border w-full p-3 rounded mb-4'
                            value={password}
                            autoComplete='password'
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                        />
                    </form>      
                    <div className='flex pb-4 sm:pb-8 items-center'>
                        <input
                            type='checkbox'
                            onChange={() => setRemember(!remember)}
                            className='w-5 h-5 mr-2'
                        />
                        <span className='pt-1 text-lg text-white'>Remember Me</span>
                    </div>
                    <button
                        onClick={() => handleSubmit()}
                        type='submit'
                        className='w-1/3 text-white text-center py-3 rounded-2xl bg-violet-500 text-xl hover:bg-violet-400 my-1'
                    >
                        Login
                    </button>
                    <div className="flex flex-row text-white mt-2">
                        Don't have an account yet? 
                        <Link href='/signup'><a className='ml-2 hover:text-slate-600'>Signup</a></Link>
                    </div>
                </div>
            </div>
		</div>
	)
}

const mapStateToProps = (state) => ({
    logged_in: state.user.logged_in
})

export default connect(mapStateToProps, { login })(Login)