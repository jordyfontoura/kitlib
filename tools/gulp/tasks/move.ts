import { dest, src, task } from 'gulp';
import { join } from 'path';
import { samplePath } from '../config';
import { containsPackageJson, getDirs } from '../util/task-helpers';

/**
 * Moves the compiled kitlib files into the `samples/*` dirs.
 */
function move() {
  const samplesDirs = getDirs(samplePath);
  const distFiles = src(['node_modules/@kitlib/**/*']);

  /**
   * Flatten the sampleDirs
   * If a sample dir contains does not contain a package.json
   * Push the subDirs into the destinations instead
   */
  const flattenedSampleDirs: string[] = [];

  for (const sampleDir of samplesDirs) {
    if (containsPackageJson(sampleDir)) {
      flattenedSampleDirs.push(sampleDir);
    } else {
      flattenedSampleDirs.push(...getDirs(sampleDir));
    }
  }

  return flattenedSampleDirs.reduce(
    (distFile, dir) => distFile.pipe(dest(join(dir, '/node_modules/@kitlib'))),
    distFiles
  );
}

task('move', move);
