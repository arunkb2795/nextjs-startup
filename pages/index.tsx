const DUMMY_POSTS = [
  {
    id: "101",
    title: "Post 1"
  }
]

type HomeProps = {
  posts: {
    id: string,
    title: string
  }[]
}

export default function Home(props:HomeProps) {
  const {posts} = props;
  return (
    posts.map(post => <div key={post.id}>{post.title}</div>)
  )
}

export async function getStaticProps() {
  return {
    props: {
      posts: DUMMY_POSTS
    }
  }
}
