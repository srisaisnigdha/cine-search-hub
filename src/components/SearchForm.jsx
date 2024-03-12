import { useState } from "react";
import { useSearchStr } from "../lib/useSearchStr";
import CustomRadio from './CustomRadio'

const SearchForm = ({ onSearch }) => {

    const [SearchStr, setSearchStr] = useSearchStr();
    const [searchOption, setSearchOption] = useState("shows")

    const onSearchInputChange = (ev) => {
        setSearchStr(ev.target.value);
    }

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        onSearch({ q: SearchStr, searchOption });
    }
    return (
        <form onSubmit={onSubmit}>

            <input type="text" value={SearchStr} onChange={onSearchInputChange} />

            <CustomRadio
                label="Shows" name="search-option" value="shows" checked={searchOption === 'shows'} onChange={onRadioChange}
            />

            <CustomRadio
                label="Actors" name="search-option" value="actors" checked={searchOption === 'actors'} onChange={onRadioChange}
            />

            <button type="submit">Search</button>
        </form>
    )
}

export default SearchForm;