import { useEffect, useState } from "react";
import "./DelieveryPrefrence.css";

/* 🕒 ALL SLOTS */
const TIME_SLOTS = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "01:00 PM - 03:00 PM",
  "03:00 PM - 05:00 PM",
  "05:00 PM - 07:00 PM",
  "07:00 PM - 09:00 PM",
];

/* ❌ SLOT AVAILABILITY (example – backend se aa sakta hai) */
const UNAVAILABLE_SLOTS = {
  today: ["09:00 AM - 11:00 AM"],
  tomorrow: [],
};

export default function DeliveryPreference({ onChange }) {
  const [mode, setMode] = useState("instant"); // default
  const [day, setDay] = useState("today");
  const [slot, setSlot] = useState(null);

  /* ⚡ Instant ETA (minutes) */
  const ETA_MIN = 25;
  const ETA_MAX = 35;

  /* 🔄 SEND BACKEND READY DATA */
  useEffect(() => {
    if (mode === "instant") {
      onChange({
        delivery_type: "instant",
        delivery_day: null,
        delivery_slot: null,
        estimated_delivery_time: `${ETA_MIN}-${ETA_MAX} mins`,
      });
    }

    if (mode === "scheduled" && day && slot) {
      onChange({
        delivery_type: "scheduled",
        delivery_day: day,
        delivery_slot: slot,
        estimated_delivery_time: null,
      });
    }
  }, [mode, day, slot]);

  return (
    <div className="delivery-pref">
      <h3>Delivery Preference</h3>

      {/* MODE */}
      <div className="day-selector">
        <button
          type="button"
          className={mode === "instant" ? "active" : ""}
          onClick={() => {
            setMode("instant");
            setSlot(null);
          }}
        >
          ⚡ Instant
        </button>

        <button
          type="button"
          className={mode === "scheduled" ? "active" : ""}
          onClick={() => setMode("scheduled")}
        >
          🕒 Schedule
        </button>
      </div>

      {/* ETA */}
      {mode === "instant" && (
        <p className="instant-eta">
          🚚 Delivered in <b>{ETA_MIN}-{ETA_MAX} minutes</b>
        </p>
      )}

      {/* DAY */}
      {mode === "scheduled" && (
        <div className="day-selector">
          <button
            type="button"
            className={day === "today" ? "active" : ""}
            onClick={() => {
              setDay("today");
              setSlot(null);
            }}
          >
            Today
          </button>

          <button
            type="button"
            className={day === "tomorrow" ? "active" : ""}
            onClick={() => {
              setDay("tomorrow");
              setSlot(null);
            }}
          >
            Tomorrow
          </button>
        </div>
      )}

      {/* TIME SLOTS */}
      {mode === "scheduled" && (
        <div className="slot-grid">
          {TIME_SLOTS.map((time) => {
            const isDisabled = UNAVAILABLE_SLOTS[day]?.includes(time);

            return (
              <button
                key={time}
                type="button"
                disabled={isDisabled}
                className={`slot 
                  ${slot === time ? "selected" : ""} 
                  ${isDisabled ? "disabled" : ""}`}
                onClick={() => setSlot(time)}
              >
                {time}
                {isDisabled && <span> (Unavailable)</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
