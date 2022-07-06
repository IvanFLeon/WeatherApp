import { Form, Link, useSubmit } from "@remix-run/react";
import { useRef, useState } from "react";

export default function Navbar() {
  const submit = useSubmit()
  const selectRef = useRef();
  const [searchPlaceholder, setSearchPlaceholder] = useState('Mexicali');

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    submit(formData, {action: "/weather"});
  }

  function handleChange(e) {
    setSearchPlaceholder(getPlaceholder(e.target.value));
  }

  function getPlaceholder(value) {
    switch(value) {
      case 'city':
        return 'Mexicali';
      case 'zipcode':
        return '21370,MX';
      default:
        return '';
    }
  }

  return (
  <div>
    <Link to="/">Dashboard</Link>
    <Form action="/weather" onSubmit={handleSubmit}>
      <select name="searchtype" onChange={handleChange} ref={selectRef}>
        <option value="city">City</option>
        <option value="zipcode">Zipcode</option>
      </select>
      <input type="text" name="q" placeholder={searchPlaceholder}></input>
    </Form>
  </div>
  )
}