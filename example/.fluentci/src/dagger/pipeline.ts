import * as jobs from "./jobs.ts";
const { assembleDebug, debugTests, lintDebug, runnableJobs } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (args.length > 0) {
    await runSpecificJobs(src, args as jobs.Job[]);
    return;
  }

  await lintDebug(src);
  await debugTests(src);
  await assembleDebug(src);
}

async function runSpecificJobs(src: string, args: jobs.Job[]) {
  for (const name of args) {
    const job = runnableJobs[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job(src);
  }
}
