import { useEffect, useReducer } from "react";
import axios from "axios"
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData (props) {

  
  
          const [state, dispatch] = useReducer( reducer, {
            day: "Monday",
            days: [],
            appointments: {},
            interviewers: {}
        });
          const setDay = day => dispatch({ type: SET_DAY, day});
          
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
      
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
    }).catch(err => console.log(err))  
  }, []);  
  
  function spotsForDay(appointments, days, day) {
    const oneDay = days.find(target => 
      target.name === day.name);
      const listOfAppointments = [...oneDay.appointments];
      const totalSpots = listOfAppointments.length;
      const spreadApp = {...appointments};

      const filledSpots = Object.values(spreadApp).reduce(
        (total, appointment) => {
          if (listOfAppointments.includes(appointment.id)) {
            if(appointment.interview) {
              return total + 1
            }
          }
          return total
        }, 0
      );
      return totalSpots - filledSpots
  }

  function cancelInterview(id) {

   return axios.delete(`/api/appointments/${id}`)
   .then(() => { 
    dispatch({
type: SET_INTERVIEW, id, interview: null 
    })
   })   
  }


  function bookInterview(id, interview) {
   return axios.put(`/api/appointments/${id}`, {interview})
  .then(() => dispatch({ type: SET_INTERVIEW, id, interview }))
  .catch((err) => {throw new Error(err)})
  }
return {
  state,
  setDay,
  bookInterview,
  cancelInterview,
  spotsForDay
}
}