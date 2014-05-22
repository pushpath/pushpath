/// <reference path="../../libs.d.ts" />


export class DashboardService {
    static $inject = ['$http'];
    constructor(private $http: ng.IHttpService) {
    }

    loadVm = (): ng.IPromise <any> => {
        return this.$http.get('/api/')
            .then((response) => {
                return {
                    data: { id: 1}
                };
            });
    }

    loadProject = (): ng.IPromise <any> => {
        return this.$http.get('/api/')
            .then((response) => {
                return {
                    data : {id: 1}
                };
            });
    }
}
