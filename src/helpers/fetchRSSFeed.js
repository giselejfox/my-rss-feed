
export default async function fetchRSSFeed(url) {
        try {
          const feedUrl = `https://rss2json.com/api.json?rss_url=${encodeURIComponent(url)}`;
          const response = await fetch(feedUrl);
          const data = await response.json();
    
          if (data.status === 'ok') {
            return data.items.map((item) => ({
              title: item.title,
              link: item.link,
              date: item.pubDate.replace(" ", "T"),
              source: data.feed.title,
            }));
          } else {
            throw new Error(`Failed to fetch feed from ${url}`);
          }
        } catch (err) {
          console.error('Error fetching feed:', err);
          return [];
        }
}