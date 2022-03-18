import SearchPage from "./SearchPage";
import * as React from "react";

export default function SearchTab(props) {

    return (

        <SearchPage setResult={props.setResult}
                    searchInput={props.searchInput}
                    setString={props.setSearchInput}
                    searchFilter={props.searchFilter}
                    setSearchFilter={props.setSearchFilter}
                    setSearchInput={props.setSearchInput}
        />

    )
}