import Head from 'next/head'
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

	return (
		<div className="main">
			<Head>
				<title>Dashboard</title>
			</Head>
		</div>
	)
}

const mapStateToProps = (state) => ({
    logged_in: state.user.logged_in,
    user: state.user.user,
    waitlists: state.user.waitlists
})

export default connect(mapStateToProps, { getWaitlists })(Dashboard)