import Modal from "@/components/Modal/Modal";

export default function Dashboard() {
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
        <h2 className="text-2xl font-bold">Saved Events</h2>
        <p className="text-gray-600 mt-3">
          Save your favorite events to watch later. Click the &quot;Save
          Event&quot; button on the event details page to add them here.
        </p>
        {/* Add a component or section to display the list of saved events */}
      </div>
    </div>
  );
}
