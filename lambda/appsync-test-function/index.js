const AppSyncHelper = require('appsync-helper');

var appSyncClient = new AppSyncHelper({
  url: 'https://YOUR_API_ENDPOINT.appsync-api.YOUR_API_REGION.amazonaws.com/graphql',         
  region: process.env.AWS_REGION,      
  auth_type: 'AWS_IAM',   
  accessKey:  process.env.AWS_ACCESS_KEY_ID,    
  secretKey: process.env.AWS_SECRET_ACCESS_KEY,   
  sessionToken: process.env.AWS_SESSION_TOKEN
});

exports.handler = async (event) => {

  try {
    var graphql = `
      query getItems {
        getItems {
          items {
          id,
          attribute1,
        },
        nextToken
        }
      }
    `;
    var response = await appSyncClient.query(graphql);
    // var response = await appSyncClient.mutate(graphql, variables);
    console.log(JSON.stringify(response, null, 2));
  }
  catch(err) {
      console.log(err.message, err.stack);
  }  
  return ('Done!');  
  
};
