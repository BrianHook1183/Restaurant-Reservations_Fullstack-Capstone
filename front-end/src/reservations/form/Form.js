import React, { useEffect, useState } from "react";
// import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the reservation form.
 */

// TODO US-01 = /reservations/:reservation_id/new

function Form() {
  const initialFormState = {
    first_name: "",
    last_name: "",
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
  };

  //TODO
  /* 
  * First name: <input name="first_name" />
  * Last name: <input name="last_name" />
  ! Mobile number: <input name="mobile_number" />
  ! Date of reservation: <input name="reservation_date" />
  ! Time of reservation: <input name="reservation_time" />
  ! Number of people in the party, which must be at least 1 person. <input name="people" />
  */

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="first_name">
        Enter Your First Name:
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
        Enter Your Last Name:
        <input
          id="last_name"
          type="text"
          name="last_name"
          onChange={handleChange}
          value={formData.last_name}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
