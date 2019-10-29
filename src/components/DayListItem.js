/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import "components/DayListItem.scss"
const classnames = require("classnames")


export default function DayListItem(props) {

  function formalSpots() {
    if(props.spots === 0) {
      return "no spots remaining"
    } else if (props.spots === 1) {
      return "1 spot remaining"
    } else {
      return `${props.spots} spots remaining`
    }
  }

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formalSpots()}</h3>
    </li>
  );
}
