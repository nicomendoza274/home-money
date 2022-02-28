function doGet(e) {
  var action = e.parameters.action ? e.parameters.action.toString() : '';
  switch(action){
    case "read":
      var result = read();
      break; 

    case "create":

      // =================================== define get paramets =========================================
      var uploadDateParam = e.parameters.uploadDateParam ? e.parameters.uploadDateParam.toString() : '';
      var nameOfCountParam = e.parameters.nameOfCountParam ? e.parameters.nameOfCountParam.toString() : ''; 
      var categoryParam = e.parameters.categoryParam ? e.parameters.categoryParam.toString(): '';
      var paymentParam = e.parameters.paymentParam ? e.parameters.paymentParam.toString(): '';
      var typePaymentParam = e.parameters.typePaymentParam ? e.parameters.typePaymentParam.toString(): '';
      var amountParam = e.parameters.amountParam ? e.parameters.amountParam.toString(): '';
      var signParam = e.parameters.signParam ? e.parameters.signParam.toString() : '';
      // =================================================================================================

      var parameters ={
        uploadDateParam: uploadDateParam,
        nameOfCountParam: nameOfCountParam,
        categoryParam: categoryParam,
        paymentParam: paymentParam,
        typePaymentParam: typePaymentParam,
        amountParam: amountParam,
        signParam: signParam
      }

      var result = create(parameters);
      break;

    case "update":
      var result = "Actualizo";
      break;

    case "delete":
      var result = "Elimino";
      break;

    case "change-month":
      var month = e.parameters.month ? e.parameters.month.toString() : '' ;
      var result = changeMonth(month);
      break;

    default:
      // define html page
      var tmp = HtmlService.createTemplateFromFile("index");
      //get html page

      var sheetConfigParams = defConfig();

      tmp.url = sheetConfigParams.url;
      tmp.urlSps = sheetConfigParams.urlSps;
      tmp.month = sheetConfigParams.month;
      return tmp.evaluate()
        .setTitle('Home money')
        .setFaviconUrl("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/274/dollar-banknote_1f4b5.png")
        .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1');

  }

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);

}

function getScriptURL() {
  return ScriptApp.getService().getUrl();
}
