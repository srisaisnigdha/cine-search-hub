import ShowCard from "./ShowCard";
import { useStarredShows } from "../../lib/useStarredShows";


const ShowGrid = ({ shows }) => {
    const [starredShows, dispatchStarred] = useStarredShows();

    const onStarMeClick = (showId) => {
        const isStarred = starredShows.includes(showId);

        if (isStarred) { // if the clicked show is in isStarred, then unstar it
            dispatchStarred({ type: 'UNSTAR', showId });
        }
        else {
            dispatchStarred({ type: 'STAR', showId });
        }
    };

    return <div>
        {
            // shows.map((data) => <div key={data.show.id}>{data.show.name}</div>)
            shows.map(
                (data) => <ShowCard key={data.show.id}
                    name={data.show.name}
                    image={data.show.image ? data.show.image.medium : '/not-found-image.png'}
                    id={data.show.id}
                    summary={data.show.summary}

                    onStarMeClick={onStarMeClick}
                    isStarred={starredShows.includes(data.show.id)}
                />)
        }
    </div>
}

export default ShowGrid;