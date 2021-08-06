import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

import styles from '../styles/Home.module.css';

function Home({ posts }) {
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
