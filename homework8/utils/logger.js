import winston from 'winston';

const { createLogger, format, transports } = winston;
const {
  combine,
  timestamp,
  label,
  printf,
} = format;

const myFormat = printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`);

const logger = createLogger({
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat,
  ),
  transports: [new transports.Console()],
});

export default logger;
