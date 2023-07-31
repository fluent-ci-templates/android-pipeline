# Android Pipeline

[![deno module](https://shield.deno.dev/x/android_pipeline)](https://deno.land/x/android_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/android-pipeline)](https://codecov.io/gh/fluent-ci-templates/android-pipeline)

A ready-to-use CI/CD Pipeline for your Android projects.

## 🚀 Usage

Run the following command:

```bash
dagger run fluentci android_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t android
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
dagger run fluentci .
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
import Client, { connect } from "@dagger.io/dagger";
import { Dagger } from "https://deno.land/x/android_pipeline/mod.ts";

const { lintDebug, assembleDebug, debugTests } = Dagger;

export default function pipeline(src = ".") {
  connect(async (client: Client) => {
    await lintDebug(client, src);
    await assembleDebug(client, src);
    await debugTests(client, src);
  });
}
```
