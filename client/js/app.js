function getSessionList(success, error) {
  var soql = "SELECT svpractice__Session__r.Id, svpractice__Session__r.Name FROM svpractice__Session_Speaker__c";
  force.query(soql, success, error);
}

function getSessionDetails(sessionId, success, error) {
  var soql = "SELECT svpractice__Session__r.Name, " +
  "svpractice__Session__r.svpractice__Session_Date__c, " +
  "svpractice__Speaker__r.svpractice__First_Name__c, " +
  "svpractice__Speaker__r.svpractice__Last_Name__c " +
  "FROM svpractice__Session_Speaker__c " +
  "WHERE svpractice__Session__r.Id = '" + sessionId + "'";
  force.query(soql, success, error);
}

function showSessionList() {
    getSessionList(
        function (data) {
            var sessions = data.records,
                html = '';
            for (var i=0; i<sessions.length; i++) {
                html += '<li class="table-view-cell"><a href="#sessions/'+ sessions[i].svpractice__Session__r.Id +'">' + sessions[i].svpractice__Session__r.Name + '</a></li>';
            }
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                    '<h1 class="title">Sessions</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<ul class="table-view session-list">' + html + '</ul>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

function showSessionDetails(sessionId) {

    getSessionDetails(sessionId,
        function (data) {
            var session = data.records[0],
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                '<a class="btn btn-link btn-nav pull-left" href="#"><span class="icon icon-left-nav"></span>Back</a>' +
            '<h1 class="title">Sessions</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<div class="card">' +
                        '<ul class="table-view">' +
                            '<li class="table-view-cell">' +
                                '<h4>' + session.svpractice__Session__r.Name + '</h4>' +
                                '<p>' + (session.svpractice__Session__r.Session_Date__c || 'No time yet')+ '</p>' +
                            '</li>' +
                            '<li class="table-view-cell">Speaker: ' +
                                session.svpractice__Speaker__r.First_Name__c +
                            '</li>' +
                            '<li class="table-view-cell">' +
                                (session.svpractice__Session__r.Description__c || 'No description yet') +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

var slider = new PageSlider($('body')); // Initialize PageSlider micro-library for nice and hardware-accelerated page transitions
router.addRoute('', showSessionList);
router.addRoute('sessions/:id', showSessionDetails);
