output "topic" {
  value = google_pubsub_topic.pubsub-slack.id
}

output "subscription" {
  value = google_pubsub_subscription.pubsub-slack.id
}

output "build_trigger" {
  value = google_cloudbuild_trigger.pubsub-slack.id
}

output "service" {
  value = google_cloud_run_service.pubsub-slack.id
}

output "service_sa" {
  value = google_service_account.cloudrun_sa.id
}
