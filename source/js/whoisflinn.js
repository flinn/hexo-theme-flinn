$(document).ready(function() {
    
    NProgress.start();

    var recentVisits = incrementVisitCookie('recent', 45);
    var totalVisits = incrementVisitCookie('total', 1460);    
    var startCmd = 'WHOIS flinn'; //chooseStartCommand(recentVisits, totalVisits);

    var path = window.location.pathname;
    console.log("Current Path == ", path);

    if (path == "/") {
        handleHomeLoad(startCmd);
    } else {
        handlePageLoad();
    }

    var user = {
        recent_visits: recentVisits,
        total_visits: totalVisits,
        start_cmd: startCmd
    };
    window.user = user;
    console.log("User Info == ", user);    
});

function handlePageLoad() {
    showNavigation();
    showBody();
    NProgress.set(0.4);
    initializeTheWow();
    NProgress.set(0.8);
    setTimeout(function() {
        NProgress.done();
    }, 100);
};

function handleHomeLoad(startCmd) {
    showNavigation();
    showWelcomeContainer();
    NProgress.set(0.4);
    initializeTheWow();
    NProgress.set(0.8);
    fireUpTheTerminal(startCmd);
    setTimeout(function() {
        NProgress.done();
    }, 100);
}

function showWelcomeContainer() {
    $('#welcome-container').toggleClass('hidden');
}

function showNavigation() {
    $('#header-inner').toggleClass('hidden');
}

function showBody() {    
    $('#body-container').toggleClass('hidden');
}

function fireUpTheTerminal(startCmd) {
    console.log("Firing up the terminal and running command: ", startCmd);

    function exitTerminal(ctx, options) {
        console.log("Trying to exit the terminal!", ctx, options);
        $('#terminal-window').remove();
    }

    var directories = ['home','about','blog','contact', 'projects'];
    var opts = {
        user: "Vistor:~ guest$ ",
        autorun: startCmd,
        commands: {
            'whoami': ['guest'],
            'cd': ['-bash: cd: No such file or directory'],
            'exit': exitTerminal,
            'git pull origin master': ['remote: Counting objects: 11, done.','remote: Compressing objects: 100% (5/5), done.','remote: Total 7 (delta 2), reused 0 (delta 0)','Unpacking objects: 100% (7/7), done.'],
            'whois flinn': ["Registrant Name: Matthew Claiborne Flinn","Registrant Organization: The Motley Fool","Registrant Title: Software Developer", "Registrant City: Arlington, VA","Last update of WHOIS database: 2014-05-06T01:00:00Z"],
            'help': ['-bash: The following shell commands are currently defined...', 'whois flinn', 'whoami', 'ls', 'cd']
        },
        rootUrl: 'http://localhost:4000/',//'http://www.whoisflinn.com/'
        dirs: directories,
        hesitate: 1000,
        audio: true,
        lastLogin: "Thu May 24 12:18:16",
        maxStrokeInterval: 250,
        languageUsed: 'bash',
        outputInterval: 100,
    };
    terminalify("terminal", opts);    
}

function initializeTheWow() {
    console.log("Initializing the WOW!");
    new WOW().init();
}

function chooseStartCommand(recentVisits, totalVisits) {
    if (recentVisits > 1) {
        console.log("They've seen things recently...");
        return 'git pull origin master';
    } else if (recentVisits == 1 && totalVisits > 1) {
        console.log("They've been here before...");
        return 'cd blog';
    } else {
        console.log("They're a newb...");
        return 'WHOIS flinn';
    }
}

function incrementVisitCookie(type, expDays) {
    var cookieName = type + 'v';
    var vCookie = getCookie(cookieName);
    if (vCookie == '') {        
        setCookie(cookieName, 1, expDays);
        return 1;
    } else {
        var newVisitCount = parseInt(vCookie, 10) + 1;
        setCookie(cookieName, newVisitCount, expDays);
        return newVisitCount;
    }
}

function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return '';
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
}