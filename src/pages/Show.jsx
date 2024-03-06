import { useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getShowById } from '../api/tvmaze'  // fetcher is getShowById

const Show = () => {
    const { showId } = useParams();
    const { data: showData, error: showError } = useQuery({
        queryKey: ['show', showId],
        queryFn: () => getShowById(showId),
    })

    useQuery
    if (showError) { // using conditional rendering to describe the data that we grab
        return <div>We have an error: {showError.message} </div>
    }
    if (showData) {
        return <div>Got Show data: {showData.name} </div>
    }

    return <div>Show Page for show{showId}</div>
}

export default Show