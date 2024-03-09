/**
 * @module android
 * @description This module provides a set of functions for building Android applications.
 */

import { dag, Directory, File, Container } from "../../deps.ts";
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
 * Run lintDebug
 *
 * @function
 * @description Run lintDebug
 * @param {string | Directory | undefined} src
 * @returns {Promise<string>}
 */
export async function lintDebug(
  src: string | Directory | undefined = "."
): Promise<string> {
  const context = await getDirectory(src);

  const ctr = dag
    .pipeline(Job.lintDebug)
    .container()
    .from("ghcr.io/fluentci-io/android:latest")
    .withMountedCache("/app/.gradle", dag.cacheVolume("android-gradle"))
    .withMountedCache("/root/.gradle", dag.cacheVolume("android-gradle-cache"))
    .withMountedCache("/app/build", dag.cacheVolume("android-build"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      dag.cacheVolume("sdk-platforms")
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      dag.cacheVolume("sdk-system-images")
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      dag.cacheVolume("sdk-build-tools")
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

  return ctr.stdout();
}

/**
 * Build debug apk
 *
 * @function
 * @description Build debug apk
 * @param {string | Directory | undefined} src
 * @returns {Promise<File | string>}
 */
export async function assembleDebug(
  src: string | Directory | undefined = "."
): Promise<File | string> {
  const context = await getDirectory(src);

  const ctr = dag
    .pipeline(Job.assembleDebug)
    .container()
    .from("ghcr.io/fluentci-io/android:latest")
    .withMountedCache("/app/.gradle", dag.cacheVolume("android-gradle"))
    .withMountedCache("/root/.gradle", dag.cacheVolume("android-gradle-cache"))
    .withMountedCache("/app/build", dag.cacheVolume("android-build"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      dag.cacheVolume("sdk-platforms")
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      dag.cacheVolume("sdk-system-images")
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      dag.cacheVolume("sdk-build-tools")
    )
    .withDirectory("/app", context, {
      exclude,
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec(["sh", "-c", "devbox run -- ./gradlew assembleDebug"]);

  await ctr.stdout();
  return ctr.file("/app/app/build/outputs/apk/debug/app-debug.apk").id();
}

/**
 * Build release apk
 *
 * @function
 * @description Build release apk
 * @param {string | Directory | undefined} src
 * @param {boolean} signed
 * @returns {Promise<File | string>}
 */
export async function assembleRelease(
  src: string | Directory | undefined = ".",
  signed = false
): Promise<File | string> {
  const context = await getDirectory(src);

  const ctr = dag
    .pipeline(Job.assembleRelease)
    .container()
    .from("ghcr.io/fluentci-io/android:latest")
    .withMountedCache("/app/.gradle", dag.cacheVolume("android-gradle"))
    .withMountedCache("/root/.gradle", dag.cacheVolume("android-gradle-cache"))
    .withMountedCache("/app/build", dag.cacheVolume("android-build"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      dag.cacheVolume("sdk-platforms")
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      dag.cacheVolume("sdk-system-images")
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      dag.cacheVolume("sdk-build-tools")
    )
    .withDirectory("/app", context, {
      exclude,
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec(["sh", "-c", "devbox run -- ./gradlew assembleRelease"]);

  await ctr.stdout();
  return ctr
    .file(
      `/app/app/build/outputs/apk/release/app-release${
        signed ? "" : "-unsigned"
      }.apk`
    )
    .id();
}

/**
 * Build release aab
 *
 * @function
 * @description Build release aab
 * @param {string | Directory | undefined} src
 * @returns {Promise<File | string>}
 */
export async function bundleRelease(
  src: string | Directory | undefined = "."
): Promise<File | string> {
  const context = await getDirectory(src);

  const ctr = dag
    .pipeline(Job.bundleRelease)
    .container()
    .from("ghcr.io/fluentci-io/android:latest")
    .withMountedCache("/app/.gradle", dag.cacheVolume("android-gradle"))
    .withMountedCache("/root/.gradle", dag.cacheVolume("android-gradle-cache"))
    .withMountedCache("/app/build", dag.cacheVolume("android-build"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      dag.cacheVolume("sdk-platforms")
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      dag.cacheVolume("sdk-system-images")
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      dag.cacheVolume("sdk-build-tools")
    )
    .withDirectory("/app", context, {
      exclude,
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec(["sh", "-c", "devbox run -- ./gradlew bundleRelease"]);
  await ctr.stdout();
  return ctr.file("/app/app/build/outputs/bundle/release/app-release.aab").id();
}

/**
 * Run debug tests
 *
 * @function
 * @description Run debug tests
 * @param {string | Directory | undefined} src
 * @returns {Promise<string>}
 */
export async function debugTests(
  src: string | Directory | undefined = "."
): Promise<string> {
  const context = await getDirectory(src);

  const ctr = dag
    .pipeline(Job.debugTests)
    .container()
    .from("ghcr.io/fluentci-io/android:latest")
    .withMountedCache("/app/.gradle", dag.cacheVolume("android-gradle"))
    .withMountedCache("/root/.gradle", dag.cacheVolume("android-gradle-cache"))
    .withMountedCache("/app/build", dag.cacheVolume("android-build"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      dag.cacheVolume("sdk-platforms")
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      dag.cacheVolume("sdk-system-images")
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      dag.cacheVolume("sdk-build-tools")
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

  return ctr.stdout();
}

/**
 * Return a Container with Android SDK and Nix installed
 *
 * @function
 * @description Return a Container with Android SDK and Nix installed
 * @param {string | Directory | undefined} src
 * @returns {Promise<Container | string>}
 */
export async function dev(
  src: string | Directory | undefined = "."
): Promise<Container | string> {
  const context = await getDirectory(src);

  const ctr = dag
    .pipeline(Job.bundleRelease)
    .container()
    .from("ghcr.io/fluentci-io/android:latest")
    .withMountedCache("/app/.gradle", dag.cacheVolume("android-gradle"))
    .withMountedCache("/root/.gradle", dag.cacheVolume("android-gradle-cache"))
    .withMountedCache("/app/build", dag.cacheVolume("android-build"))
    .withMountedCache(
      "/root/android-sdk/platforms",
      dag.cacheVolume("sdk-platforms")
    )
    .withMountedCache(
      "/root/android-sdk/system-images",
      dag.cacheVolume("sdk-system-images")
    )
    .withMountedCache(
      "/root/android-sdk/build-tools",
      dag.cacheVolume("sdk-build-tools")
    )
    .withDirectory("/app", context, {
      exclude,
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withExec(["chmod", "+x", "./gradlew"]);

  await ctr.stdout();
  return ctr.id();
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
