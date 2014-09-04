/// <reference path="../app/libs.d.ts" />

var path = require('path');

export var routes = (): string[] => {

    var public: string[] = <any>{
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: {
                path: path.resolve(__dirname, '../app'),
                listing: false,
                index: true
            }
        }
    };

    return <any>[public];
}
