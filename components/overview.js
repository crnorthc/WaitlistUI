import { useEffect, useState } from 'react'

// Redux
import { connect } from "react-redux"
import PropTypes from "prop-types"

function Overview(props) {

	Overview.propTypes = {
        
	}

    const format_date = (ts) => {
        const date = new Date(parseInt(ts))
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }

	return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center w-full py-6 bg-slate-50 rounded-md">
                <div className="flex flex-row justify-between items-center w-full px-12">
                    <div className="w-1/2">
                        <h1 className='text-xl text-slate-600'>Name</h1>
                        <p className='text-slate-400 text-light'>
                            Your waitlist name shows up in dashboard for reference or if 
                            you're using our widget, to users when they sign up.
                        </p>
                    </div>  
                    <h1 className='text-xl text-slate-600'>{props.waitlist.name.S}</h1>      
                </div>
                <div className="flex flex-row justify-between items-center w-full px-12 mt-6">
                    <div className="w-1/2">
                        <h1 className='text-xl text-slate-600'>Created</h1>
                        <p className='text-slate-400 text-light'>
                            When your waitlist was created.
                        </p>
                    </div>  
                    <h1 className='text-xl text-slate-600'>{format_date(props.waitlist.created_at.N)}</h1>   
                </div>
                <div className="flex flex-row justify-between items-center w-full px-12 mt-6">
                    <div className="w-1/2">
                        <h1 className='text-xl text-slate-600'>Referral Jump</h1>
                        <p className='text-slate-400 text-light'>
                            When a user successfully refer a another user, they jump up on 
                            the waitlist. This setting allows you to specify how many spots they move.
                        </p>
                    </div>  
                    <h1 className='text-xl text-slate-600'>{props.waitlist.ref_num.N}</h1>   
                </div> 
                <div className="flex flex-row justify-between items-center w-full px-12 mt-6">
                    <div className="w-1/2">
                        <h1 className='text-xl text-slate-600'>API KEY</h1>
                        <p className='text-slate-400 text-light'>
                            This is your secret waitlist API key. Don't share this or expose 
                            this on your frontend.
                        </p>
                    </div>  
                    <h1 className='text-xl text-slate-600'>{props.waitlist.api_key.S}</h1>   
                </div> 
                <div className="flex flex-row justify-between items-center w-full px-12 mt-6">
                    <div className="w-1/2">
                        <h1 className='text-xl text-slate-600'>Origin URLS</h1>
                        <p className='text-slate-400 text-light'>
                            This should be the exact URL where your waitlist is placed. Remember 
                            to include http or https in the URL. If left empty, API call origins
                            will be unrestricted.
                        </p>
                    </div>
                    <div className="">
                        {props.waitlist.origin_urls.SS.length == 1 ? <h1 className='text-xl text-slate-600'>Any</h1>
                            :
                            props.waitlist.origin_urls.SS.map(url => <h1 className='text-xl text-slate-600'>{url}</h1>)
                        }
                    </div>
                </div>                
            </div>
        </div>
	)
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {  })(Overview)