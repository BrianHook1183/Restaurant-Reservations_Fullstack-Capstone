import React, { useEffect, useState } from "react";
import { formatAsTime } from "../utils/date-time";

/**
 * Returns a live clock in 24-hour format that is updated every minute
 */

function CurrentTime() {
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
    <div className="text-center text-white m-0 text-monospace">
      Current Time: <span className="oi oi-clock mr-2" />
      {timeFormatted}
    </div>
  );
}

export default CurrentTime;
