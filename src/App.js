import React, { useEffect, useState } from 'react';

import formatDate from './helpers/formatDate';
import FilterPanel from './components/FilterPanel';

function App() {

  const [feedItems, setFeedItems] = useState([])
  const [shownFeedItems, setShownFeedItems] = useState([])
  const [feedSources, setFeedSources] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSource, setSelectedSource] = useState("All")

  const handleSetSelectedSource = (e) => {
    if (e.target.value !== "All") {
      setShownFeedItems(feedItems.filter((item) => item.source === e.target.value))
    } else {
      setShownFeedItems(feedItems)
    }
    setSelectedSource(e.target.value)
  }

  // Array of RSS feed sources
  const feedLinks = [
    'https://www.door.link/rss.xml',
    'https://fetchrss.com/rss/673931b99e558b54e60b4b32673931a1fa3008abc706f832.xml', // leahs field notes youtube
    'https://fetchrss.com/rss/673931b99e558b54e60b4b326739322132d1b326b40c3e03.xml', // rosie sweden youtube
    'https://sarahcswett.substack.com/feed',
  ];

  // Function to fetch feed from a single source
  const fetchFeed = async (source) => {
    try {
      const feedUrl = `https://rss2json.com/api.json?rss_url=${encodeURIComponent(source)}`;
      const response = await fetch(feedUrl);
      const data = await response.json();

      if (data.status === 'ok') {
        return data.items.map((item) => ({
          title: item.title,
          link: item.link.replace("/watch?", "/watch_popup?"),
          date: item.pubDate,
          source: data.feed.title.replace("- YouTube", ""),
        }));
      } else {
        throw new Error(`Failed to fetch feed from ${source}`);
      }
    } catch (err) {
      console.error('Error fetching feed:', err);
      setError(err.message || 'An error occurred while fetching the feeds');
      return [];
    }
  };
  
  // Fetch feeds from all sources
  const fetchFeeds = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch feeds for all sources in parallel
      const feedPromises = feedLinks.map(fetchFeed);

      // Wait for all feed data to be fetched
      const allFeeds = await Promise.all(feedPromises);

      // Flatten the array of arrays into one array of feed items
      const allFeedItems = allFeeds.flat();

      let compare = (a, b) => {
        if (a.date < b.date) {
          console.log(a.date +" is lower than " + b.date)
            return 1;
        }
        if (a.date > b.date) {
            return -1;
        }
        return 0;
      };

      // Sort feed items by date in descending order (newest first)
      const sortedFeedItems = allFeedItems.sort(compare);

      // Update state with the combined feed items
      setFeedItems(sortedFeedItems);
      setShownFeedItems(sortedFeedItems)
      setFeedSources([...new Set(sortedFeedItems.map((item) => item.source))])
    } catch (err) {
      console.error('Error in fetching feeds:', err);
      setError('Error fetching the feeds');
    } finally {
      setLoading(false);
    }
  };  

  // Fetch feeds when component mounts
  useEffect(() => {
    fetchFeeds();
  }, []);

  const feedElems = shownFeedItems.map((item, index) => {
    return (
      <li className="list-group-item" key={index}>
        <div>
          <a className="" href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
        </div>
        <div className='d-flex flex-row'>
          <div className='me-3'>{item.source}</div>
          <div>{formatDate(new Date(item.date)) || 'No Date Available'}</div>
        </div>
      </li>
    )
  })

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App container">
      <h1 className='mt-5 mb-3'>Gisele's RSS Feed</h1>
      <div className="row">
        <div className='col-12 col-lg-2'>
          <FilterPanel feedSources={feedSources} handleSetSelectedSource={handleSetSelectedSource} selectedSource={selectedSource} />
        </div>
        <div className='col-12 col-lg-10'>
          <ul class="list-group list-group-flush">
            {feedElems}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
