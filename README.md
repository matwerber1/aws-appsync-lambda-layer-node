# Lambda Layer to Interact with AppSync API

This Lambda Layer wraps dependencies and provides a few helper functions for interacting with AWS AppSync GraphQL APIs from AWS Lambda in NodeJS. 

At this time, the helper only provides basic query and mutate capability using AWS_IAM authentication and was adapted based on guidance from https://geromekevin.com/how-to-use-aws-appsync-in-lambda-functions/. 

This layer is barebones at the moment - pull requests always welcome :)

## Why? 

So, why bother going through AppSync rather than hitting our backend (e.g. DynamoDB, RDS, etc.) directly from our Lambda?

Two reasons:

1. Using AppSync in our Lambda allows us to interact using the same model that we (presumably) use in our front-end. No need to maintain two different methods. 

2. If you modify data directly in a backend, the change will not be picked up by any subscriptions that clients have with AppSync. 

## Usage

1. Clone this repo

2. Run `./deploy.sh` to create the layer **and** a demo Lambda function; if you don't want the demo function, just remove it from `template.yaml`.

3. Import the helper, initialize the client, and invoke your endpoint: 

```js
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
    console.log(JSON.stringify(response, null, 2));
  }
  catch(err) {
      console.log(err.message, err.stack);
  }  
  return ('Done!');  
};
```