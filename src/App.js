import React, { useEffect, useState } from 'react';

import FilterPanel from './components/FilterPanel';
import formatDate from './helpers/formatDate';

function App() {

  const [feedItems, setFeedItems] = useState([])
  const [shownFeedItems, setShownFeedItems] = useState([])
  const [feedSources, setFeedSources] = useState([])
  const [selectedSource, setSelectedSource] = useState("All")

  const handleSetSelectedSource = (e) => {
    if (e.target.value !== "All") {
      setShownFeedItems(feedItems.filter((item) => item.source === e.target.value))
    } else {
      setShownFeedItems(feedItems)
    }
    setSelectedSource(e.target.value)
  }

  const getData = async () => {
    try {
      // Fetch data from Netlify function
      const response = await fetch('/.netlify/functions/fetchFirebaseData');
      const data = await response.json();
      
      if (response.ok) {
        // Update state with the fetched data
        setFeedItems(data.feedItems);
        setShownFeedItems(data.feedItems);
        setFeedSources([...new Set(data.feedItems.map((item) => item.source))]); // Get unique sources
      } else {
        console.error('Error fetching data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch firebase data when component mounts
  useEffect(() => {
    getData()
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

  return (
    <div className="App container">
      <h1 className='mt-5 mb-3 fw-bold'>Gisele's RSS Reader</h1>
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
