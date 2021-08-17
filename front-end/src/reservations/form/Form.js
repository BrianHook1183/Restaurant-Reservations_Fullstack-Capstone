import React, { useState } from "react";

/**
 * Defines the reservation form.
 */

function Form() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: new Date(),
    reservation_time: new Date(),
    people: 1,
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", formData);
    setFormData({ ...initialFormState });
    //TODO display the /dashboard page for the date of the new reservation
  };

  const handleCancel = (event) => {
    event.preventDefault();
    console.log("Cancelled. Sending you back to previous page");
    //TODO add browserRouter and use goBack()
  };

  //TODO
  /* 
  * First name: <input name="first_name" />
  * Last name: <input name="last_name" />
  * Mobile number: <input name="mobile_number" />
  * Date of reservation: <input name="reservation_date" />
  * Time of reservation: <input name="reservation_time" />
  * Number of people in the party,  <input name="people" />
  TODO which must be at least 1 person.
  */

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="first_name">
        First Name:
        <input
          id="first_name"
          type="text"
          name="first_name"
          onChange={handleChange}
          value={formData.first_name}
        />
      </label>
      <br />
      <label htmlFor="last_name">
        Last Name:
        <input
          id="last_name"
          type="text"
          name="last_name"
          onChange={handleChange}
          value={formData.last_name}
        />
      </label>
      <br />
      <label htmlFor="mobile_number">
        Mobile Number:
        <input
          id="mobile_number"
          type="text"
          name="mobile_number"
          onChange={handleChange}
          value={formData.mobile_number}
        />
      </label>
      <br />
      <label htmlFor="reservation_date">
        Reservation Date:
        <input
          id="reservation_date"
          type="date"
          name="reservation_date"
          onChange={handleChange}
          value={formData.reservation_date}
        />
      </label>
      <br />
      <label htmlFor="reservation_time">
        Reservation Time:
        <input
          id="reservation_time"
          type="time"
          name="reservation_time"
          onChange={handleChange}
          value={formData.reservation_time}
        />
      </label>
      <br />
      <label htmlFor="people">
        Party Size:
        <input
          id="people"
          type="number"
          name="people"
          onChange={handleChange}
          value={formData.people}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
      <input type="button" value="Cancel" onClick={handleCancel}></input>
    </form>
  );
}

export default Form;
