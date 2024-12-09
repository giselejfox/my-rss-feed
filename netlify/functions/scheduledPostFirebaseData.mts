export default async (req) => {
    const fetch = (await import('node-fetch')).default;  // Dynamically import `fetch`

    // Ensure the SECRET_API_KEY is defined
    const apiKey = process.env.SECRET_API_KEY;

    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'environment API key is missing' })
        };
    }

    try {
        const response = await fetch('https://rocky-peak-99426-c2778d3104b4.herokuapp.com/update-feeds', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey // Add your API key here
            },
            body: JSON.stringify({}) // Send an empty body or modify if needed
        });

        if (!response.ok) {
            return {
              statusCode: response.status,
              body: JSON.stringify({ error: 'Failed to fetch data' })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post sent correctly' })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to make the request', details: err.message })
          };
    }

}

export const config = {
    schedule: "@daily"
}