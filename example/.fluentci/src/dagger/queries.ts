import { gql } from "../../deps.ts";

export const lintDebug = gql`
  query lintDebug($src: String!) {
    lintDebug(src: $src)
  }
`;

export const assembleDebug = gql`
  query assembleDebug($src: String!) {
    assembleDebug(src: $src)
  }
`;

export const assembleRelease = gql`
  query assembleRelease($src: String!) {
    assembleRelease(src: $src)
  }
`;

export const bundleRelease = gql`
  query bundleRelease($src: String!) {
    bundleRelease(src: $src)
  }
`;

export const debugTests = gql`
  query debugTests($src: String!) {
    debugTests(src: $src)
  }
`;
