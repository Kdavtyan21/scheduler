import { useEffect, useReducer } from "react";
import axios from "axios"
export default function useApplicationData (props) {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  
  function reducer(state, action) {
    const {appointments, day, interview, id, interviewers, type, days} = action
    switch (type) {
      case SET_DAY:
        return {
          ...state, day
        }
        case SET_APPLICATION_DATA:
          return { 
            ...state, days, appointments, interviewers 
          }
          case SET_INTERVIEW: {
            const appointment = {
              ...state.appointments[id],
              interview: { ...interview }
            };
            const appointments = {
              ...state.appointments,
              [id]: appointment
            };
            return { ...state, id, appointments }
          }
          default:
            throw new Error(
              `Tried to reduce with unsupported action type: ${type}`
              );
            }
          }
          
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
      dispatch({ type: SET_APPLICATION_DATA,days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
      console.log(all)
    }).catch(err => console.log(err))  
  }, []);  
  


  function cancelInterview(id, interview) {

   return axios({
    url: `/api/appointments/${id}`,
    data: interview,
    method: "DELETE"
   })
   .then(() => {
    dispatch({
type: SET_INTERVIEW, id, interview: null
    })
   })
    
  }


  function bookInterview(id, interview) {
   return axios({
     url: `/api/appointments/${id}`,
    data: {interview},
    method: "PUT"
   })
   .then(() => dispatch({ type: SET_INTERVIEW, id, interview }))
      
  }
return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}