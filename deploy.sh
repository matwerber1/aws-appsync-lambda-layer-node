# EDIT THIS TO AN EXISTING BUCKET YOU OWN:
BUCKET=werberm-sandbox

# No need to change anything below: 
STACK_NAME=appsync-lambda-layer

# Install dependencies for our Layer
(cd lambda-layers/nodejs && npm install)

# Package everything together, upload to our bucket
sam package \
    --s3-bucket $BUCKET \
    --template-file template.yaml \
    --output-template-file packaged.yaml

# Deploy to CloudFormation
sam deploy \
    --template-file packaged.yaml \
    --stack-name $STACK_NAME \
    --capabilities CAPABILITY_IAM