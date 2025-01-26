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
