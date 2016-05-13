//  Copyright 2015 mParticle, Inc.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

(function (window) {
    var name = 'Facebook',
        MessageType = {
            PageView    : 3
        };

    var constructor = function () {
        var self = this,
            isInitialized = false,
            forwarderSettings = null,
            reportingService = null,
            isTesting = false;

        self.name = name;

        function initForwarder(settings, service, testMode) {
            forwarderSettings = settings;
            service           = reportingService;
            isTesting         = testMode;
            d = document;

            try {
                if (!testMode) {
                    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

                    fbq('init', settings.pixelId);
                }

                isInitialized = true;

                return 'Successfully initialized: ' + name;

            } catch (e) {
                return 'Can\'t initialize forwarder: '+ name +':' + e;
            }
        }

        function processEvent(event) {
            var reportEvent = false;

            if(!isInitialized) {
                return 'Can\'t send forwarder '+ name + ', not initialized';
            }

            try {
                if(event.EventDataType == MessageType.PageView) {
                    reportEvent = true;
                    logEvent(event);
                }

                if(reportEvent && reportingService) {
                    reportingService(self, event);
                }

                return 'Successfully sent to forwarder ' + name;
            } catch (error) {
                return 'Can\'t send to forwarder: ' + name + ' ' + e;
            }
        }

        function logEvent(event) {
            fbq('track', "PageView");
        }

        this.init       = initForwarder;
        this.process    = processEvent;
    };


    if (!window ||
        !window.mParticle ||
        !window.mParticle.addForwarder) {

        return;
    }

    window.mParticle.addForwarder({
        name       : name,
        constructor: constructor
    });

})(window);
