const express = require('express');
const app = express();
require('dotenv').config();
const cloudfrontSigner = require('@aws-sdk/cloudfront-signer');

// GET: http://localhost:3000/signed-url
app.get('/signed-url', (req, res) => {
    const imageKey = "b876834d-4986-420c-b078-9fdb6bec39b0.jpg"; // key/name of the image file in S3
    const signedUrl = cloudfrontSigner.getSignedUrl({
      url: `https://d338c5pgh6t67z.cloudfront.net/${imageKey}`,
      dateLessThan: new Date(Date.now() + 1000*60*5), // 5 minutes timeout from now
      privateKey: process.env.CLOUDFRONT_PRIVATE_KEY,
      keyPairId: process.env.CLOUDFRONT_KEY_ID
    });
    
    console.log("SIGNED_URL_LINK:\n", signedUrl);
    res.json({ signedUrl });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});