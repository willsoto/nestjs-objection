workflow "CI" {
  on       = "push"
  resolves = ["Unit Tests", "Build", "Typings"]
}

workflow "PR" {
  on       = "pull_request"
  resolves = ["Unit Tests", "Build", "Typings"]
}

workflow "Publish New Releases" {
  on       = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  runs = "yarn"
  args = "install"
}

action "Unit Tests" {
  uses  = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["Install"]
  runs  = "yarn"
  args  = "test"
}

action "Build" {
  uses  = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["Install"]
  runs  = "yarn"
  args  = "build"
}

action "Typings" {
  uses  = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["Install"]
  runs  = "yarn"
  args  = "typings"
}

action "Tag" {
  needs = ["Unit Tests", "Build", "Typings"]
  uses  = "actions/bin/filter@master"
  args  = "tag"
}

action "Publish" {
  needs   = ["Tag"]
  uses    = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args    = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
