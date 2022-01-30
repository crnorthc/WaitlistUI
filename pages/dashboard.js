import { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { getWaitlists } from '../store/actions/user'

// Redux
import { connect } from "react-redux"
import PropTypes from "prop-types"



function Dashboard(props) {
	Dashboard.propTypes = {
        getWaitlists: PropTypes.func.isRequired,
		logged_in: PropTypes.bool,
        user: PropTypes.object,
        waitlists: PropTypes.array
	}

    useEffect(() => {
        if (!props.waitlists) {
            props.getWaitlists()
        }
    }, [])

    const get_waitlists = () => {
        var waitlists = []

        for (let x in props.waitlists) {
            var waitlist = props.waitlists[x]

            waitlists.push(
                <button onClick={() => Router.push('/waitlist/' + waitlist.uid.S)} className="grid grid-cols-3 w-full py-4 text-left hover:bg-slate-50">
                    <h2 className="ml-10 text-slate-500">{waitlist.name.S}</h2>
                    <h2 className="ml-10 text-slate-500">{waitlist.length.N}</h2>
                    <h2 className="ml-10 text-slate-500">{waitlist.referrals.N}</h2>
                </button>
            )
        }

        return waitlists
    }

    const no_lists = (
        <div className="grid grid-cols-3 w-full py-4">
            <h2 className="ml-10 text-slate-500"> </h2>
            <h2 className="ml-10 text-slate-500"> </h2>
            <h2 className="ml-10 text-slate-500"> </h2>
        </div>
    )

	return (
		<div className="main">
            <div className="container flex flex-col items-center">
                <div className="w-2/3 bg-white rounded-md">
                    <div className="grid grid-cols-3 w-full py-4 border-b border-slate-200">
                        <h2 className="ml-10 text-gray-400">Waitlist</h2>
                        <h2 className="ml-10 text-gray-400">Signups</h2>
                        <h2 className="ml-10 text-gray-400">Referrals</h2>
                    </div>
                    {props.waitlists ? get_waitlists() : no_lists}
                </div>       
                <button className='mt-12 text-white rounded-xl bg-sky-600 py-2 px-4 hover:bg-sky-500'>Create New</button>         
            </div>
		</div>
	)
}

const mapStateToProps = (state) => ({
    logged_in: state.user.logged_in,
    user: state.user.user,
    waitlists: state.user.waitlists
})

export default connect(mapStateToProps, { getWaitlists })(Dashboard)