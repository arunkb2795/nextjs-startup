import { GetServerSideProps } from 'next';
import EventList from "../../components/Event/EventList";
import { getFilteredEvents } from "../../helpers/api-utils";

type EventStates = {
  id: string,
  title: string,
  description: string,
  location: string,
  date: string,
  image: string,
  isFeatured: boolean,
}

type HomePageProps = {
  filteredEvents: EventStates[],
}


export default function FilteredEventsPage(props: HomePageProps) {

  const { filteredEvents } = props;

  if (!filteredEvents) {
    return <p>Loading...</p>;
  }


  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>;
  }

  return <EventList events={filteredEvents} />;
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx
  const filterData = params?.slug;


  if (filterData) {
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
      return {
        notFound: true
      }

    }

    const filteredEvents = await getFilteredEvents({ year: +year, month: +month });

    return {
      props: {
        filteredEvents: filteredEvents
      }
    }
  } else {
    return {
      props: {
        filteredEvents: null
      }
    }
  }
}