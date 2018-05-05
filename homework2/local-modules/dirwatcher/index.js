import EventEmitter from 'events';
import fs from 'fs';

function datesEqual(a, b) {
  return !(a > b || b > a);
}

export default class DirWatcher extends EventEmitter {
  constructor(path, delay) {
    super();
    this.files = [];
    this.watch(path, delay);
  }

  watch(path, delay) {
    setInterval(() => {
      this.dirProcess(path);
    }, delay);
  }

  checkFile(filePath) {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.log(err);
      } else {
        const searchedFiles = this.files.filter(file => (filePath === file.path));
        if (searchedFiles.length !== 0) {
          if (!datesEqual(searchedFiles[0].mtime, stats.mtime)) {
            this.emit('changed', filePath);
            for (let i = 0; i < this.files.length; i += 1) {
              if (this.files[i].path === searchedFiles[0].path) {
                this.files[i].mtime = stats.mtime;
              }
            }
          }
        } else {
          this.files.push({
            path: filePath,
            mtime: stats.mtime,
          });
        }
      }
    });
  }

  dirProcess(path) {
    fs.readdir(path, (err, items) => {
      if (err) {
        console.log(err);
      } else {
        items.forEach((item) => {
          const filePath = `${path}/${item}`;
          this.checkFile(filePath);
        });
      }
    });
  }
}
