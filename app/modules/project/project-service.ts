/// <reference path="../../libs.d.ts" />

export interface projectDtails {
    name: string;
    vm_box: string;
    vm_box_url: string;
    network_type: string;
    network_ip: string;
    network_hostname: string;
}

export class ProjectService {
    static $inject = ['$http'];
    constructor(private $http: ng.IHttpService) {
    }

    addProject = (project: projectDtails): boolean => {
        return true;
    }
}
