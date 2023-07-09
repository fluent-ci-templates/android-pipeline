import Client, { connect } from "@dagger.io/dagger";
import { assembleDebug, debugTests, lintDebug } from "./jobs.ts";

export default function pipeline(src = ".") {
  connect(async (client: Client) => {
    await lintDebug(client, src);
    await assembleDebug(client, src);
    await debugTests(client, src);
  });
}
