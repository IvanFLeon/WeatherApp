import { Form, Link, useSubmit } from "@remix-run/react";

export default function Navbar() {
  const submit = useSubmit()

  function handleChange(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    submit(formData, {action: "/weather"});
  }

  return (
  <div>
    <Link to="/">Dashboard</Link>
    <Form action="/weather" onSubmit={handleChange}>
      <input type="text" name="city"></input>
    </Form>
  </div>
  )
}