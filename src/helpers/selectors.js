
export function getAppointmentsForDay(state, day) {
if (state.days.length === 0) {
  return []
}
  const filteredDays = state.days.find(dayObj => dayObj.name === day);
  if (!filteredDays) {
    return []
  }
  const filteredDaysId = filteredDays.appointments.map(appointmentId => state.appointments[appointmentId])
if(filteredDays.appointments.length === 0) {
return [];
} else {
  return filteredDaysId;
}
}

export function getInterview(state, interview) {
if (!interview) {
  return null
}
  const student = interview.student
  const interviewer = state.interviewers[interview.interviewer]
  const interviewerObj = { student, interviewer }

  return interviewerObj

}

