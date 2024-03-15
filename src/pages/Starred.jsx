import { useQuery } from "@tanstack/react-query";
import { useStarredShows } from "../lib/useStarredShows";
import { getShowsByIds } from "../api/tvmaze";
import ShowGrid from "../components/shows/ShowGrid";
import { TextCenter } from '../components/common/TextCenter'

const Starred = () => {
    const [starredShowsIds] = useStarredShows();

    const { data: starredShows, error: starredShowsError } = useQuery({
        queryKey: ['starred', starredShowsIds],
        queryFn: () => getShowsByIds(starredShowsIds).then(result =>
            result.map(show => ({ show }))
            // nested the shows data that we received from getShowsByIds inside 'show' keyword, so that it matches with the logic structure present in the showGrid to display
        ),
        refetchOnWindowFocus: false
    });

    // applying conditional redering to display data
    if (starredShows?.length === 0) {
        return <TextCenter>No shows were starred</TextCenter>
    }

    // if (starredShows && starredShows.length > 0)   ==  if (starredShows?.length > 0) 
    if (starredShows?.length > 0) {
        return <ShowGrid shows={starredShows} />
    }

    if (starredShowsError) {
        return <TextCenter>Error occured: {starredShowsError.message} </TextCenter>
    }

    return <TextCenter>Shows are loading</TextCenter>
}

export default Starred;