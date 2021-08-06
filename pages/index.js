import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';

function Home({ posts: receivedPosts }) {
  const [posts, setPosts] = useState(receivedPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fecthPosts() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://blog.apiki.com/wp-json/wp/v2/posts/?page=${page}`
        );
        setPosts([...posts, ...data]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fecthPosts();
  }, [page]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Posts</h1>

        <div className={styles.grid}>
          {posts?.map((post) => (
            <Link href={`/single/?id=${post?.id}`}>
              <a className={styles.card}>
                <h3>{post?.title?.rendered} →</h3>
                <p dangerouslySetInnerHTML={{ __html: post?.excerpt?.rendered }} />
              </a>
            </Link>
          ))}
        </div>

        <button onClick={() => setPage(page + 1)}>
          {loading ? 'Carregando...' : 'Carregar Mais'}
        </button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const { data: posts } = await axios.get('https://blog.apiki.com/wp-json/wp/v2/posts');

  return {
    props: {
      posts,
    },
  };
}

export default Home;
