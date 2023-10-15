import {
  queryType,
  makeSchema,
  dirname,
  join,
  resolve,
  stringArg,
  nonNull,
} from "../../deps.ts";

import {
  lintDebug,
  assembleDebug,
  assembleRelease,
  bundleRelease,
  debugTests,
} from "./jobs.ts";

const Query = queryType({
  definition(t) {
    t.string("lintDebug", {
      args: {
        src: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) => await lintDebug(args.src),
    });
    t.string("assembleDebug", {
      args: {
        src: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) => await assembleDebug(args.src),
    });
    t.string("assembleRelease", {
      args: {
        src: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) => await assembleRelease(args.src),
    });
    t.string("bundleRelease", {
      args: {
        src: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) => await bundleRelease(args.src),
    });
    t.string("debugTests", {
      args: {
        src: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) => await debugTests(args.src),
    });
  },
});

export const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: resolve(join(dirname(".."), dirname(".."), "schema.graphql")),
    typegen: resolve(join(dirname(".."), dirname(".."), "gen", "nexus.ts")),
  },
});
