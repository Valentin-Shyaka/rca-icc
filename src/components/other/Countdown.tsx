import { useState, useEffect } from "react";
import { BiBell } from "react-icons/bi";

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time: Number) => {
    return time < 10 ? `0${time}` : time;
  };

  const { days, hours, minutes, seconds } = timeLeft as any;

  if (!Object.keys(timeLeft).length) {
    return (
      <div>
        <p>It's time</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <span className=" text-center">
          ⚠️⚠️ BASTBALL FINAL IS COMMING ⚠️⚠️
        </span>
        <div className="flex items-center gap-x-3">
          <span className=" font-bold text-4xl">Y2 BC</span>
          <span className=" font-bold text-xl">vs</span>
          <span className=" font-bold text-4xl">Y3 BC</span>
        </div>
      </div>
      <div className=" flex justify-center w-full">
        <TimePart value={formatTime(days)} label="Days" />
        <TimePart value={formatTime(hours)} label="Hours" />
        <TimePart value={formatTime(minutes)} label="Minutes" />
        <TimePart value={formatTime(seconds)} label="Seconds" />
      </div>
      <p>🔥🔥 You don't wanna miss this. Will you? 🔥🔥</p>
      {/* <div className="flex w-full items-center justify-center gap-3">
        <span className=" text-center">I don't Wanna miss this. Please</span>
        <button
          onClick={() => {
            if (Notification.permission === "granted") {
              new Notification("Reminder", {
                body: "The event has started!",
              });
            } else if (Notification.permission !== "denied") {
              Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                  new Notification("Reminder", {
                    body: "The event has started!",
                  });
                }
              });
            }
          }}
          className=" text-orange flex items-center gap-x-2 py-2 rounded-md  w-fit"
        >
          <BiBell />
          Remind me
        </button>
      </div> */}
    </div>
  );
}

export default CountdownTimer;

const TimePart = ({
  value,
  label,
}: {
  value: string | Number;
  label: string;
}) => (
  <div className="flex flex-col items-center p-3">
    <span className=" text-6xl">{value.toString()}</span>
    <span className=" text-xl">{label}</span>
  </div>
);
