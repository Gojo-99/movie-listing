import './NotFound404.css'

import errorimage from '../../img/Film rolls-rafiki 1.png'
import { Link } from 'react-router-dom'

const NotFound404 = () => {
    return (
        <div className='notfound'>
            <div className="error-block">
                <div className="image">
                    <img src={errorimage} />
                </div>

                <h1>Lost your way?</h1>
                <p>Oops! This is awkward.
                    You are looking for semething that 
                    doesn't actually exist. 
                </p>

                <Link to={'/'}>Go Home</Link>
            </div>
        </div>
    )
}

export default NotFound404
