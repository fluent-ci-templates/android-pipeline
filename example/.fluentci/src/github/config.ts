import { JobSpec, Workflow } from "fluent_github_actions";

export function generateYaml(): Workflow {
  const workflow = new Workflow("Build Android App");

  const push = {
    branches: ["main"],
  };

  const build: JobSpec = {
    "runs-on": "ubuntu-latest",
    steps: [
      {
        uses: "actions/checkout@v2",
      },
      {
        name: "Setup Fluent CI",
        uses: "fluentci-io/setup-fluentci@v2",
      },
      {
        name: "Run Build",
        run: "fluentci run android_pipeline assembleRelease",
      },
    ],
  };

  workflow.on({ push }).jobs({ build });

  return workflow;
}
