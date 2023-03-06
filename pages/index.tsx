import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';

type HomeProps = {
  posts: {
    id: string,
    title: string
  }[]
}

export default function Home(props: HomeProps) {
  const { posts } = props;
  return (
    posts.map(post => <div key={post.id}><Link href={`/${post.id}`}>{post.title}</Link></div>)
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
