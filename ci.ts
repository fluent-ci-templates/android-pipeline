import { lintDebug, assembleDebug, debugTests } from "jsr:@fluentci/android";

await lintDebug();
await debugTests();
await assembleDebug();
