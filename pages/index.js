import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Instagram from 'instagram-web-api';

export default function Home({ posts }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Instagram Posts</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>Instagram Posts</h1>
            <ul className={styles.list}>
                {posts.map(({ node }, i) => {
                    return (
                        <li key={i}>
                            <img src={node.display_resources[0].src} />
                            <p>{node.edge_media_to_caption.edges[0]?.node.text}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export async function getStaticProps(context) {
    const client = new Instagram({ username: 'INSTAGRAM_USERNAME', password: 'INSTAGRAM_PASSWORD' });
    await client.login();

    const response = await client.getPhotosByUsername({
        username: 'INSTAGRAM_USERNAME',
    });

    return {
        props: {
            posts: response.user.edge_owner_to_timeline_media.edges,
        }, // will be passed to the page component as props
    };
}
