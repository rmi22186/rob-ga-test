describe('Facebook Forwarder', function () {

    var ReportingService = function () {
        var self   = this;
        this.id    = null;
        this.event = null;

        this.cb = function (forwarder, event) {
            self.id    = forwarder.id;
            self.event = event;
        };

        this.reset = function () {
            this.id    = null;
            this.event = null;
        };
    },
    MessageType = {
        SessionStart: 1,
        SessionEnd  : 2,
        PageView    : 3,
        PageEvent   : 4,
        CrashReport : 5,
        OptOut      : 6,
        Commerce    : 16
    },
    reportService = new ReportingService();

    function MPMock () {
        var self          = this;
        var calledMethods = ['track'];

        for (var i = 0; i < calledMethods.length; i++) {
            this[calledMethods[i] + 'Called'] = false;
        }


        function setCalledAttributes(attr) {
            self[attr] = true;
        }
        
        function fbq(fnName, eventname) {
            setCalledAttributes(fnName + 'Called');
        } 
        
        return {
            fbq : fbq,
            fbqObj: this 
        }
    }

    before(function () {
        mParticle.forwarder.init({
            pixelCode: '1228810793810857'
        }, reportService.cb, true);
    });

    beforeEach(function () {
        let mock = new MPMock();
        window.fbqObj = mock.fbqObj;
        window.fbq = mock.fbq;
    });

    describe('Logging events', function() {

        it('should log event', function(done) {
            mParticle.forwarder.process({
                EventDataType : MessageType.PageView
            });

            window.fbqObj.should.have.property('trackCalled', true);
            done();
        });

        it('should not log event', function(done) {
            mParticle.forwarder.process({
                EventDataType : MessageType.SessionStart
            });

            window.fbqObj.should.have.property('trackCalled', false);
            done();
        });
        
    });
    
});
