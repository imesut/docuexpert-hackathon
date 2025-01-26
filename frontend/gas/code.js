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
        .setTitle("Transcripts & AI Experts");
    DocumentApp.getUi().showSidebar(ui);
}

var include = function (filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
};



// Bridge Functions
function getEmail() {
    return Session.getActiveUser().getEmail()
}

function focusToText(text) {
    let doc = DocumentApp.getActiveDocument()
    let position = getTextPosition(text)
    if (position) {
        doc.setCursor(position)
    }
}

function getTextPosition(searchText) {
    var doc = DocumentApp.getActiveDocument();
    const documentTab = doc.getActiveTab().asDocumentTab();
    var body = doc.getBody();

    for (var i = 0; i < body.getNumChildren(); i++) {
        var paragraph = body.getChild(i);
        var text = paragraph.getText();
        var index = text.indexOf(searchText);
        if (index !== -1) {
            return documentTab.newPosition(paragraph.getChild(0), index);
        }
    }
    return undefined
}