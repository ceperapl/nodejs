import app from './app';
import db from './models';
import logger from './utils/logger';

const port = process.env.PORT || 8080;

db.sequelize.sync().then(() => {
  app.listen(port, () => logger.info(`App listening on port ${port}!`));
});
