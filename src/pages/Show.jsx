import { useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getShowById } from '../api/tvmaze'  // fetcher is getShowById
// import { useEffect, useState } from "react";


// custom react hook 
// const useShowByID = (showId) => {
//     // to put the data fetched using useEffect() inside state
//     const [showData, setShowData] = useState(null);
//     const [showError, setShowError] = useState(null);  // in case the request fails

//     useEffect(() => {

//         async function fetchData() {
//             try {
//                 const data = await (getShowById(showId))
//                 setShowData(data)
//             } catch (err) {
//                 setShowError(err);
//             }
//         }
//         fetchData();

//     }, [showId]); // to make it for every time every component mount (i.e, id)
//     return { showData, showError };
// };

const Show = () => {
    const { showId } = useParams();

    // const { showData, showError } = useShowByID(showId);
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