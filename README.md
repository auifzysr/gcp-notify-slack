# gcp-notify-slack

## works on
- Node.js v16.15.0
- Terraform v1.1.9

## deploy

```sh
gcloud builds submit --tag gcr.io/project_name/repository_name \
&& gcloud run deploy service_name --image gcr.io/project_name/repository_name --no-allow-unauthenticated --set-env-vars=SLACK_TOKEN=xoxb-sometokenstring
```