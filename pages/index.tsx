import styled from 'styled-components'
import BasicLayout from "../layout/Basic";
import { getFeaturedEvents } from '../dummy-data'
import EventList from '@/components/Event/EventList';

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <BasicLayout>
      <main>
        <Title>Event starting page</Title>
        <EventList events={featuredEvents} />
      </main>
    </BasicLayout>
  )
}


export const Title = styled.h1`
    color:red`
  ;