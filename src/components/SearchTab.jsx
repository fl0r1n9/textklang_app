import SearchPage from "./SearchPage";
import * as React from "react";

export default function SearchTab(props) {

    return (

        <SearchPage
                    searchInput={props.searchInput}
                    setString={props.setSearchInput}
                    searchFilter={props.searchFilter}
                    setSearchFilter={props.setSearchFilter}
                    setSearchInput={props.setSearchInput}
                    conditions={props.conditions}
                    setConditions={props.setConditions}
        />

    )
}