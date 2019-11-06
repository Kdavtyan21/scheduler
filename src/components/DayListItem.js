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
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className={"text--regular"} >{props.name}</h2>
      <h3 className={"text--light"}>{formalSpots()}</h3>
    </li>
  );
}
