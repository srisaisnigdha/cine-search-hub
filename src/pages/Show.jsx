import { useParams } from "react-router-dom"
import { getShowById } from '../api/tvmaze'
import { useEffect, useState } from "react";

const Show = () => {
    const { showId } = useParams();
    // to put the data fetched using useEffect() inside state
    const [showData, setShowData] = useState(null);
    const [showError, setShowError] = useState(null);  // in case the request fails

    useEffect(() => {

        async function fetchData() {
            try {
                const data = await (getShowById(showId))
                setShowData(data)
            } catch (err) {
                setShowError(err);
            }
        }
        fetchData();

    }, [showId]); // to make it for every time every component mount (i.e, id)


    // using conditional rendering to describe the data that we grab
    if (showError) {
        return <div>We have an error: {showError.message} </div>
    }
    if (showData) {
        return <div>Got Show data: {showData.name} </div>
    }

    return <div>Show Page for show{showId}</div>
}

export default Show