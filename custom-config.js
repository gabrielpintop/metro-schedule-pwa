'use strict';

module.exports = {

    extends: 'lighthouse:default',

    passes: [{
        passName: 'defaultPass',
        gatherers: [
            'ratp-lighthouse-recipe/card-audit/card-gatherer',
            'ratp-lighthouse-recipe/first-call-audit/first-call-gatherer'
        ]
    }],

    audits: [
        'ratp-lighthouse-recipe/card-audit/card-audit',
        'ratp-lighthouse-recipe/first-call-audit/first-call-audit'
    ],

    categories: {
        ratp_pwa: {
            name: 'Ratp pwa metrics',
            description: 'Metrics for the ratp timetable site',
            auditRefs: [
                { id: 'card-audit', weight: 1 },
                { id: 'first-call-audit', weight: 2 }
            ]
        }
    }
};