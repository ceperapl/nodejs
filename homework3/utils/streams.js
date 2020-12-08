const fs = require('fs');
const { promisify } = require('util');
const minimist = require('minimist');
const through = require('through2');
const csvToJson = require('csv2json');
const { extname } = require('path');
const request = require('request');
const CombinedStream = require('combined-stream');

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);

const help = `Run the program with following options:
  -a, --action                action name. 
                              Can take on values: reverse, 
                                                  transform, 
                                                  outputFile, 
                                                  convertFromFile, 
                                                  convertToFile, 
                                                  cssBundler
  -f, --file                  file name. Uses in: outputFile, 
                                                  convertFromFile, 
                                                  convertToFile, 
  -p, --path                  path to dir with css files
                              Uses foor action cssBundler
  Examples of usage:
  --action=reverse
  --action=transform
  --action=outputFile --file='filename'
  --action=convertFromFile --file='filename'
  --action=convertToFile --file='filename'
  --action=cssBundler --path='path name'`;

const reverse = () => {
  process.stdin
    .pipe(through((chunk, enc, callback) => (
      callback(null, chunk.reverse())
    )))
    .pipe(process.stdout);
};

const transform = () => {
  process.stdin
    .pipe(through((chunk, enc, callback) => (
      callback(null, chunk.toString().toUpperCase())
    )))
    .pipe(process.stdout);
};

const outputFile = (filePath) => {
  fs.createReadStream(filePath)
    .on('error', (error) => {console.error("Caught", error)})
    .pipe(process.stdout);
};

const convertFromFile = (filePath) => {
  fs.createReadStream(filePath)
    .on('error', (error) => {console.error("Caught", error)})
    .pipe(csvToJson())
    .pipe(through((chunk, enc, callback) => (
      callback(null, chunk)
    )))
    .pipe(process.stdout);
};

const convertToFile = (filePath) => {
  fs.createReadStream(filePath)
    .on('error', (error) => {console.error("Caught", error)})
    .pipe(csvToJson())
    .pipe(through((chunk, enc, callback) => (
      callback(null, chunk)
    )))
    .pipe(fs.createWriteStream(filePath.replace('.csv', '.json')));
};

const cssBundler = async (dirPath) => {
  try {
    const dirItems = await readdir(dirPath);
    const cssFiles = dirItems.filter(item => {
      return item !== 'bundle.css' && extname(item) === '.css';
    });

    const bundleWriteStream = fs.createWriteStream(`${dirPath}/bundle.css`);
    const url = 'https://raw.githubusercontent.com/ceperapl/nodejs/HW-3/homework3/nodejs-homework3.css';

    const combinedStream = CombinedStream.create();

    cssFiles.map(item => combinedStream.append(fs.createReadStream(`${dirPath}/${item}`)));
    combinedStream.append(request(url));
    combinedStream.pipe(bundleWriteStream);
  } catch (exception) {
    console.error("Caught", exception);
  }
};

const args = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
    action: 'a',
    file: 'f',
    path: 'p',
  },
  unknown: arg => console.error(`Unknown option: ${arg}`),
});

const firstArg = process.argv[2];

if (firstArg === "--help" || firstArg === "-h") {
  console.log(help);
} else {
  switch (args.action) {
    case 'reverse':
      reverse();
      break;
    case 'transform':
      transform();
      break;
    case 'outputFile':
      if (args.file) {
        outputFile(args.file);
      } else {
        console.log(`Program was runned with action 'outputFile'. Filename wasn't entered!`);
        console.log(help);
      }
      break;
    case 'convertFromFile':
      if (args.file) {
        convertFromFile(args.file);
      } else {
        console.log(`Program was runned with action 'convertFromFile'. Filename wasn't entered!`);
        console.log(help);
      }
      break;
    case 'convertToFile':
      if (args.file) {
        convertToFile(args.file);
      } else {
        console.log(`Program was runned with action 'convertToFile'. Filename wasn't entered!`);
        console.log(help);
      }
      break;
    case 'cssBundler':
      if (args.path) {
        cssBundler(args.path);
      } else {
        console.log(`Program was runned with action 'cssBundler'. Path wasn't entered!`);
        console.log(help);
      }
      break;
    default:
      console.log(`There is no actions with name '${args.action}'!`);
      console.log(help);
  }
}
