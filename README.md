# gcp-notify-slack

## deploy

```sh
gcloud builds submit --tag gcr.io/project_name/repository_name \
&& gcloud run deploy service_name --image gcr.io/project_name/repository_name --no-allow-unauthenticated --set-env-vars=SLACK_TOKEN=xoxb-sometokenstring
```