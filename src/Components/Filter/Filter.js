import React from "react";

import style from "./Filter.module.css"

export default function Filter({value, onChange}) {
  return (
    <form className = {style.filter}>
      <h2>Filter Contacts</h2>
      <input
      className = {style.filterInput
      }
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
        
      />
    </form>
  );
}
