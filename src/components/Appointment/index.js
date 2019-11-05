import React from "react"
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form"
import Status from "./Status";
import Confirm from "./Confirm"
import Error from "./Error";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_ADD = "ERROR_ADD";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment (props) {

  function save(name, interviewer) {
    if(name && interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_ADD))
  }
  else {
    transition(ERROR_ADD)
  }
}

  function ondelete(name, interviewer) {
    transition(DELETING)
    const interview = {
      student: name,
      interviewer
    };
    props
    .cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE))
  }


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment"> 
    <Header time= {props.time} />
{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={() => transition(CONFIRM)}
    onEdit={() => transition(EDIT)}
  />
)}
{mode === CREATE && (<Form interviewers=
  {props.interviewers} 
  value={[]} 
  interviewer={[]} 
  setInterviewer={[]}
  onCancel={() => back()}
  onSave={save}
/>)}
{mode === SAVING && (
  <Status
  message="SAVING"
  />
)} 
{mode === CONFIRM && (
  <Confirm
  message="You sure?"
  onConfirm={ondelete}
  onCancel={() => back()}
  />
)}
{mode === DELETING && (
  <Status
  message="DELETING"
  />
)}
{mode === EDIT && (<Form 
  interviewers= {props.interviewers} 
  name={props.interview.student} 
  interviewer={props.interview.interviewer.id} 
  setInterviewer={[]}
  onCancel={() => back()}
  onSave={save}
/>)}
{mode === ERROR_DELETE && (
  <Error
  message="CANT DELETE IT FOOL!"
  onClose={() => transition(SHOW)}
  />
)}
{mode === ERROR_ADD && (
  <Error
  message="CANT CREATE IT FOOL!"
  onClose={() => transition(EMPTY)}
  />
)}
    </article>
  )
}