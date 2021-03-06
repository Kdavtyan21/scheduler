import React from "react";
import "components/InterviewerListItem.scss"
const classnames = require("classnames")


export default function InterviewerListItem(props) {
 const interviewerItemClass =  classnames("interviewers__item", {
   "interviewers__item--selected": props.selected
 })
return (
  <li className={interviewerItemClass} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
);
}