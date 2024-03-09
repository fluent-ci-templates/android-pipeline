# Android Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fandroid_pipeline&query=%24.version)](https://pkg.fluentci.io/android_pipeline)
[![deno module](https://shield.deno.dev/x/android_pipeline)](https://deno.land/x/android_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF&labelColor=000000)](https://dagger.io)
[![](https://jsr.io/badges/@fluentci/android)](https://jsr.io/@fluentci/android)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/android-pipeline)](https://codecov.io/gh/fluent-ci-templates/android-pipeline)
[![ci](https://github.com/fluent-ci-templates/android-pipeline/actions/workflows/ci.yml/badge.svg)](https://github.com/fluent-ci-templates/android-pipeline/actions/workflows/ci.yml)


A ready-to-use CI/CD Pipeline for your Android projects.

## 🚀 Usage

Run the following command:

```bash
fluentci run android_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t android
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
fluentci run .
```

## 🧩 Dagger Module

Use as a [Dagger](https://dagger.io) module:

```bash
dagger install github.com/fluent-ci-templates/android-pipeline@main
```

Call a function from the module:

```bash
dagger call assemble-release --src .
dagger call bundle-release --src .
```

## ✨ Jobs

| Job            | Description           |
| -------------- | --------------------- |
| lintDebug      | Lint your code        |
| assembleDebug  | generate apk (debug)  |
| debugTests     | Run your tests        |
| assembleRelease| generate apk (release)|
| bundleRelease  | generate aab (release)|

```typescript

lintDebug(
  src?: string | Directory
): Promise<string>

assembleDebug(
  src?: string | Directory
): Promise<File | string>

assembleRelease(
  src?: string | Directory
): Promise<File | string>

bundleRelease(
  src?: string | Directory
): Promise<File | string>

debugTests(
  src?: string | Directory
): Promise<string>
```

## 👨‍💻 Programmatic usage

You can also use this pipeline programmatically:

```ts
import { lintDebug, assembleDebug, debugTests } from "jsr:@fluentci/android";

await lintDebug();
await debugTests();
await assembleDebug();
```

## 📚 Example

See [example](https://github.com/fluent-ci-templates/android-pipeline/tree/main/example) for a working example.