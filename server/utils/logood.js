const log4js = require('log4js');
// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Comté.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');
/**
 * Autor - Romario Estrada - www.romaef.com
 * [crearLog Depende de log4js y es una fucnion que recibe dos parametros, el mensaje y el nivel de log,
 * si es trace, debug, info, warn, error, fatal.]
 * @param  {[String]} message [mensaje]
 * @param  {[String]} level   [el nivel de log (trace, debug, info, warn, error, fatal)]
 * @return {[Boolean]}         []
 */
let crearLog = function(message, level) {
    if (message != '' && level != '') {
        log4js.configure({
            appenders: {
                info: {
                    type: 'file',
                    filename: 'info.log'
                }
            }, // crea el archivo
            categories: {
                default: {
                    appenders: ['info'],
                    level: level
                }
            } // es de tipo informativo y el nivel de error es...
        });
        const logger = log4js.getLogger('info'); // el nombre del archivo
        if (level == 'trace') {
            logger.trace(message);
        }
        if (level == 'debug') {
            logger.debug(message);
        }
        if (level == 'info') {
            logger.info(message);
        }
        if (level == 'warn') {
            logger.warn(message);
        }
        if (level == 'error') {
            logger.error(message);
        }
        if (level == 'fatal') {
            logger.fatal(message);
        }
    }
}
exports.crearLog = crearLog;