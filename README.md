# gcp-notify-slack

## works on
- Node.js v16.15.0
- Terraform v1.1.9

## setup

```sh
# login to GCP project
gcloud auth login
gcloud config set project PROJECT_ID

# create repository
gcloud source repos create gcp-slack-notify
git remote add csr ssh://USER_EMAIL@source.developers.google.com:2022/p/PROJECT_ID/r/gcp-notify-slack
git push csr main

# build initial docker image
gcloud auth configure-docker
docker build -t gcr.io/PROJECT_ID/notify-slack:init .
docker push gcr.io/PROJECT_ID/notify-slack:init

# deploy CD pipeline
cd tf
terraform init
terraform apply -var project_id=PROJECT_ID -var slack_channel=SLACK_CHANNEL -var slack_token=SLACK_TOKEN
```
