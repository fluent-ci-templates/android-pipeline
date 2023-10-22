import Client, { connect } from "../../deps.ts";

export enum Job {
  lintDebug = "lintDebug",
  assembleDebug = "assembleDebug",
  assembleRelease = "assembleRelease",
  bundleRelease = "bundleRelease",
  debugTests = "debugTests",
}

export const exclude = [
  "build",
  ".gradle",
  "app/build",
  ".devbox",
  ".fluentci",
];

export const lintDebug = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);

    const ctr = client
      .pipeline(Job.lintDebug)
      .container()
      .from("ghcr.io/fluentci-io/android:latest")
      .withExec(["mv", "/nix/store", "/nix/store-orig"])
      .withMountedCache("/nix/store", client.cacheVolume("nix-cache"))
      .withExec(["sh", "-c", "cp -r /nix/store-orig/* /nix/store/"])
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
        exclude,
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
  });
  return "done";
};

export const assembleDebug = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);

    const ctr = client
      .pipeline(Job.assembleDebug)
      .container()
      .from("ghcr.io/fluentci-io/android:latest")
      .withExec(["mv", "/nix/store", "/nix/store-orig"])
      .withMountedCache("/nix/store", client.cacheVolume("nix-cache"))
      .withExec(["sh", "-c", "cp -r /nix/store-orig/* /nix/store/"])
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
        exclude,
      })
      .withWorkdir("/app")
      .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
      .withExec(["chmod", "+x", "./gradlew"])
      .withExec(["sh", "-c", "devbox run -- ./gradlew assembleDebug"]);

    const result = await ctr.stdout();

    console.log(result);
  });
  return "done";
};

export const assembleRelease = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);

    const ctr = client
      .pipeline(Job.assembleRelease)
      .container()
      .from("ghcr.io/fluentci-io/android:latest")
      .withExec(["mv", "/nix/store", "/nix/store-orig"])
      .withMountedCache("/nix/store", client.cacheVolume("nix-cache"))
      .withExec(["sh", "-c", "cp -r /nix/store-orig/* /nix/store/"])
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
        exclude,
      })
      .withWorkdir("/app")
      .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
      .withExec(["chmod", "+x", "./gradlew"])
      .withExec(["sh", "-c", "devbox run -- ./gradlew assembleRelease"]);

    const result = await ctr.stdout();

    console.log(result);
  });
  return "done";
};

export const bundleRelease = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);

    const ctr = client
      .pipeline(Job.bundleRelease)
      .container()
      .from("ghcr.io/fluentci-io/android:latest")
      .withExec(["mv", "/nix/store", "/nix/store-orig"])
      .withMountedCache("/nix/store", client.cacheVolume("nix-cache"))
      .withExec(["sh", "-c", "cp -r /nix/store-orig/* /nix/store/"])
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
        exclude,
      })
      .withWorkdir("/app")
      .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
      .withExec(["chmod", "+x", "./gradlew"])
      .withExec(["sh", "-c", "devbox run -- ./gradlew bundleRelease"]);

    const result = await ctr.stdout();

    console.log(result);
  });
  return "done";
};

export const debugTests = async (src = ".") => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);

    const ctr = client
      .pipeline(Job.debugTests)
      .container()
      .from("ghcr.io/fluentci-io/android:latest")
      .withExec(["mv", "/nix/store", "/nix/store-orig"])
      .withMountedCache("/nix/store", client.cacheVolume("nix-cache"))
      .withExec(["sh", "-c", "cp -r /nix/store-orig/* /nix/store/"])
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
        exclude,
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
  });
  return "done";
};

export type JobExec = (src?: string) => Promise<string>;

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
