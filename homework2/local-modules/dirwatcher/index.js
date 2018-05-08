import EventEmitter from 'events';
import { promisify } from 'util';
import fs from 'fs';
import { datesEqual, readDirRecursive } from './utils';

const stat = promisify(fs.stat);

export default class DirWatcher extends EventEmitter {
  constructor(path, delay) {
    super();
    this.files = {};
    this.watch(path, delay);
  }

  watch(path, delay) {
    setInterval(() => {
      this.dirProcess(path);
    }, delay);
  }

  async checkFile(filePath) {
    const fileStat = await stat(filePath);
    const fileMtime = this.files[filePath];
    if (fileMtime) {
      if (!datesEqual(fileMtime, fileStat.mtime)) {
        this.emit('changed', filePath);
        this.files[filePath] = fileStat.mtime;
      }
    } else {
      this.files[filePath] = fileStat.mtime;
      this.emit('created', filePath);
    }
  }

  dirProcess(path) {
    readDirRecursive(path)
      .then((files) => {
        files.forEach((file) => {
          this.checkFile(file);
        });
        for (const filePath in this.files) {
          if (!files.find(file => file === filePath)) {
            this.emit('removed', filePath);
            delete this.files[filePath];
          }
        }
      })
      .catch(e => console.error(e));
  }
}
