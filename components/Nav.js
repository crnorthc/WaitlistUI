import { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { check_cookie } from '../store/actions/user'

// Redux
import { connect } from "react-redux"
import PropTypes from "prop-types"


function Nav(props) {
    const [path, setPath] = useState('/')

	Nav.propTypes = {
        check_cookie: PropTypes.func.isRequired,
		logged_in: PropTypes.bool,
        user: PropTypes.object,
        waitlists: PropTypes.array
	}

    useEffect(() => {
        setPath(window.location.pathname)
    }, [props.location])

    useEffect(() => {
        if (!props.logged_in) {
            props.check_cookie()
        }
    }, [props.logged_in])

	return (
		<div className="relative flex flex-row justify-between items-center w-full top-0 bg-white py-4 mb-10 px-10">
            <img src='../logo.svg' className='w-24' />
            {props.logged_in ?
                <span>
                    <Link href='/dashboard'>
                        <span className={'font-light text-slate-400 cursor-pointer ' + `${path == '/dashboard' ? 'border-b border-slate-300' : null}`}>Dashboard</span>
                    </Link>
                    <Link href='/profile'>
                        <span className={'font-light text-slate-400 cursor-pointer ml-8 ' + `${path == '/profile' ? 'border-b border-slate-300' : null}`}>Profile</span>
                    </Link>
                </span>          
            :
                <span>
                    <Link href='/login'>
                        <span className={'font-light text-slate-400 cursor-pointer ' + `${path == '/login' ? 'border-b border-slate-300' : null}`}>Login</span>
                    </Link>
                    <Link href='/signup'>
                        <span className={'font-light text-slate-400 cursor-pointer ml-8 ' + `${path == '/signup' ? 'border-b border-slate-300' : null}`}>Signup</span>
                    </Link>
                </span>
            }  
		</div>
	)
}

const mapStateToProps = (state) => ({
    logged_in: state.user.logged_in,
    user: state.user.user,
    waitlists: state.user.waitlists
})

export default connect(mapStateToProps, { check_cookie })(Nav)