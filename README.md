# Android Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fandroid_pipeline&query=%24.version)](https://pkg.fluentci.io/android_pipeline)
[![deno module](https://shield.deno.dev/x/android_pipeline)](https://deno.land/x/android_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/android-pipeline)](https://codecov.io/gh/fluent-ci-templates/android-pipeline)

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

## Jobs

| Job            | Description           |
| -------------- | --------------------- |
| lintDebug      | Lint your code        |
| assembleDebug  | generate apk (debug)  |
| debugTests     | Run your tests        |
| assembleRelease| generate apk (release)|
| bundleRelease  | generate aab (release)|

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import Client, { connect } from "https://sdk.fluentci.io/v0.1.9/mod.ts";
import { lintDebug, assembleDebug, debugTests } from "https://pkg.fluentci.io/android_pipeline@v0.6.2/mod.ts";


function pipeline(src = ".") {
  connect(async (client: Client) => {
    await lintDebug(client, src);
    await assembleDebug(client, src);
    await debugTests(client, src);
  });
}

pipeline();
```
