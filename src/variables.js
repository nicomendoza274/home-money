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

function defCounts(){
  var monthPos = { num: 1, letter: "B" };
  var personPos = { num: 2, letter: "C" };
  var cardAssetsPos = { num: 3, letter: "D" };
  var cashAssetsPos = { num: 4, letter: "E" };
  var totalAssetsPos = { num: 5, letter: "F" };
  var cardLiabilitiesPos = { num: 6, letter: "G" };
  var cashLiabilitiesPos = { num: 7, letter: "H" };
  var totalLiabilitiesPos = { num: 8, letter: "I" };
  var extractionPos = { num: 9, letter: "J" };
  var depositoryPos = { num: 10, letter: "K" };
  var depositoryPos = { num: 10, letter: "K" };
  var cardNetWorthPos = { num: 11, letter: "L" };
  var cashNetWorthPos = { num: 12, letter: "M" };
  var totalNetWorthPos = { num: 13, letter: "N" };

  var posTable = {
    monthPos: monthPos,
    personPos: personPos,
    cardAssetsPos: cardAssetsPos,
    cashAssetsPos: cashAssetsPos,
    totalAssetsPos: totalAssetsPos,
    cardLiabilitiesPos: cardLiabilitiesPos,
    cashLiabilitiesPos: cashLiabilitiesPos,
    totalLiabilitiesPos: totalLiabilitiesPos,
    extractionPos: extractionPos,
    depositoryPos: depositoryPos,
    depositoryPos: depositoryPos,
    cardNetWorthPos: cardNetWorthPos,
    cashNetWorthPos: cashNetWorthPos,
    totalNetWorthPos: totalNetWorthPos,
  }

  return posTable;

}

function defCountSheet(){

  var sps = SpreadsheetApp.getActive();
  var sheetName = "CUENTAS";
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

function editConfig(){
  var sps = SpreadsheetApp.getActive();
  var sheetName = "CONFIG";
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
