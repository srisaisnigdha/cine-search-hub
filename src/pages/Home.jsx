import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchForShows, searchForPeople } from './../api/tvmaze'
import SearchForm from "../components/SearchForm";
import ShowGrid from "../components/shows/ShowGrid";
import ActorsGrid from "../components/actors/ActorsGrid";
import { TextCenter } from '../components/common/TextCenter'

const Home = () => {
    const [filter, setFilter] = useState('')

    const { data: apiData, error: apiDataError } = useQuery({
        queryKey: ['search', filter],
        queryFn: () => filter.searchOption === 'shows' ? searchForShows(filter.q) : searchForPeople(filter.q),

        enabled: !!filter,
        // filters here are query string(text in the search box) and searchOption (value for radio button)

        refetchOnWindowFocus: false
    })

    const onSearch = async ({ q, searchOption }) => {
        setFilter({ q, searchOption })
    }

    const renderApiData = () => {
        if (apiDataError) {
            return <TextCenter>Error occured: {apiDataError.message}</TextCenter>
        }

        if (apiData?.length === 0) // fires only when some input is given. if no input, then this condition will not execute
        {
            return <TextCenter>No results</TextCenter>
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
            <div>
                {renderApiData()}
            </div>
        </div>
    )
}

export default Home;