import Link from "next/link";
import styled from "styled-components";
import Button from "../Button";

type EventItemProps = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  date: string;
  image?: string;
  isFeatured: boolean;
};

export default function EventItem({
  id,
  title,
  date,
  location,
  image,
  isFeatured,
}: EventItemProps) {
  const humanReadableDate =
    date &&
    new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formattedAddress = location?.replace(", ", "\n");

  const exploreLink = `/events/${id}`;

  return (
    <Container>
      <ItemImage src={"/" + image} alt={title} />
      <div>
        <div>
          <h2>{title}</h2>
        </div>
        <div>
          <time>{humanReadableDate}</time>
        </div>
        <div>
          <address>{formattedAddress}</address>
        </div>
        <Button link={exploreLink}>Explore Event</Button>
      </div>
    </Container>
  );
}

const Container = styled.li`
  list-style: none;
`;

const ItemImage = styled.img`
  width: 200px;
  height: auto;
`;
