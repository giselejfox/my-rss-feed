import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fix newlines and even though it's red it works!!
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      };
      console.log(serviceAccount)
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),  // even though it's red it works!!
      databaseURL: process.env.FIREBASE_DATABASE_URL // Make sure to set this in your environment variables
    });
  } else {
    admin.app(); // Use the default app if already initialized
}

const db = admin.database();
  
export const handler = async (event, context) => {
    const dataRef = db.ref('data');
    try {
        // Use `get()` method to fetch the data once
        const snapshot = await dataRef.get();
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            return {
                statusCode: 200,
                body: JSON.stringify({ feedItems: data }),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Data not found' }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching data from Firebase', error: error.message }),
        };
    }
}