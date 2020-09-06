'use strict';

const Audit = require('lighthouse').Audit;

const MAX_CALL_TIME = 2000;

class FirstCallAudit extends Audit {
    static get meta() {
        return {
            id: 'first-call-audit',
            title: 'First call audit',
            category: 'MyPerformance',
            name: 'first-call-audit',
            description: 'First call to API with response time',
            failureDescription: 'First call API slow to respond',
            helpText: 'Used to measure time that takes to get the first call to API response',
            requiredArtifacts: ['FirstCallTime']
        };
    }

    static audit(artifacts) {
        const responseTime = artifacts.FirstCallTime;

        const belowThreshold = responseTime <= MAX_CALL_TIME;

        return {
            displayValue: responseTime,
            score: Number(belowThreshold)
        };
    }
}

module.exports = FirstCallAudit;