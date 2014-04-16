/// <reference path="../../libs.d.ts" />

export interface projectDetails {
    name: string;
    vm_box: string;
    vm_box_url: string;
    network_type: string;
    network_ip: string;
    network_hostname: string;
    vm_provider: string;
    vm_provider_name: string;
    synced_folder_source: string;
    synced_folder_target: string;
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
