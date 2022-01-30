import "../styles/globals.css"
import { Provider } from "react-redux"
import { store } from "../store/store"
import Notify from "../components/Notify"
import Nav from "../components/Nav"
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Head>
				<title>Queue API</title>
				<link rel='shortcut icon' type='image/svg' href='../logo_icon.svg' />
			</Head>
			
			<Nav />
			<Notify>
				<Component {...pageProps} />
			</Notify>
		</Provider>
	)
}

export default MyApp
