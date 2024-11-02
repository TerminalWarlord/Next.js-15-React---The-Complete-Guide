import { notFound } from "next/navigation";

import { DUMMY_NEWS } from "@/dummy-data";

export function generateMetadata({ params }) {
  const news = DUMMY_NEWS.find((news) => news.slug === params.slug);
  if (!news) {
    notFound();
  }
  return {
    title: news.title,
  };
}

export default function Page({ params }) {
  const newsSlug = params.slug;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <article className="news-article">
      <header>
        <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
}
