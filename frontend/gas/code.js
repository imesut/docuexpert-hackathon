// Session.getActiveUser().getEmail()

function onOpen(e) {

    DocumentApp.getUi()
        .createMenu('Your Custom Menu')
        .addItem('Open My App', 'showSidebar')
        .addToUi();

    // DocumentApp.getUi()
    //     .createAddonMenu()
    //     .addItem("Show sidebar", "showSidebar")
    //     .addToUi();
}

function onInstall(e) {
    onOpen(e);
}

function showSidebar() {
    var ui = HtmlService
        .createTemplateFromFile('gas/sidebar')
        .evaluate()
        .setTitle("My Svelte+Material Sidebar");
    DocumentApp.getUi().showSidebar(ui);
}

var include = function (filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
};

var ho = function () {
    // this is for the furure 
    return 'Hello from Apps Script!'
}
