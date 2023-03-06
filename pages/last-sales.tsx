import { useEffect, useState } from "react";
import useSWR from "swr";

let URL = "https://nextjs-course-290f5-default-rtdb.firebaseio.com/sales.json";

const fetcher = (args: string = URL) => fetch(args).then((res) => res.json());

type SalesData = {
  id: string;
  name: string;
  volume: number;
};

type Sales = {
  salesData: SalesData[];
};

export default function LastSales(props: Sales) {
  const { salesData } = props;
  const [sales, setSales] = useState<SalesData[]>(salesData);
  const { data, error } = useSWR(URL, fetcher);
  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          name: data[key].name,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Some thing happened...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.name}-{sale.volume}
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps = async () => {
  return fetch(
    "https://nextjs-course-290f5-default-rtdb.firebaseio.com/sales.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          name: data[key].name,
          volume: data[key].volume,
        });
      }
      return {
        props: {
          salesData: transformedSales,
        },
      };
    });
};
