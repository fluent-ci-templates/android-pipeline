import Client, { Container } from "@dagger.io/dagger";
import { withDevbox } from "https://deno.land/x/nix_installer_pipeline@v0.3.6/src/dagger/steps.ts";

export enum Job {
  lintDebug = "lintDebug",
  assembleDebug = "assembleDebug",
  assembleRelease = "assembleRelease",
  bundleRelease = "bundleRelease",
  debugTests = "debugTests",
}

export const withAndroidSdk = (ctr: Container) =>
  ctr
    .withEnvVariable("ANDROID_HOME", "/root/android-sdk")
    .withExec([
      "sh",
      "-c",
      "mkdir -p $ANDROID_HOME && wget --output-document=$ANDROID_HOME/cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip",
    ])
    .withExec([
      "sh",
      "-c",
      "cd $ANDROID_HOME && rm -rf cmdline-tools && unzip -d cmdline-tools cmdline-tools.zip && mv cmdline-tools/cmdline-tools cmdline-tools/latest",
    ])
    .withEnvVariable("PATH", "$PATH:$ANDROID_HOME/cmdline-tools/latest/bin", {
      expand: true,
    })
    .withExec(["sdkmanager", "--version"])
    .withExec(["sdkmanager", "platforms;android-33"])
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"]);

export const lintDebug = async (client: Client, src = ".") => {
  const context = client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline(Job.lintDebug)
        .container()
        .from("alpine:latest")
        .withExec(["apk", "update"])
        .withExec([
          "apk",
          "add",
          "bash",
          "curl",
          "openjdk11",
          "wget",
          "unzip",
          "git",
          "libstdc++",
          "zlib",
          "gcompat",
        ])
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withExec(["sh", "-c", "ls -ltr /nix"])
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = baseCtr
    .withMountedCache("/app/.gradle", client.cacheVolume("android-gradle"))
    .withMountedCache(
      "/root/.gradle",
      client.cacheVolume("android-gradle-cache")
    )
    .withMountedCache("/app/build", client.cacheVolume("android-build"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      client.cacheVolume("sdk-platforms")
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      client.cacheVolume("sdk-system-images")
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      client.cacheVolume("sdk-build-tools")
    )
    .withDirectory("/app", context, {
      exclude: ["build", ".gradle", "app/build", ".devbox", ".fluentci"],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec(["sh", "-c", "ls -ltr /nix"])
    .withExec(["nix", "--version"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- ./gradlew -Pci --console=plain :app:lintDebug -PbuildDir=lint",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const assembleDebug = async (client: Client, src = ".") => {
  const context = client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline(Job.assembleDebug)
        .container()
        .from("alpine:latest")
        .withExec(["apk", "update"])
        .withExec([
          "apk",
          "add",
          "bash",
          "curl",
          "openjdk11",
          "wget",
          "unzip",
          "git",
          "libstdc++",
          "zlib",
          "gcompat",
        ])
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = baseCtr
    .withMountedCache("/app/.gradle", client.cacheVolume("android-gradle"))
    .withMountedCache(
      "/root/.gradle",
      client.cacheVolume("android-gradle-cache")
    )
    .withMountedCache("/app/build", client.cacheVolume("android-build"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      client.cacheVolume("sdk-platforms")
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      client.cacheVolume("sdk-system-images")
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      client.cacheVolume("sdk-build-tools")
    )
    .withDirectory("/app", context, {
      exclude: ["build", ".gradle", "app/build", ".devbox", ".fluentci"],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec(["sh", "-c", "devbox run -- ./gradlew assembleDebug"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const assembleRelease = async (client: Client, src = ".") => {
  const context = client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline(Job.assembleRelease)
        .container()
        .from("alpine:latest")
        .withExec(["apk", "update"])
        .withExec([
          "apk",
          "add",
          "bash",
          "curl",
          "openjdk11",
          "wget",
          "unzip",
          "git",
          "libstdc++",
          "zlib",
          "gcompat",
        ])
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = baseCtr
    .withMountedCache("/app/.gradle", client.cacheVolume("android-gradle"))
    .withMountedCache(
      "/root/.gradle",
      client.cacheVolume("android-gradle-cache")
    )
    .withMountedCache("/app/build", client.cacheVolume("android-build"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      client.cacheVolume("sdk-platforms")
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      client.cacheVolume("sdk-system-images")
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      client.cacheVolume("sdk-build-tools")
    )
    .withDirectory("/app", context, {
      exclude: ["build", ".gradle", "app/build", ".devbox", ".fluentci"],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec(["sh", "-c", "devbox run -- ./gradlew assembleRelease"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const bundleRelease = async (client: Client, src = ".") => {
  const context = client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline(Job.bundleRelease)
        .container()
        .from("alpine:latest")
        .withEnvVariable("ANDROID_HOME", "/root/android-sdk")
        .withExec(["apk", "update"])
        .withExec([
          "apk",
          "add",
          "bash",
          "curl",
          "openjdk11",
          "wget",
          "unzip",
          "git",
          "libstdc++",
          "zlib",
          "gcompat",
        ])
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = baseCtr
    .withMountedCache("/app/.gradle", client.cacheVolume("android-gradle"))
    .withMountedCache(
      "/root/.gradle",
      client.cacheVolume("android-gradle-cache")
    )
    .withMountedCache("/app/build", client.cacheVolume("android-build"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      client.cacheVolume("sdk-platforms")
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      client.cacheVolume("sdk-system-images")
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      client.cacheVolume("sdk-build-tools")
    )
    .withDirectory("/app", context, {
      exclude: ["build", ".gradle", "app/build", ".devbox", ".fluentci"],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec(["sh", "-c", "devbox run -- ./gradlew bundleRelease"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const debugTests = async (client: Client, src = ".") => {
  const context = client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline(Job.debugTests)
        .container()
        .from("alpine:latest")
        .withExec(["apk", "update"])
        .withExec([
          "apk",
          "add",
          "bash",
          "curl",
          "openjdk11",
          "wget",
          "unzip",
          "git",
          "libstdc++",
          "zlib",
          "gcompat",
        ])
    )
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = baseCtr
    .withMountedCache("/app/.gradle", client.cacheVolume("android-gradle"))
    .withMountedCache(
      "/root/.gradle",
      client.cacheVolume("android-gradle-cache")
    )
    .withMountedCache("/app/build", client.cacheVolume("android-build"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      client.cacheVolume("sdk-platforms")
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      client.cacheVolume("sdk-system-images")
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      client.cacheVolume("sdk-build-tools")
    )
    .withDirectory("/app", context, {
      exclude: ["build", ".gradle", "app/build", ".devbox", ".fluentci"],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec([
      "sh",
      "-c",
      "devbox run -- ./gradlew -Pci --console=plain :app:testDebug",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export type JobExec = (client: Client, src?: string) => Promise<void>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.lintDebug]: lintDebug,
  [Job.assembleDebug]: assembleDebug,
  [Job.assembleRelease]: assembleRelease,
  [Job.bundleRelease]: bundleRelease,
  [Job.debugTests]: debugTests,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.lintDebug]: "Runs lintDebug",
  [Job.assembleDebug]: "Assembles debug apk",
  [Job.assembleRelease]: "Assembles release apk",
  [Job.bundleRelease]: "Bundles release apk",
  [Job.debugTests]: "Runs debug tests",
};
