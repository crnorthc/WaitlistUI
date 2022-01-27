import "../styles/globals.css"
import { Provider } from "react-redux"
import { store } from "../store/store"
import Notify from "../components/Notify"

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Notify>
				<Component {...pageProps} />
			</Notify>
		</Provider>
	)
}

export default MyApp
