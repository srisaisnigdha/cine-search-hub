import { useEffect, useReducer } from "react";
import ShowCard from "./ShowCard";

const usePersistedReducer = (reducer, initialState, localStorageKey) => {
    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
        const persistedValue = localStorage.getItem(localStorageKey);

        // local storage always works only with strings, means 'persistedValue' here is a string
        return persistedValue ? JSON.parse(persistedValue) : initial;
    });

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(state))
    }, [state, localStorageKey]);

    return [state, dispatch]
}

const starredShowsReducer = (currentStarred, action) => {
    switch (action.type) {
        case 'STAR':
            return currentStarred.concat(action.showId);
        case 'UNSTAR':
            return currentStarred.filter((showId) => showId !== action.showId);
        default:
            return currentStarred
    }
}

const ShowGrid = ({ shows }) => {

    const [starredShows, dispatchStarred] = usePersistedReducer(starredShowsReducer, [], 'starredShows');
    // console.log({ starredShows })

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
                />)
        }
    </div>
}

export default ShowGrid;