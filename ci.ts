import {
  lintDebug,
  assembleDebug,
  debugTests,
} from "https://pkg.fluentci.io/android_pipeline@v0.7.0/mod.ts";

await lintDebug();
await debugTests();
await assembleDebug();
