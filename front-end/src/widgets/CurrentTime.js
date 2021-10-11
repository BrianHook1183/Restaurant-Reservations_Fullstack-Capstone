import React, { useEffect, useState } from "react";
import { formatAsTime } from "../utils/date-time";

/**
 * Returns a live clock in 24-hour format that is updated every minute
 */

function CurrentTime({ sectionTitle }) {
  const [time, setTime] = useState(new Date().toTimeString());
  const timeFormatted = formatAsTime(time);

  const getTime = () => {
    const timeString = new Date().toTimeString();
    setTime(timeString);
  };

  useEffect(() => {
    getTime();
    const interval = setInterval(() => {
      getTime();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="row text-white">
      <div className="col pl-3">{sectionTitle}</div>
      <div className="col pr-4 text-right">
        <span className={"oi oi-clock"} />
        &nbsp;{timeFormatted}
      </div>
    </div>
  );
}

export default CurrentTime;
