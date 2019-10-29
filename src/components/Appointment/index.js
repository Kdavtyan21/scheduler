import React from "react"
import "components/Appointment/styles.scss";
import { storiesOf } from "@storybook/react";
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import { action } from "@storybook/addon-actions/dist/preview";


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
.add("Appointment with Time", () => <Appointment time="12pm" />)
.add("Header", () => <Header time="12pm" />)
.add("Empty", () => <Empty onAdd={action("onAdd")} />)