import React, { useEffect, useState } from 'react';

import FilterPanel from './components/FilterPanel';

import fetchYoutubeContent from './helpers/fetchYoutubeContent';
import fetchRSSFeed from './helpers/fetchRSSFeed';

import formatDate from './helpers/formatDate';
import compareDates from './helpers/compareDates';

import { feedData } from './data/feedData';

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

  const getData = async (itemData) => {
    let returnArray = []
    if (itemData.type === "youtube") {
      returnArray = await fetchYoutubeContent(itemData.youtubeHandle)
    } else if (itemData.type === "rss") {
      returnArray = await fetchRSSFeed(itemData.rssFeed)
    } 
    return returnArray
  }

  // Fetch feeds from all sources
  const fetchFeeds = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch feeds for all sources in parallel
      const feedPromises = feedData.map(getData);

      // Wait for all feed data to be fetched
      const allFeeds = await Promise.all(feedPromises);

      // Flatten the array of arrays into one array of feed items
      const allFeedItems = allFeeds.flat();

      // Sort feed items by date in descending order (newest first)
      const sortedFeedItems = allFeedItems.sort(compareDates);

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
