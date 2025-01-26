// Session.getActiveUser().getEmail()
// Session.getActiveUser().getEmail()

function onOpen(e) {

    DocumentApp.getUi()
        .createMenu('docuexpert')
        .addItem('Start', 'showSidebar')
        .addToUi();
}

function onInstall(e) {
    onOpen(e);
}

function showSidebar() {
    var ui = HtmlService
        .createTemplateFromFile('gas/sidebar')
        .evaluate()
        .setTitle("docuexpert | Transcripts & AI Experts for Agreements");
    DocumentApp.getUi().showSidebar(ui);
}

var include = function (filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
};

var ho = function () {
    // this is for the furure 
    return 'Hello from Apps Script!'
}
