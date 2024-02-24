import { useState } from "react";
import { searchForShows } from './../api/tvmaze'

const Home = () => {

    const [SearchStr, setSearchStr] = useState(""); //passing empty string as default value
    const [apiData, setApiData] = useState(null)
    const [apiDataError, setApiDataError] = useState(null)

    const onSearchInputChange = (ev) => {
        setSearchStr(ev.target.value);
    }

    const onSearch = async (ev) => {
        ev.preventDefault();   // we can prevent the default behaviour of this event

        try {
            setApiDataError(null)
            const result = await searchForShows(SearchStr)
            setApiData(result)  // so whatever the result array is received in console, we will place it inside our API data state
            console.log(result)
        } catch (error) {
            setApiDataError(error)
        }

        // sent all the below code to tvmaze.js file
        // searchForShows(SearchStr)

        // const body = await apiGet(`/search/shows?q=${SearchStr}`)

        // fetch("https://api.tvmaze.com/search/shows?q=girls")
        // .then(response=>response.json())
        // .then(body=>console.log(body))     ... without using async function

        // const response = await fetch(`https://api.tvmaze.com/search/shows?q=${SearchStr}`)   // made the request as dynamic using ${}
        // const body = await response.json();
        // console.log(body)
    }

    const renderApiData = () => {
        if (apiDataError) {
            return <div>Error occured: {apiDataError.message}</div>
        }

        if (apiData) {
            return apiData.map((data) => <div key={data.show.id}>{data.show.name}</div>)
        }
        return null;  //null = nothing will be rendered inside the jsx markup
    }

    return (
        <div>
            <form onSubmit={onSearch}>
                {/* event handler for onSubmit is onSearch */}

                <input type="text" value={SearchStr} onChange={onSearchInputChange} />

                {/* event handler for onChange is onSearchInputChange */}

                <button type="submit">Search</button>
            </form>
            <div>
                {renderApiData()}
            </div>
        </div>
    )
}

export default Home;