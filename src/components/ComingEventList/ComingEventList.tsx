import React from "react";
import Modal from "../Modal/Modal";
import Image from "next/image";
import DEFAULT_IMAGE_URL from "../../../public/images/default-image.jpg";

function ComingEventsList({ events }: any) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Coming Events</h1>
      <ul className="pl-4 space-y-4">
        {events.map((event: any) => (
          <li key={event.id} className="border rounded p-4 bg-white">
            <span className="font-semibold">{event.name}</span>, {event.date}
            <div className="w-full h-48 mt-2 relative">
              <Image
                src={event.imageUrl || DEFAULT_IMAGE_URL}
                alt="Event Image"
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComingEventsList;
