/// <reference path="../../libs.d.ts" />


export class DashboardService {
    static $inject = ['$http'];
    constructor(private $http: ng.IHttpService) {
    }

    loadVm = (): ng.IPromise <any> => {
        return this.$http.get('/api/')
            .then((response) => {
                return {
                    data: {
                        os: 'Ubuntu',
                        cpu: 'Intel',
                        memory: '256MB',
                        disk_size: '20G',
                        vm_type: 'Virtual Box'
                    }
                };
            });
    }

    loadProject = (): ng.IPromise <any> => {
        return this.$http.get('/api/')
            .then((response) => {
                return {
                    data : {
                        id: 1,
                        name: 'my local dev',
                        box_url: 'http://',
                        ip_address: '192.168.x.x',
                        sync_folder: '/var/sync',
                        target_folder: '/var/target',
                        hostname: 'my.localdev'
                    }
                };
            });
    }
}
