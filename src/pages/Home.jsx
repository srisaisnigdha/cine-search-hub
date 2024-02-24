import { useState } from "react";
import { searchForShows, searchForPeople } from './../api/tvmaze'
import SearchForm from "../components/SearchForm";

const Home = () => {


    const [apiData, setApiData] = useState(null)
    const [apiDataError, setApiDataError] = useState(null)

    // console.log(searchOption)



    const onSearch = async ({ q, searchOption }) => {

        try {
            setApiDataError(null)

            let result;

            if (searchOption === 'shows') {
                result = await searchForShows(q)
            }
            else {
                result = await searchForPeople(q)
            }

            setApiData(result)  // so whatever the result array is received in console, we will place it inside our API data state (update)
        }
        catch (error) {
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
            // here for people, we donot have .show method, instead it has .person
            return apiData[0].show ? apiData.map((data) => <div key={data.show.id}>{data.show.name}</div>) : apiData.map((data) => <div key={data.person.id}>{data.person.name}</div>)
        }
        return null;  //null = nothing will be rendered inside the jsx markup
    }

    return (
        <div>
            <SearchForm onSearch={onSearch} />
            <div>
                {renderApiData()}
            </div>
        </div>
    )
}

export default Home;