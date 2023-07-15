import Client, { Container } from "@dagger.io/dagger";
import { withDevbox } from "https://deno.land/x/nix_installer_pipeline@v0.3.3/src/dagger/steps.ts";

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
        .pipeline("lintDebug")
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
  );

  const ctr = baseCtr
    .withMountedCache("/nix", client.cacheVolume("nix"))
    .withMountedCache("/app/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("gradle-cache"))
    .withMountedCache("/app/build", client.cacheVolume("build"))
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
      exclude: ["build", ".gradle", "app/build"],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec([
      "sh",
      "-c",
      "eval $(devbox shell --print-env) && ./gradlew -Pci --console=plain :app:lintDebug -PbuildDir=lint",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const assembleDebug = async (client: Client, src = ".") => {
  const context = client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline("assembleDebug")
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
  );

  const ctr = baseCtr
    .withMountedCache("/nix", client.cacheVolume("nix"))
    .withMountedCache("/app/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("gradle-cache"))
    .withMountedCache("/app/build", client.cacheVolume("build"))
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
      exclude: ["build", ".gradle", "app/build"],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec([
      "sh",
      "-c",
      "eval $(devbox shell --print-env) && ./gradlew assembleDebug",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const assembleRelease = async (client: Client, src = ".") => {
  const context = client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline("assembleRelease")
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
  );

  const ctr = baseCtr
    .withMountedCache("/nix", client.cacheVolume("nix"))
    .withMountedCache("/app/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("gradle-cache"))
    .withMountedCache("/app/build", client.cacheVolume("build"))
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
      exclude: ["build", ".gradle", "app/build"],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec([
      "sh",
      "-c",
      "eval $(devbox shell --print-env) && ./gradlew assembleRelease",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const bundleRelease = async (client: Client, src = ".") => {
  const context = client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline("bundleRelease")
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
  );

  const ctr = baseCtr
    .withMountedCache("/nix", client.cacheVolume("nix"))
    .withMountedCache("/app/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("gradle-cache"))
    .withMountedCache("/app/build", client.cacheVolume("build"))
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
      exclude: ["build", ".gradle", "app/build"],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec([
      "sh",
      "-c",
      "eval $(devbox shell --print-env) && ./gradlew bundleRelease",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const debugTests = async (client: Client, src = ".") => {
  const context = client.host().directory(src);

  const baseCtr = withDevbox(
    withAndroidSdk(
      client
        .pipeline("debugTests")
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
  );

  const ctr = baseCtr
    .withMountedCache("/nix", client.cacheVolume("nix"))
    .withMountedCache("/app/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("gradle-cache"))
    .withMountedCache("/app/build", client.cacheVolume("build"))
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
      exclude: ["build", ".gradle", "app/build"],
    })
    .withWorkdir("/app")
    .withExec(["sh", "-c", "yes | sdkmanager --licenses"])
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec([
      "sh",
      "-c",
      "eval $(devbox shell --print-env) && ./gradlew -Pci --console=plain :app:testDebug",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};
