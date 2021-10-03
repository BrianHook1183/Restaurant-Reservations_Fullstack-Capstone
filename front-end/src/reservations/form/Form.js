import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { today, formatAsTime } from "../../utils/date-time";
import {
  postReservation,
  updateReservation,
  getReservation,
} from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

/**
 * A controlled form used for creating and modifying reservations
 */

function Form({ method }) {
  const { reservation_id } = useParams();
  const [reservationsError, setReservationError] = useState(null);
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

  // load reservation details from url param and fill form
  useEffect(() => {
    //Avoids this warning from trying to conditionally run useEffect: " React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render  react-hooks/rules-of-hooks"
    if (method === "POST") return;

    const abortController = new AbortController();
    setReservationError(null);

    getReservation(reservation_id, abortController.signal)
      .then(setFormData)
      .catch(setReservationError);

    return () => abortController.abort();
  }, [reservation_id, method]);

  const handleChange = ({ target }) => {
    let value = target.value;

    // Fixes issue of *people* changing into a string
    if (target.name === "people" && typeof value === "string") {
      value = +value;
    }

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    method === "POST" ? submitNew() : submitEdit();
  };

  const submitNew = () => {
    const abortController = new AbortController();
    setReservationError(null);

    postReservation(formData, abortController.signal)
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(setReservationError);

    return () => abortController.abort();
  };

  const submitEdit = () => {
    const abortController = new AbortController();
    setReservationError(null);

    // removes properties from GET for error free PUT
    const trimmedFormData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      people: formData.people,
      mobile_number: formData.mobile_number,
      reservation_date: formData.reservation_date,
      reservation_time: formData.reservation_time,
    };

    updateReservation(reservation_id, trimmedFormData, abortController.signal)
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(setReservationError);

    return () => abortController.abort();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    // cancelling a new reservation while in progress sends user back to previous page.
    history.goBack();
  };

  return (
    <>
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
            required={true}
            min="1"
            value={formData.people}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button type="button" value="Cancel" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <ErrorAlert error={reservationsError} />
    </>
  );
}

export default Form;
