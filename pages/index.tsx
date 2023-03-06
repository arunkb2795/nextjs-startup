import fs from 'fs/promises';
import path from 'path';

// const DUMMY_POSTS = [
//   {
//     id: "101",
//     title: "Post 1"
//   }
// ]

type HomeProps = {
  posts: {
    id: string,
    title: string
  }[]
}

export default function Home(props: HomeProps) {
  const { posts } = props;
  return (
    posts.map(post => <div key={post.id}>{post.title}</div>)
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
