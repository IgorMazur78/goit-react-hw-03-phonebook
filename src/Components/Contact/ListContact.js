import React from "react";

import style from "./Listcontact.module.css"


export default function ListContact({ contact, onDeleteContact }) {
  return (
    <ul>
      {contact.map(({id,name,number}) => (
        <li key={id}><span>{name}:{number}</span>
          
          <button className = {style.buttonDeleteContact} onClick={() => onDeleteContact(id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
