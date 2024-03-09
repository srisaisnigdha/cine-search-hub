import { useState, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchForShows, searchForPeople } from './../api/tvmaze'
import SearchForm from "../components/SearchForm";
import ShowGrid from "../components/shows/ShowGrid";
import ActorsGrid from "../components/actors/ActorsGrid";

const reducerFn = (currentCounter, action) => {
    // console.log({ currentCounter, action });

    switch (action.type) {
        case 'INCREMENT':
            return currentCounter + 1;
        case 'DECREMENT':
            return currentCounter - 1;
        case 'RESET':
            return 0;
        case 'SET_VALUE':
            return action.newCounterValue;
    }
    return 0;

}

const Home = () => {
    const [filter, setFilter] = useState('')

    const [counter, dispatch] = useReducer(reducerFn, 0)

    const onIncrement = () => {
        // setCounter(currentCounter => { currentCounter + 1 })  // using useState hook
        dispatch({ type: 'INCREMENT' });   //using useReducer hook, { type: 'INCREMENT' } - it is an action
    }
    const onDecrement = () => {
        // setCounter(currentCounter => { currentCounter - 1 })  // using useState hook
        dispatch({ type: 'DECREMENT' });
    }
    const onReset = () => {
        // setCounter(0)  // using useState hook
        dispatch({ type: 'RESET' });
    }
    const onSetToValue = () => {
        // setCounter(500)  // using useState hook
        dispatch({ type: 'SET_VALUE', newCounterValue: 500 });
    }

    const { data: apiData, error: apiDataError } = useQuery({
        queryKey: ['search', filter],
        queryFn: () => filter.searchOption === 'shows' ? searchForShows(filter.q) : searchForPeople(filter.q),

        enabled: !!filter,
        // filters here are query string(text in the search box) and searchOption (value for radio button)

        refetchOnWindowFocus: false
    })


    // const [apiData, setApiData] = useState(null)
    // const [apiDataError, setApiDataError] = useState(null)

    const onSearch = async ({ q, searchOption }) => {

        setFilter({ q, searchOption })

        // try {
        //     setApiDataError(null)

        //     let result;

        //     if (searchOption === 'shows') {
        //         result = await searchForShows(q)
        //     }
        //     else {
        //         result = await searchForPeople(q)
        //     }

        //     setApiData(result)  // so whatever the result array is received in console, we will place it inside our API data state (update)
        // }
        // catch (error) {
        //     setApiDataError(error)
        // }
    }

    const renderApiData = () => {
        if (apiDataError) {
            return <div>Error occured: {apiDataError.message}</div>
        }

        if (apiData?.length === 0) // fires only when some input is given. if no input, then this condition will not execute
        {
            return <div>No results</div>
        }

        if (apiData) {
            // here for people, we donot have .show method, instead it has .person
            return apiData[0].show ? <ShowGrid shows={apiData} /> : <ActorsGrid actors={apiData} />
        }
        return null;  //null = nothing will be rendered inside the jsx markup
    }

    return (
        <div>
            <SearchForm onSearch={onSearch} />
            <div>Counter:{counter}</div>
            <button type="button" onClick={onIncrement}>Increment</button>
            <button type="button" onClick={onDecrement}>Decrement</button>
            <button type="button" onClick={onReset}>Reset</button>
            <button type="button" onClick={onSetToValue}>Set to 500</button>

            <div>
                {renderApiData()}
            </div>
        </div>
    )
}

export default Home;