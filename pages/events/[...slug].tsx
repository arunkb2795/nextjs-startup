import Button from "@/components/Button";
import { useRouter } from "next/router";
import EventList from "../../components/Event/EventList";
import { getFilteredEvents } from "../../dummy-data";

export default function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p>Loading...</p>;
  }

  const year = +filterData[0];
  const month = +filterData[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return (<div><p>Invalid filter please adjust your values!</p>
    <Button link={`/events`}>Go Back</Button>
    </div>);
  }

  const filteredEvents = getFilteredEvents({ year: +year, month: +month });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>;
  }

  return <EventList events={filteredEvents} />;
}
