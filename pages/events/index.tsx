import EventList from "@/components/Event/EventList";
import SearchBox from "@/components/SearchBox";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  const findEventHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <Fragment>
      <SearchBox findEventHandler={findEventHandler} />
      <EventList events={events} />
    </Fragment>
  );
}
