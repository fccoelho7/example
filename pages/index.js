import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'

import styles from '../styles/Home.module.css'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await axios.get('https://blog.apiki.com/wp-json/wp/v2/posts')
        setPosts(data)
      } catch(e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Posts
        </h1>

        {loading && (<h2>Loading...</h2>)}

        <ul>
          {posts?.map(post => (
            <ol>
              <h3>{post?.title?.rendered}</h3>
              <p dangerouslySetInnerHTML={{ __html: post?.excerpt?.rendered }} />
              <a href={post?.link}>See more</a>
            </ol>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
