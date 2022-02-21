import React from "react";

export default class Condition {

    constructor(first, func, entity, where, searchString) {
        this.first = first;
        this.func = func;
        this.entity = entity;
        this.where = where;
        this.searchString = searchString;

    }


}

//TODO:
/*

const result = poems.filter(poem.text => {
    return "string" in poem = true;
}).map(poem)
*/
