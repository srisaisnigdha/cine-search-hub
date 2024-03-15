import ShowCard from "./ShowCard";
import { FlexGrid } from '../common/FlexGrid';
import { useStarredShows } from "../../lib/useStarredShows";
import NotFoundImgSrc from '../../lib/not-found-image.png';


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

    return <FlexGrid>
        {
            // shows.map((data) => <div key={data.show.id}>{data.show.name}</div>)
            shows.map(
                (data) => <ShowCard key={data.show.id}
                    name={data.show.name}
                    image={data.show.image ? data.show.image.medium : NotFoundImgSrc}
                    id={data.show.id}
                    summary={data.show.summary}

                    onStarMeClick={onStarMeClick}
                    isStarred={starredShows.includes(data.show.id)}
                />)
        }
    </FlexGrid>
}

export default ShowGrid;