"use client";

import Image from "next/image";
import DEFAULT_IMAGE_URL from "../../../public/images/default-image.jpg";
import { EventsArray } from "@/types/events";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/database.types";

const ListEvents = ({ events }: { events: EventsArray | null }) => {
  const supabase = createClientComponentClient<Database>();

  const handleEditEvent = (eventId: number) => {
    console.log(`Edit event with ID: ${eventId}`);
    // open a modal like save event
  };

  const handleDeleteEvent = async (eventId: number) => {
    console.log(`Delete event with ID: ${eventId}`);
    try {
      const { data, error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId);
      if (error) {
        console.error("Error deleting event:", error.message);
      }
      if (data) {
        console.log("Event deleted successfully:", data);
      }
    } catch (error) {
      console.error("Error deleting event:", error.message);
    }
  };
  return (
    <div className="py-8">
      {events?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-lg text-gray-500">No events saved yet.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {events?.map((event) => (
            <li
              key={event.id}
              className="max-w-sm bg-white shadow rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold mb-1">{event.name}</h3>
              {event.image ? (
                <div className="h-40 w-64 relative py-4">
                  <Image
                    src={event.image}
                    alt="Picture of the event"
                    layout="fill"
                    objectFit="contain"
                    className=""
                  />
                </div>
              ) : (
                <div className="h-40 w-64 relative py-4">
                  <Image
                    src={DEFAULT_IMAGE_URL}
                    alt="Default Picture"
                    layout="fill"
                    objectFit="contain"
                    className=""
                  />
                </div>
              )}
              <p className="text-gray-600 mt-2">{event.description}</p>
              <p className="text-gray-500 text-sm mt-2">{event.date}</p>
              <div className="flex justify-start mt-4">
                <button
                  className="text-blue-600 hover:text-blue-700 mr-4"
                  onClick={() => handleEditEvent(event.id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListEvents;
