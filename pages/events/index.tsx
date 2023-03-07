import EventList from "@/components/Event/EventList";
import SearchBox from "@/components/SearchBox";
import { getAllEvents } from '../../helpers/api-utils';
import { useRouter } from "next/router";
import { Fragment } from "react";
import { GetStaticProps } from 'next'


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
  events: EventStates[],
}

export default function AllEventsPage(props: HomePageProps) {
  const {events} = props;
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

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await getAllEvents()

  return {
    props: {
      events: data
    },
    revalidate: 30
  }
}
