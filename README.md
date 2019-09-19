# Lambda Layer to Interact with AppSync API

This Lambda Layer wraps dependencies and provides a few helper functions for interacting with AWS AppSync GraphQL APIs from AWS Lambda in NodeJS. 

At this time, the helper only provides basic query and mutate capability using AWS_IAM authentication and was adapted based on guidance from https://geromekevin.com/how-to-use-aws-appsync-in-lambda-functions/. 

## Why? 

So, why bother going through AppSync rather than hitting our backend (e.g. DynamoDB, RDS, etc.) directly from our Lambda?

Two reasons:

1. Using AppSync in our Lambda allows us to interact using the same model that we (presumably) use in our front-end. No need to maintain two different methods. 

2. If you modify data directly in a backend, the change will not be picked up by any subscriptions that clients have with AppSync. 

## Usage

1. Clone this repo
2. Run `./deploy.sh` to create the layer and a demo Lambda function
