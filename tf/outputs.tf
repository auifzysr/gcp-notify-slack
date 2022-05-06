output "topic" {
  value = google_pubsub_topic.notify-slack.id
}

output "subscription" {
  value = google_pubsub_subscription.notify-slack.id
}

output "build_trigger" {
  value = google_cloudbuild_trigger.notify-slack.id
}

output "service" {
  value = google_cloud_run_service.notify-slack.id
}

output "service_sa" {
  value = google_service_account.cloudrun_sa.id
}
