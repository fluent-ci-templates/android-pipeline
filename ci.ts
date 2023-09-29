import Client, { connect } from "https://sdk.fluentci.io/v0.1.9/mod.ts";
import {
  lintDebug,
  assembleDebug,
  debugTests,
} from "https://pkg.fluentci.io/android_pipeline@v0.6.2/mod.ts";

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await lintDebug(client, src);
    await assembleDebug(client, src);
    await debugTests(client, src);
  });
}

pipeline();
