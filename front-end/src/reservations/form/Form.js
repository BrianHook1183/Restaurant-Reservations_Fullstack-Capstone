import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { today, formatAsTime } from "../../utils/date-time";
import { postReservation } from "../../utils/api";

/**
 * Defines the reservation form.
 */

//TODO
/* 
  - this page must display any error messages returned from the API
  - 
*/

function Form() {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: formatAsTime(new Date().toTimeString()),
    people: 1,
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    const postedReservation = await postReservation(
      formData,
      abortController.signal
    );

    console.log("postedReservation:", postedReservation);

    // successful reservation submission redirects user to dashboard for the date of the new reservation.
    const urlDashboardDate = `/dashboard?date=${formData.reservation_date}`;
    history.push(urlDashboardDate);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    // cancelling a new reservation while in progress sends user back to previous page.
    history.goBack();
  };

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
          required={true}
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
          required={true}
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
          required={true}
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
          required={true}
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
          required={true}
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
          required={true}
          min="1"
        />
      </label>
      <br />
      <button type="submit">Submit</button>
      <button type="button" value="Cancel" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default Form;
