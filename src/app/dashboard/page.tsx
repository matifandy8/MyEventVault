import ListEvents from "@/components/ListEvents/ListEvents";
import Modal from "@/components/Modal/Modal";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../database.types";

export default async function Dashboard() {
  const supabase = createServerComponentClient<Database>({ cookies });
  let { data: eventsData } = await supabase.from("events").select("*");
  return (
    <div className="mx-auto max-w-2xl py-28 sm:py-28 lg:py-32">
      <div className="text-center">
        <h1 className="text-3xl">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-600 mt-3">
          This is your personal dashboard, where you can manage your events,
          check upcoming events, and more.
        </p>
        <div className="grid place-items-center mt-8">
          <Modal userId={"matias"} />
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-bold">Saved Events</h1>
        <p className="text-gray-600 mt-3">
          Save your favorite events to watch later. Click the &quot;Save
          Event&quot; button on the event details page to add them here.
        </p>
        <ListEvents events={eventsData} />
      </div>
    </div>
  );
}
