import { GitlabCI } from "https://deno.land/x/fluent_gitlab_ci@v0.3.2/mod.ts";
import { assembleDebug, debugTests, lintDebug } from "./jobs.ts";

const gitlabci = new GitlabCI()
  .image("openjdk:11-jdk")
  .variables({
    ANDROID_COMPILE_SDK: "30",
    ANDROID_BUILD_TOOLS: "30.0.3",
    ANDROID_SDK_TOOLS: "7583922",
  })
  .comment("Packages installation before running script")
  .beforeScript(
    `
    apt-get --quiet update --yes
    apt-get --quiet install --yes wget tar unzip lib32stdc++6 lib32z1
    export ANDROID_HOME="\${PWD}/android-home"
    install -d $ANDROID_HOME
    wget --output-document=$ANDROID_HOME/cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-\${ANDROID_SDK_TOOLS}_latest.zip
    pushd $ANDROID_HOME
    unzip -d cmdline-tools cmdline-tools.zip
    pushd cmdline-tools
    mv cmdline-tools tools || true
    popd
    popd
    export PATH=$PATH:\${ANDROID_HOME}/cmdline-tools/tools/bin/
    sdkmanager --version
    yes | sdkmanager --licenses || true
    sdkmanager "platforms;android-\${ANDROID_COMPILE_SDK}"
    sdkmanager "platform-tools"
    sdkmanager "build-tools;\${ANDROID_BUILD_TOOLS}"
    chmod +x ./gradlew
  `
  )
  .comment("Basic android and gradle stuff")
  .comment("Check linting")
  .addJob("lintDebug", lintDebug)
  .comment("Make Project")
  .addJob("assembleDebug", assembleDebug)
  .comment("Run all tests, if any fails, interrupt the pipeline(fail it)")
  .addJob("debugTests", debugTests);

export default gitlabci;
