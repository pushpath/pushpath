/// <reference path="../../libs.d.ts" />

export interface projectDetails {
    id: string;
    name: string;
    box_url: string;
    ip_address: string;
    sync_folder: string;
    target_folder: string;
}

export class ProjectService {
    static $inject = ['$http'];
    constructor(private $http: ng.IHttpService) {
    }

    addProject = (project: any): ng.IHttpPromise <any> => {
        return this.$http.post('/api/', {
            data: project
        });
    }

    updateProject = (project: any): ng.IHttpPromise <any> => {
        return this.$http.get('/api/');
    }

    getProject = (currentProjectId: string): ng.IHttpPromise <any> => {
        return this.$http.get('/api/');
    }

    deleteProject = (currentProjectId: string): ng.IHttpPromise <any> => {
        return this.$http.get('/api/');
    }
}
