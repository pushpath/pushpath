/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
var moment = require('moment');

var home_controller = function(app) {
    app.get('/', function(req, res){
        var config = pushpath.config.read(),
            status = pushpath.vagrant.status();

        if (config) {
            res.render('home/index', {
                config: config,
                moment: moment,
                status: status
            });
        } else {
            res.redirect('/new');
        }
    });

    app.post('/update', function(req, res){
        var params = req.body;
        var data_updates = {
        };

        pushpath.config.update(data_updates);
        res.redirect('/');
    });

    app.get('/new', function(req, res){
        res.render('home/new');
    });

    app.post('/save', function(req, res){
        var params = req.body;
        var data = {
            id: pushpath.utils.createUUID(),
            name: params.config_name,
            date_created: new Date().getTime(),
            plugins: {
                vagrant: {
                    config: {
                        config_vm_box: params.config_vm_box,
                        config_vm_box_url: params.config_vm_box_url,
                        network: {
                            network_type: params.network_type,
                            network_ip: params.network_ip,
                            network_hostname: params.network_hostname
                        },
                        provider: {
                            type: params.provider_type,
                            name: params.provider_name
                        }
                    }
                }
            }
        }

        pushpath.setupProject();
        pushpath.config.write(data);
        pushpath.vagrant.applyConfig();

        res.redirect('/');
    });
}

module.exports = home_controller;