import React from "react"
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form"
import Status from "./Status";
import Confirm from "./Confirm"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment (props) {

  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
  }

  function ondelete(name, interviewer) {
    transition(DELETING)
    const interview = {
      student: name,
      interviewer
    };
    props.cancelInterview(props.id, interview).then(() => transition(EMPTY))
  }

  function onedit(name, interviewer) {
    transition(CREATE)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
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
  onCancel={() => back(EMPTY)}
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
  onCancel={onedit}
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
  onCancel={() => back(EMPTY)}
  onSave={save}
/>)}
    </article>
  )
}