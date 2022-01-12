const router = require('./router');
const args = process.argv.slice(2, process.argv.length);
router(args);
