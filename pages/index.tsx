import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';
import { useContext } from 'react';
import { NotificationContext } from '@/context/notificationContext';

type HomeProps = {
  posts: {
    id: string,
    title: string
  }[]
}

export default function Home(props: HomeProps) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx?.notification

  console.log({ activeNotification })

  const { posts } = props;
  return (
    <div>
      {posts.map(post => <div key={post.id}><Link href={`/${post.id}`}>{post.title}</Link></div>)}
      <button onClick={() =>notificationCtx?.showNotification({title:"Hi",message:"Nill",status:true})}>Show</button>
      <button onClick={() =>notificationCtx?.hideNotification()}>Hide</button>
    </div>
  )
}

export async function getStaticProps() {
  console.log('(Re)-generating...')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  return {
    props: {
      posts: data.products
    },
    revalidate: 10
  }
}
