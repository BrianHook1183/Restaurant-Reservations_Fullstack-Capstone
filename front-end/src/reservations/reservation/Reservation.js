import React from "react";

function Reservation({
  reservation_id,
  first_name,
  last_name,
  mobile_number,
  reservation_time,
  people,
}) {
  return (
    <>
      <h4>
        {reservation_time} (party of {people})
      </h4>
      <p>
        Contact Details for {first_name} {last_name}: {mobile_number}
      </p>
    </>
  );
}

export default Reservation;
