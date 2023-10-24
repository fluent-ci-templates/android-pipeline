import {
  lintDebug,
  assembleDebug,
  debugTests,
} from "https://pkg.fluentci.io/android_pipeline@v0.7.1/mod.ts";

await lintDebug();
await debugTests();
await assembleDebug();
