import React from "react"
import "components/Appointment/styles.scss";
import { storiesOf } from "@storybook/react";

export default function Appointment (props) {
  return (
    <article className="appointment"></article>
  )
}

storiesOf("Appointment", module)
.addParameters({
  backgrounds: [{ name: "white", value: "#fff", default: true }]
})
.add("Appointment", () => <Appointment />)
.add("Appointment with Time", () => <Appointment time="12pm" />);