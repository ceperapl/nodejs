import { promisify } from 'util';
import { resolve } from 'path';
import fs from 'fs';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

export async function readDirRecursive(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? readDirRecursive(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

export function datesEqual(a, b) {
  return !(a > b || b > a);
}

