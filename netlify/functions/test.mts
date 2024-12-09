// import * as admin from 'firebase-admin';
// import fetch from 'node-fetch';

// Initialize Firebase Admin SDK
// if (!admin.apps.length) {
//     const serviceAccount = {
//         type: "service_account",
//         project_id: process.env.FIREBASE_PROJECT_ID,
//         private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//         private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fix newlines and even though it's red it works!!
//         client_email: process.env.FIREBASE_CLIENT_EMAIL,
//         client_id: process.env.FIREBASE_CLIENT_ID,
//         auth_uri: "https://accounts.google.com/o/oauth2/auth",
//         token_uri: "https://oauth2.googleapis.com/token",
//         auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//         client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
//       };
//       console.log(serviceAccount)
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),  // even though it's red it works!!
//       databaseURL: process.env.FIREBASE_DATABASE_URL // Make sure to set this in your environment variables
//     });
//   } else {
//     admin.app(); // Use the default app if already initialized
// }

// const db = admin.database();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req) => {

    console.log("test")

    // const body = await req.json()
    // if (!body || !body.next_run) {
    //     throw new Error("Missing next_run property in the request body.");
    // } else {
    //     const { next_run } = body;
    //     console.log("Received event! Next invocation at:", next_run);
    // }

    // const apiKey = process.env.REACT_APP_YOUTUBE_API_CREDENTIAL;  

    // const feedData = [
    //     { type: "rss", rssFeed: "https://www.door.link/rss.xml"},
    //     { type: "rss", rssFeed: "https://sarahcswett.substack.com/feed"},
    //     { type: "rss", rssFeed: "https://www.jarrettfuller.blog/feed.xml"},
    //     { type: "youtube", youtubeHandle: "leahsfieldnotes"},
    //     { type: "youtube", youtubeHandle: "hankschannel"},
    //     { type: "youtube", youtubeHandle: "wildrosie"},
    // ];

    //  // Function to fetch the last 10 videos from a YouTube channel
    // async function fetchYoutubeContent(handle) {
    //     const fetch = (await import('node-fetch')).default;  // Dynamically import `fetch`
    //     try {
    //         // Step 1: get the channel ID
    //         const requestIDURL = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${handle}&key=${apiKey}`
    //         const response = await fetch(requestIDURL);
    //         const data = await response.json();
    //         const channelID = data.items[0].id

    //         // Step 2: get the channel videos data
    //         const resultNum = 10
    //         const requestVideoURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${resultNum}`
    //         const responseVideo = await fetch(requestVideoURL);
    //         const dataVideo = await responseVideo.json();

    //         // Step 3: format the video data
    //         const formattedDataVideo = dataVideo.items.map((item) => ({
    //                 title: item.snippet.title,
    //                 link: `https://youtube.com/watch_popup?v=${item.id.videoId}`,
    //                 date: item.snippet.publishedAt,
    //                 source: item.snippet.channelTitle,
    //             })
    //         )
    //         return formattedDataVideo
    //     } catch (error) {
    //         throw new Error(error.message || 'Error fetching videos');
    //     }
    // };

    // // Function to fetch the last 10 items from a RSS feed
    // async function fetchRSSFeed(url) {
    //     const fetch = (await import('node-fetch')).default;  // Dynamically import `fetch`
    //     try {
    //         const feedUrl = `https://rss2json.com/api.json?rss_url=${encodeURIComponent(url)}`;
    //         const response = await fetch(feedUrl);
    //         const data = await response.json();

    //         if (data.status === 'ok') {
    //             return data.items.map((item) => ({
    //                 title: item.title,
    //                 link: item.link,
    //                 date: item.pubDate.replace(" ", "T"),
    //                 source: data.feed.title,
    //             }));
    //         } else {
    //             throw new Error(`Failed to fetch feed from ${url}`);
    //         }
    //     } catch (err) {
    //         console.error('Error fetching feed:', err);
    //         return [];
    //     }
    // } 

    // function compareDates(a, b) {
    //     if (a.date < b.date) { return 1; }
    //     if (a.date > b.date) { return -1; }
    //     return 0;
    // };

    // try {
    //     let allFeedItems = [];
    //     // Fetch feeds from all sources
    //     for (const itemData of feedData) {
    //         let returnArray = [];
    //         if (itemData.type === 'youtube') {
    //             returnArray = await fetchYoutubeContent(itemData.youtubeHandle);
    //         } else if (itemData.type === 'rss') {
    //             returnArray = await fetchRSSFeed(itemData.rssFeed);
    //         }
    //         allFeedItems.push(...returnArray);
    //     }
    
    //     // Sort feed items by date
    //     const sortedFeedItems = allFeedItems.sort(compareDates);
    
    //     // format into an object
    //     const objectWithNumericKeys = sortedFeedItems.reduce((acc, currentValue, index) => {
    //         acc[index] = currentValue; // Assign the object at each index as the value
    //         return acc;
    //     }, {});
        
    //     // Store the data in Firebase Realtime Database
    //     await db.ref('data').set(objectWithNumericKeys);

    //     return {
    //         statusCode: 200,
    //         body: JSON.stringify({ message: 'Data successfully saved to Firebase!' }),
    //     };
    // } catch (err) {
    //     console.log(err)
    //     return {
    //         statusCode: 500,
    //         body: JSON.stringify({ error: 'Failed to save data to Firebase.' }),
    //     };
    // }
}


export const config = {
  schedule: "@daily"
}