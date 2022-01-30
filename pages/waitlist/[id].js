import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Router, useRouter } from "next/router"
import Overview from '../../components/overview'
import Signups from '../../components/signups'

// Redux
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getSignups, deleteSignups } from '../../store/actions/user'



function Waitlist(props) {
    const [tab, setTab] = useState('overview')
    const [ID, setID] = useState()
    const [waitlist, setWaitlist] = useState()
    const router = useRouter();

	Waitlist.propTypes = {
        getSignups: PropTypes.func.isRequired,
        deleteSignups: PropTypes.func.isRequired,
        waitlists: PropTypes.array
	}    

    useEffect(() => {
        if (!router.isReady) return

        if (!props.waitlists) {
            router.push('/dashboard')
            return
        }

        setWaitlist(
            ...props.waitlists.filter(list => list.uid.S == router.query.id)
        )
        setID(router.query.id)
    }, [router.isReady])

    useEffect(() => {
        if (!waitlist) return 

        if (!waitlist.signups) {
            props.getSignups(ID)
        }
    }, [ID])

    const handle_delete = async function(emails) {
        await props.deleteSignups(emails, ID)
        setWaitlist(
            ...props.waitlists.filter(list => list.uid.S == router.query.id)
        )
        Promise.resolve()
    }

	return (
		<div className="main">
            <div className="container flex flex-row bg-white rounded-lg">
                <div className="flex flex-col items-start border-r border-slate-400 w-1/5 pt-8 pl-8">
                    <button onClick={() => setTab('overview')} className={'text-xl font-light pb-2 mb-6 text-slate-600' + `${tab == 'overview' ? ' border-b-2 border-slate-400' : ''}`}>Overview</button>
                    <button onClick={() => setTab('signups')} className={'text-xl font-light pb-2 mb-6 text-slate-600' + `${tab == 'signups' ? ' border-b-2 border-slate-400' : ''}`}>Signups</button>
                    <button onClick={() => setTab('stats')} className={'text-xl font-light pb-2 mb-6 text-slate-600' + `${tab == 'stats' ? ' border-b-2 border-slate-400' : ''}`}>Statistics</button>
                    <button onClick={() => setTab('off')} className={'text-xl font-light pb-2 mb-6 text-slate-600' + `${tab == 'off' ? ' border-b-2 border-slate-400' : ''}`}>Offboard</button>
                </div>
                {waitlist ? 
                    tab == 'overview' ? <Overview waitlist={waitlist} /> : 
                    tab == 'signups' ? <Signups waitlist={waitlist} delete={handle_delete} /> : null
                    : null
                }
            </div>
		</div>
	)
}

const mapStateToProps = (state) => ({
    waitlists: state.user.waitlists
})

export default connect(mapStateToProps, { getSignups, deleteSignups })(Waitlist)