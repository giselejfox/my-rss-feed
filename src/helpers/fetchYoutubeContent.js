// import axios from 'axios';

const apiKey = process.env.REACT_APP_YOUTUBE_API_CREDENTIAL;  // Replace with your YouTube API key
// const handle = 'leahsfieldnotes';  // Replace with the YouTube channel ID

// Function to fetch the last 10 videos from a YouTube channel
export default async function fetchYoutubeContent(handle) {
  try {

    // Step 1: get the channel ID
    const requestIDURL = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${handle}&key=${apiKey}`
    const response = await fetch(requestIDURL);
    const data = await response.json();
    const channelID = data.items[0].id

    // Step 2: get the channel videos data
    const resultNum = 10
    const requestVideoURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${resultNum}`
    const responseVideo = await fetch(requestVideoURL);
    const dataVideo = await responseVideo.json();

    // Step 3: format the video data
    const formattedDataVideo = dataVideo.items.map((item) => ({
          title: item.snippet.title,
          link: `https://youtube.com/watch_popup?v=${item.id.videoId}`,
          date: item.snippet.publishedAt,
          source: item.snippet.channelTitle,
      })
    )

    return formattedDataVideo
  } catch (error) {
    throw new Error(error.message || 'Error fetching videos');
  }
};