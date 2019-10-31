import { useState, useEffect } from "react";
import axios from "axios"
export default function useApplicationData (props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({...state, day});



  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
      
    ]).then((all) => {
      setState(prev => ({ ...prev,days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      console.log(all)
    }).catch(err => console.log(err))  
  }, []);  
  


  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

   return axios({
    url: `/api/appointments/${id}`,
    data: null,
    method: "DELETE"
   })
   .then(() => {
    setState({
      ...state,
      appointments
    })
   })
    
  }


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   return axios({
     url: `/api/appointments/${id}`,
    data: appointment,
    method: "PUT"
   })
   .then(() => setState({
    ...state,
    appointments
  }))
      
  }
return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}