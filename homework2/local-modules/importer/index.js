import fs from 'fs';
import { extname } from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

export default class Importer {
  constructor(parser, parserOptions, encoding) {
    this.parser = parser;
    this.parserOptions = parserOptions;
    this.encoding = encoding;
  }

  import(path) {
    return new Promise(async (resolve) => {
      const data = await readFileAsync(path, this.encoding);
      if (extname(path) === '.csv') {
        resolve(this.parser.toObject(data, this.parserOptions));
      }
    });
  }

  importSync(path) {
    const data = fs.readFileSync(path, this.encoding);
    return this.parser.toObject(data, this.parserOptions);
  }
}
