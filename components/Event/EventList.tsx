import EventItem from "./EventItem";

type EventProps = {
  events: {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    image: string;
    isFeatured: boolean;
  }[];
};

export default function EventList({ events }: EventProps) {
  return (
    <ul>
      {events.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          image={event.image}
          isFeatured={event.isFeatured}
        />
      ))}
    </ul>
  );
}
