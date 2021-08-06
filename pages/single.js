import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/Home.module.css';

function Single() {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data: post } = await axios.get(`https://blog.apiki.com/wp-json/wp/v2/posts/${id}`);
        setPost(post);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <h1 className={styles.title}>{post?.title?.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: post?.content?.rendered }} />
          </>
        )}
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

export default Single;
