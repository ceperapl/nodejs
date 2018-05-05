import DirWatcher from 'dirwatcher';
import Importer from 'importer';
import csvjson from 'csvjson';
import { watchDir, delay, encoding, csvjsonOptions } from './conf';

const dirWatcher = new DirWatcher(watchDir, delay);
const importer = new Importer(csvjson, csvjsonOptions, encoding);

dirWatcher.on('changed', (path) => {
  importer.import(path)
    .then((data) => {
      console.log(data);
    });
});

console.log('The application was running');
