"use client";

import Image from "next/image";
import DEFAULT_IMAGE_URL from "../../../public/images/default-image.jpg";
import { EventsArray } from "@/types/events";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/database.types";
import ModalUpdate from "../ModalUpdate/ModalUpdate";
import { useState } from "react";

const ListEvents = ({ events }: { events: EventsArray | null }) => {
  const supabase = createClientComponentClient<Database>();
  const [listEvents, setListEvents] = useState(events || []);

  const subscription = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "events" },
      (payload) => {
        if (payload.eventType === "DELETE") {
          setListEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== payload.old.id)
          );
        } else {
          setListEvents((prevEvents) => {
            const updatedEvents = prevEvents.map((event) =>
              event.id === payload.new.id ? { ...event, ...payload.new } : event
            );

            if (!prevEvents.some((event) => event.id === payload.new.id)) {
              console.log(payload.new);
              updatedEvents.push(payload.new);
            }

            return updatedEvents;
          });
        }
      }
    )
    .subscribe();

  console.log(listEvents);
  const handleDeleteEvent = async (eventId: number | undefined) => {
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
    } catch (error: any) {
      console.error("Error deleting event:", error.message);
    }
  };
  function formattedDate(dateString: any) {
    const date = new Date(dateString);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const year = date.getUTCFullYear();
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const dayOfWeek = daysOfWeek[date.getUTCDay()];

    return `${dayOfWeek}, ${month} ${day}, ${year}`;
  }
  return (
    <div className="py-8 grid mx-auto">
      {listEvents?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-lg text-gray-500">No events saved yet.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 content-center">
          {listEvents?.map((event) => (
            <li
              key={event.id}
              className="max-w-xs bg-white shadow rounded-lg ml-5.5 mb-3.5"
            >
              {event.image ? (
                <div className="w-full h-64 bg-top bg-cover rounded-t relative">
                  <Image
                    src={event.image}
                    alt="Picture of the event"
                    layout="fill"
                    objectFit="contain"
                    className=""
                  />
                </div>
              ) : (
                <div className="w-full h-64 bg-top bg-cover rounded-t relative">
                  <Image
                    src={DEFAULT_IMAGE_URL}
                    alt="Default Picture"
                    layout="fill"
                    objectFit="contain"
                    className=""
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold mb-1 pl-3.5 pt-3.5">
                {event.name}
              </h3>
              <p className="text-gray-600 mt-2 pl-3.5">{event.description}</p>
              <p className="text-gray-500 text-sm mt-2 pl-3.5">
                {formattedDate(event.date)}
              </p>
              <div className="flex justify-start mt-4 pl-3.5 pb-3.5">
                <ModalUpdate
                  id={event.id}
                  name={event.name}
                  description={event.description}
                  date={event.date}
                  image={event.image}
                />
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
