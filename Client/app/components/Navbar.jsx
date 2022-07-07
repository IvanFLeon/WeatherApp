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
  <nav className="border border-t-0 shadow rounded-lg rounded-t-none border-gray-200 w-screen flex justify-between flex-wrap py-3">
    <Link to="/" className="text-4xl px-5 font-medium self-center">Dashboard</Link>
    <Form action="/weather" onSubmit={handleSubmit} className="flex pt-2">
      <select name="searchtype" onChange={handleChange} ref={selectRef} className="self-center mx-3 px-3 py-2 rounded">
        <option value="city">City</option>
        <option value="zipcode">Zipcode</option>
      </select>
      <input type="text" name="q" placeholder={searchPlaceholder} className="px-3 border rounded h-10 w-full mr-3 self-center"></input>
    </Form>
  </nav>
  )
}