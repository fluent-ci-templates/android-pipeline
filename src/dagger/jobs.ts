import { Directory, File, Container } from "../../deps.ts";
import { Client } from "../../sdk/client.gen.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  lintDebug = "lintDebug",
  assembleDebug = "assembleDebug",
  assembleRelease = "assembleRelease",
  bundleRelease = "bundleRelease",
  debugTests = "debugTests",
  dev = "dev",
}

export const exclude = [
  "build",
  ".gradle",
  "app/build",
  ".devbox",
  ".fluentci",
];

/**
 * @function
 * @description Runs lintDebug
 * @param {string | Directory | undefined} src
 * @returns {Promise<string>}
 */
export async function lintDebug(
  src: string | Directory | undefined = "."
): Promise<string> {
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);

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

    result = await ctr.stdout();
  });
  return result;
}

/**
 * @function
 * @description Assembles debug apk
 * @param {string | Directory | undefined} src
 * @returns {Promise<File | string>}
 */
export async function assembleDebug(
  src: string | Directory | undefined = "."
): Promise<File | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);

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
      .withExec(["sh", "-c", "devbox run -- ./gradlew assembleDebug"])
      .withExec(["cp", "/app/build/outputs/apk/debug/app-debug.apk", "/"]);

    await ctr.stdout();
    id = await ctr.file("/app-debug.apk").id();
  });
  return id;
}

/**
 * @function
 * @description Assembles release apk
 * @param {string | Directory | undefined} src
 * @returns {Promise<File | string>}
 */
export async function assembleRelease(
  src: string | Directory | undefined = "."
): Promise<File | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);

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
      .withExec(["sh", "-c", "devbox run -- ./gradlew assembleRelease"])
      .withExec(["cp", "/app/build/outputs/apk/release/app-release.apk", "/"]);

    await ctr.stdout();
    id = await ctr.file("/app-release.apk").id();
  });
  return id;
}

/**
 * @function
 * @description Bundles release apk
 * @param {string | Directory | undefined} src
 * @returns {Promise<File | string>}
 */
export async function bundleRelease(
  src: string | Directory | undefined = "."
): Promise<File | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);

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
      .withExec(["sh", "-c", "devbox run -- ./gradlew bundleRelease"])
      .withExec([
        "cp",
        "/app/build/outputs/bundle/release/app-release.aab",
        "/",
      ]);

    await ctr.stdout();
    id = await ctr.file("/app-release.aab").id();
  });
  return id;
}

/**
 * @function
 * @description Runs debug tests
 * @param {string | Directory | undefined} src
 * @returns {Promise<string>}
 */
export async function debugTests(
  src: string | Directory | undefined = "."
): Promise<string> {
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);

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

    result = await ctr.stdout();
  });
  return result;
}

/**
 * @function
 * @description Returns a Container with Android SDK and Nix installed
 * @param {string | Directory | undefined} src
 * @returns {Promise<Container | string>}
 */
export async function dev(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);

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
      .withExec(["chmod", "+x", "./gradlew"]);

    await ctr.stdout();
    id = await ctr.id();
  });
  return id;
}

export type JobExec = (
  src?: string | Directory
) => Promise<Directory | File | Container | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.lintDebug]: lintDebug,
  [Job.assembleDebug]: assembleDebug,
  [Job.assembleRelease]: assembleRelease,
  [Job.bundleRelease]: bundleRelease,
  [Job.debugTests]: debugTests,
  [Job.dev]: dev,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.lintDebug]: "Runs lintDebug",
  [Job.assembleDebug]: "Assembles debug apk",
  [Job.assembleRelease]: "Assembles release apk",
  [Job.bundleRelease]: "Bundles release apk",
  [Job.debugTests]: "Runs debug tests",
  [Job.dev]: "Returns a Container with Android SDK and Nix installed",
};
