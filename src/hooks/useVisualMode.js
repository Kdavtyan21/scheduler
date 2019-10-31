import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  function transition (newMode, replace = false) {
    if(!replace) {
    setHistory(prev => [...prev, mode])
  }
  setMode(newMode)
}
  function back (numBack) {
    if(!numBack) {
      numBack = 1
    }
    if(history.length >= numBack) {
    setMode(history[history.length - numBack])
    setHistory(prev => [...prev.slice(0, -1 * numBack)])
  } }
  return { mode, transition, back,
    onChange: (event) => setMode(event.target.mode)
  };
}

