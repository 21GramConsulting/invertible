import {execSync} from "child_process";
import packageJson from "./package.json" assert {type: "json"};

let moduleNameMapper;


if (process.env.TEST_AGAINST_ARTIFACTS) {
  execSync(`npm run clean`);
  execSync(`npm run build`);
} else {
  moduleNameMapper = Object.fromEntries(
    Object
      .entries(packageJson.exports)
      .map(([name, entry]) => [
        `^` + name.replace(/^./, `@21gram-consulting/invertible`) + `$`,
        entry
          .import
          .replace(/^.\/lib\//, `<rootDir>`)
          .replace(/\.js$/, `.ts`)
      ])
  )
}

export default {
  testEnvironment: `node`,
  roots: [`<rootDir>`],
  setupFilesAfterEnv: [`<rootDir>/test/expect.ts`],
  transform: {
    "^.+\\.(t|j)sx?$": `@swc/jest`
  },
  extensionsToTreatAsEsm: [`.ts`],
  moduleNameMapper
};