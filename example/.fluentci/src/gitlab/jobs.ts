import { Job } from "fluent_gitlab_ci";

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
