import { useState } from "react";

const SearchForm = ({ onSearch }) => {

    const [SearchStr, setSearchStr] = useState(""); //passing empty string as default value
    const [searchOption, setSearchOption] = useState("shows")

    const onSearchInputChange = (ev) => {
        setSearchStr(ev.target.value);  // it is input string in the text-box
    }

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value);  // it is 'shows' or 'actors' // updating the searchOption state.
    }

    const onSubmit = (ev) => {
        ev.preventDefault();   // we can prevent the default behaviour of this event

        // const options = {
        //     q: SearchStr, searchOption
        // }
        // onSearch(options);

        onSearch({ q: SearchStr, searchOption });
    }
    return (
        <form onSubmit={onSubmit}>
            {/* event handler for onSubmit is onSearch */}

            <input type="text" value={SearchStr} onChange={onSearchInputChange} />

            {/* event handler for onChange is onSearchInputChange , it is updating the searchStr state.*/}

            <label>Shows
                <input type="radio" name="search-option" value="shows" checked={searchOption === 'shows'} onChange={onRadioChange} />
            </label>

            <label>Actors
                <input type="radio" name="search-option" value="actors" checked={searchOption === 'actors'} onChange={onRadioChange} />
            </label>

            <button type="submit">Search</button>
        </form>
    )
}

export default SearchForm;