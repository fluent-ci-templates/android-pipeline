import Client from "@dagger.io/dagger";

export const lintDebug = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline("lintDebug")
    .container()
    .from("openjdk:11-jdk")
    .withMountedCache("/app/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("root-gradle"))
    .withMountedCache("/app/build", client.cacheVolume("build"))
    .withDirectory("/app", context, { exclude: ["build"] })
    .withWorkdir("/app")
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec([
      "./gradlew",
      "-Pci",
      "--console=plain",
      ":app:lintDebug",
      "-PbuildDir=lint",
    ]);

  const result = await ctr.stdout();

  console.log(result);
};

export const assembleDebug = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline("assembleDebug")
    .container()
    .from("openjdk:11-jdk")
    .withMountedCache("/app/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("root-gradle"))
    .withMountedCache("/app/build", client.cacheVolume("build"))
    .withDirectory("/app", context, { exclude: ["build"] })
    .withWorkdir("/app")
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec(["./gradlew", "assembleDebug"]);

  const result = await ctr.stdout();

  console.log(result);
};

export const debugTests = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline("debugTests")
    .container()
    .from("openjdk:11-jdk")
    .withMountedCache("/app/.gradle", client.cacheVolume("gradle"))
    .withMountedCache("/root/.gradle", client.cacheVolume("root-gradle"))
    .withMountedCache("/app/build", client.cacheVolume("build"))
    .withDirectory("/app", context, { exclude: ["build"] })
    .withWorkdir("/app")
    .withExec(["chmod", "+x", "./gradlew"])
    .withExec(["./gradlew", "-Pci", "--console=plain", ":app:testDebug"]);

  const result = await ctr.stdout();

  console.log(result);
};
