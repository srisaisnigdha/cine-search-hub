import { useState } from "react";

const Home = () => {
    // return (<div>Home Page</div>)

    const [SearchStr, setSearchStr] = useState(""); //passing empty string as default value

    const onSearchInputChange = (ev) => {
        setSearchStr(ev.target.value);
    }

    const onSearch = async (ev) => {
        ev.preventDefault();   // we can prevent the default behaviour of this event

        // fetch("https://api.tvmaze.com/search/shows?q=girls")
        // .then(response=>response.json())
        // .then(body=>console.log(body))     ... without using async function

        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${SearchStr}`)   // made the request as dynamic using ${}
        const body = await response.json();
        console.log(body)
    }

    return (
        <div>
            <form onSubmit={onSearch}>
                {/* event handler for onSubmit is onSearch */}
                <input type="text" value={SearchStr} onChange={onSearchInputChange} />
                {/* event handler for onChange is onSearchInputChange */}
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default Home;