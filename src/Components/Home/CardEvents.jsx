import { useContext, useRef } from "react";
import GlobalContext from "../../Context/GlobalContext";
import { useReactToPrint } from "react-to-print";

const CardEvents = () => {
  const { events } = useContext(GlobalContext);
  // console.log(events);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="w-[90%] mx-auto">
      <div className="flex gap-3">
        {events.map((dayEvent) => (
          <div
            className="card w-96 bg-base-100 shadow-xl image-full"
            key={dayEvent._id}
          >
            <figure>
              <img src={dayEvent.image} alt="event" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{dayEvent.title}</h2>
              <p>{dayEvent.description}</p>
              <p>{dayEvent.day}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handlePrint}>
                  Print
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "none" }}>
        {/* Hidden div for rendering the printable content */}
        <div ref={componentRef}>
          <div className="flex gap-3">
            {events.map((dayEvent) => (
              <div
                className="card w-96 bg-base-100 shadow-xl image-full"
                key={dayEvent._id}
              >
                <figure>
                  <img src={dayEvent.image} alt="event" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{dayEvent.title}</h2>
                  <p>{dayEvent.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEvents;
