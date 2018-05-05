import fs from 'fs';

export default class Importer {
  constructor(parser, parserOptions, encoding) {
    this.parser = parser;
    this.parserOptions = parserOptions;
    this.encoding = encoding;
  }

  import(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, this.encoding, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(this.parser.toObject(data, this.parserOptions));
      });
    });
  }

  importSync(path) {
    const data = fs.readFileSync(path, this.encoding);
    return this.parser.toObject(data, this.parserOptions);
  }
}
