import { getEventById, getFeaturedEvents } from '../../helpers/api-utils';
import { Fragment } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next'

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
  event: EventStates,
}

export default function EventDetailPage(props: HomePageProps) {
  const { event } = props

  if (!event) {
    return <p>No event found!</p>
  }

  return (
    <Fragment>
      <div>Show selected events - {event.id}
        <h1>{event.title}</h1>
      </div>
    </Fragment>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const eventId = ctx?.params?.eventId;
  console.log({ eventId })
  const data = await getEventById(eventId)

  return {
    props: {
      event: data
    },
    revalidate: 30
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getFeaturedEvents();

  const ids = data.map((event: EventStates) => event.id);
  const pathWithParams = ids.map((id: string) => ({
    params: {
      eventId: id,
    },
  }));

  return {
    paths: pathWithParams,
    fallback: 'blocking'
  }
}