import React from "react";
import { useReactToPrint } from "react-to-print";

const PrintableCard = React.forwardRef(({ dayEvent }, ref) => {
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  return (
    <div ref={ref}>
      <div className="card w-96 bg-base-100 shadow-xl image-full">
        <figure>
          <img src={dayEvent.image} alt="event" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{dayEvent.title}</h2>
          <p>{dayEvent.description}</p>
        </div>
      </div>
      <div className="card-actions justify-end">
        <button className="btn btn-primary" onClick={handlePrint}>
          Download PDF
        </button>
      </div>
    </div>
  );
});

export default PrintableCard;
