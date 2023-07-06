import { Job } from "https://deno.land/x/fluent_gitlab_ci@v0.3.2/mod.ts";

export const lintDebug = new Job()
  .interruptible(true)
  .stage("build")
  .script("./gradlew -Pci --console=plain :app:lintDebug -PbuildDir=lint");

export const assembleDebug = new Job()
  .interruptible(true)
  .stage("build")
  .script("./gradlew assembleDebug")
  .artifacts({
    paths: ["app/build/outputs/"],
  });

export const debugTests = new Job()
  .interruptible(true)
  .stage("test")
  .script("./gradlew -Pci --console=plain :app:testDebug");
