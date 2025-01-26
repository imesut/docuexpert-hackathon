export const bridgeGetEmail = async (callback) => {
    google.script.run
        .withSuccessHandler(function (result) {
            callback(result)
        })
        .withFailureHandler(function (error) {
            callback(undefined)
        })
        .getEmail();
}

export const bridgeFocusToText = (text, callback) => {
    console.log("bridgeFocusToText")
    google.script.run
        .withSuccessHandler(function (result) {
            console.log(result)
            callback(result)
        })
        .withFailureHandler(function (error) {
            console.log(error)
            callback(undefined)
        })
        .focusToText(text);
}


export const bridgeReplaceText = (oldText, newText, callback) => {
    console.log("bridgeReplaceText")
    google.script.run
        .withSuccessHandler(function (result) {
            console.log(result)
            callback(result)
        })
        .withFailureHandler(function (error) {
            console.log(error)
            callback(undefined)
        })
        .replaceText(oldText, newText);
}


export const bridgeGetAgreementText = (callback) => {
    console.log("bridgeReplaceText")
    google.script.run
        .withSuccessHandler(async function (result) {
            console.log(result)
            await callback(result)
        })
        .withFailureHandler(async function (error) {
            console.log(error)
            await callback(undefined)
        })
        .getAgreementText();
}
