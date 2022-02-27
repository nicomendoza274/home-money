function defVars() {
  var idPos = { num: 1, letter: "B" };
  var uploadDatePos = { num: 2, letter: "C" };
  var nameOfCountPos = { num: 3, letter: "D" };
  var categoryPos = { num: 4, letter: "E" };
  var paymentPos = { num: 5, letter: "F" };
  var typePaymentPos = { num: 6, letter: "G" };
  var amountPos = { num: 7, letter: "H" };
  var signPos = { num: 8, letter: "I" };

  var posTable = {
    idPos: idPos,
    uploadDatePos: uploadDatePos,
    nameOfCountPos: nameOfCountPos,
    categoryPos: categoryPos,
    paymentPos: paymentPos,
    typePaymentPos: typePaymentPos,
    amountPos: amountPos,
    signPos: signPos,
  };

  return posTable;
}

// CONFIG INFORMATION
function defConfig(){
  var sps = SpreadsheetApp.getActive();
  var sheetName = 'CONFIG';
  var sheet = sps.getSheetByName(sheetName);
  var url = sheet.getRange("C2").getValue();
  var month = sheet.getRange("C3").getValue();
  var urlSps = sheet.getRange("C4").getValue();

  var sheetConfigParams = {
    url: url,
    month: month,
    urlSps: urlSps
  }
  return sheetConfigParams;
}


function defSheet(){

  // get defConfig to have month
  var sheetConfigParams = defConfig()

  var sps = SpreadsheetApp.getActive();
  var sheetName = sheetConfigParams.month;
  var sheet = sps.getSheetByName(sheetName);

  //selecciono todo el contenido de la hoja para leer
  var dataContent = sheet.getDataRange().getValues();

  var sheetParameters = {
    sps: sps,
    sheetName: sheetName,
    sheet: sheet,
    dataContent: dataContent
  }

  return sheetParameters;

}

function sheetnames() {
  var out = new Array()
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (var i=0 ; i<sheets.length ; i++) out.push( sheets[i].getName() )
  return out 
}
