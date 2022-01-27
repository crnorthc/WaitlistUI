import Head from 'next/head'
import { useEffect } from 'react'
import Router from "next/router"

// Redux
import { connect } from "react-redux"
import PropTypes from "prop-types"

function Home(props) {

	Home.propTypes = {
		logged_in: PropTypes.bool,
	}

	useEffect(() => {
		if (!props.logged_in) {
			Router.push('/login')
		}
	}, [])


	return (
		<div className="">
			<Head>
				<title>Waitlist</title>
				<meta name="description" content="Waitlist API Dashboard" />
			</Head>

		</div>
	)
}

const mapStateToProps = (state) => ({
	logged_in: state.user.logged_in
})

export default connect(mapStateToProps)(Home)