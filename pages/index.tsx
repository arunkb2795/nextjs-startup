import styled from 'styled-components'
import BasicLayout from "../layout/Basic";
import EventList from '@/components/Event/EventList';
import { getFeaturedEvents } from '../helpers/api-utils';
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

export default function HomePage(props: HomePageProps) {
  const { events } = props
  return (
    <BasicLayout>
      <main>
        <Title>Event starting page</Title>
        <EventList events={events} />
      </main>
    </BasicLayout>
  )
}


// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}

export const Title = styled.h1`
    color:red`
  ;
