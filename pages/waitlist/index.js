import { useEffect, useState } from 'react'

// Redux
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { createWaitlist, notify } from '../../store/actions/user'

function NewList(props) {
    const [name, setName] = useState()
    const [ref, setRef] = useState(5)
    const [url, setUrl] = useState()
    const [change, setChange] = useState(false)
    const [pause, setPause] = useState(false)
    const [urls, setUrls] = useState([''])

	NewList.propTypes = {
        createWaitlist: PropTypes.func.isRequired
	}

    const add_url = (
        <button onClick={() => setUrls([...urls, ''])} className='text-white text-xl font-bold px-2 h-7 rounded-full bg-sky-400 hover:bg-sky-300 ml-4'>
            +
        </button>
    )

    useEffect(() => {
        setUrl(handle_urls())
    }, [urls, change])

    const edit_url = (val, num) => {
        const new_urls = urls
        new_urls[num] = val
        setUrls(new_urls)
        setChange(!change)
    }

    const handle_urls = () => {
        var url_list = []

        for (let i = 0; i < urls.length; i++) {
            url_list.push(
                <div key={i} className="flex flex-row items-center w-full mt-2">
                    <input
                        type='text'
                        className='block border w-full p-3 rounded'
                        value={urls[i]}                       
                        onChange={(e) => edit_url(e.target.value, i)}
                        placeholder='https://'
                    /> 
                    {i == urls.length - 1 ? add_url : 
                        <button onClick={() => setUrls(urls.filter((_, x) => i != x))} className='flex flex-row items-center text-white text-2xl px-2 h-7 rounded-full bg-red-400 hover:bg-red-300 ml-4'>
                            -
                        </button>
                    }
                </div>
            )
        }
        return url_list
    }

    const handle_submit = async function() {
        if (!name) {
            notify('error', 'Waitlist must have name')
        }
        else {
            if (!pause) {
                setPause(true)
                const error = await props.createWaitlist(name, ref, urls)
                if (error) {
                    setPause(false)
                }   
            }            
        }
    }

	return (
		<div className="main">
            <div className="container flex flex-col items-center">
                <div className="flex flex-col items-center w-2/3 py-6 bg-white rounded-md">
                    <h1 className='text-3xl text-slate-600 mb-12'>New Waitlist</h1>
                    <div className="flex flex-row justify-between items-center w-full px-12">
                        <div className="w-1/2">
                            <h1 className='text-xl text-slate-600'>Name</h1>
                            <p className='text-slate-400 text-light'>
                                Your waitlist name shows up in dashboard for reference or if 
                                you're using our widget, to users when they sign up.
                            </p>
                        </div>  
                        <input
                            type='text'
                            className='block border w-full p-3 rounded w-1/3'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Waitlist Name'
                        />                      
                    </div>
                    <div className="flex flex-row justify-between items-center w-full px-12 mt-6">
                        <div className="w-1/2">
                            <h1 className='text-xl text-slate-600'>Referral Jump</h1>
                            <p className='text-slate-400 text-light'>
                                When a user successfully refer a another user, they jump up on 
                                the waitlist. This setting allows you to specify how many spots they move.
                            </p>
                        </div>  
                        <input
                            type='text'
                            className='block border w-full p-3 rounded w-1/3'
                            value={ref}
                            onChange={(e) => setRef(e.target.value)}
                            placeholder='Jumps'
                        />                      
                    </div>
                    <div className="flex flex-row justify-between w-full px-12 mt-6">
                        <div className="w-1/2">
                            <h1 className='text-xl text-slate-600'>Origin URLS <span className='text-slate-400'>(Optional)</span></h1>
                            <p className='text-slate-400 text-light'>
                                This should be the exact URL where your waitlist is placed. Remember 
                                to include http or https in the URL. If left empty, API call origins
                                will be unrestricted.
                            </p>
                        </div>
                        <div className="flex flex-col items-center w-1/3 pt-5">
                            {url}
                        </div>                                             
                    </div>
                </div>
                <button onClick={() => handle_submit()} className='mt-12 text-white rounded-xl bg-sky-600 py-2 px-6 hover:bg-sky-500'>Create</button>         
            </div>
		</div>
	)
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, { createWaitlist })(NewList)