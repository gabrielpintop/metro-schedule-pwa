'use strict';

const Gatherer = require('lighthouse').Gatherer;

class FirstCallTime extends Gatherer {
    afterPass(options) {
        const driver = options.driver;

        return driver.evaluateAsync('window.firstAPICall')
            .then(firstAPICall => {
                if (!firstAPICall) {

                    throw new Error('Unable to find first API call response metrics in page');
                }
                return firstAPICall;
            });
    }
}

module.exports = FirstCallTime;