import './SuggestMe.css'

import search from "../../img/Left Icon.png"

const SuggestMe = () => {
    return (
        <div className='suggestme'>
            <div className="section">
                <div className="suggest-block">
                    <h1>Suggest me</h1>
                    <p>
                        I will really appericiate 
                        it if you take time to 
                        suggest me something good to watch.
                    </p>

                    <div className="inline-block">
                        <div className='input-box'>
                            <img src={search} alt='search' />
                            <input
                                type='search'
                                placeholder='Search Anime'
                            />
                        </div>

                        <button>Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestMe
