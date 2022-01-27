import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Notify(props) {
	return (
		<div>
            {props.children}
            <ToastContainer 
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            />
        </div>
	)
}

export default Notify