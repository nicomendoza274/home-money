function create(parameters) {

  // ============== En variables.gs ==================
  var posTable = defVars();
  var sheetParameters = defSheet();
  // =================================================

  //selecciono todo el contenido de la hoja para leer
  var dataContent = sheetParameters.dataContent;
  var datasheet = sheetParameters.sheet;
  var sps = sheetParameters.sps;

  // quito las primeras 3 filas
  dataContent.shift();
  dataContent.shift();
  dataContent.shift();


  //return dataContent;
  var request = getJsonCreate(posTable, datasheet, dataContent, sps, parameters);
  return request;

}

function getJsonCreate(posTable, dataSheet, dataContent, sps, parameters) {

  // get the last written position of sheet 
  var lastRowNum = dataSheet.getLastRow();
  // define de correct position 
  var correctPosition = 4;
  // the las row in the selection sheet
  var lastRow = dataContent[lastRowNum - correctPosition];
  // the last id of selection sheet
  var lastId = lastRow[posTable.idPos.num];

  //============ define letter columns positions of sheet============
  var idPos = posTable.idPos.letter;
  var uploadDatePos = posTable.uploadDatePos.letter;
  var nameOfCountPos = posTable.nameOfCountPos.letter;
  var categoryPos = posTable.categoryPos.letter;
  var paymentPos = posTable.paymentPos.letter;
  var typePaymentPos = posTable.typePaymentPos.letter;
  var amountPos = posTable.amountPos.letter;
  var signPos = posTable.signPos.letter;
  // ================================================================

  try {

    //Insert row down
    dataSheet.insertRowsAfter(lastRowNum, 1);
    var newLastRow = lastRowNum + 1;

    // define de new last id
    var newLastId = lastId + 1;
    dataSheet
      .getRange(idPos + newLastRow)
      .setValue(
        newLastId.toString()
      );

    var today = Utilities.formatDate(
      new Date(),
      sps.getSpreadsheetTimeZone(),
      "dd/MM/yyyy HH:mm:ss"
    );

    Logger.log(parameters.uploadDateParam);

    var date = parameters.uploadDateParam
      ? Utilities.formatDate(
        new Date(parameters.uploadDateParam),
        sps.getSpreadsheetTimeZone(),
        "dd/MM/yyyy HH:mm:ss")
      : today;

    // Set fields in table


    dataSheet
      .getRange(categoryPos + newLastRow)
      .setValue(parameters.categoryParam);

    //if enter an extraction or deposit change values typePayment and sing for "-"
    if (["EXTRACCION", "DEPOSITO"].includes(parameters.categoryParam)) {
      dataSheet
        .getRange(nameOfCountPos + newLastRow)
        .setValue(parameters.categoryParam);

      dataSheet
        .getRange(typePaymentPos + newLastRow)
        .setValue("-");

      dataSheet
        .getRange(signPos + newLastRow)
        .setValue("-");
    } else {
      dataSheet
        .getRange(nameOfCountPos + newLastRow)
        .setValue(parameters.nameOfCountParam);

      dataSheet
        .getRange(typePaymentPos + newLastRow)
        .setValue(parameters.typePaymentParam);

      dataSheet
        .getRange(signPos + newLastRow)
        .setValue(parameters.signParam);
    }

    dataSheet.getRange(uploadDatePos + newLastRow).setValue(date);

    dataSheet
      .getRange(paymentPos + newLastRow)
      .setValue(parameters.paymentParam);

    var str_amountParam = parameters.amountParam;
    str_amountParam = str_amountParam.toString().replace('.', ',');

    dataSheet
      .getRange(amountPos + newLastRow)
      .setValue(str_amountParam);

    dataSheet
      .getRange(idPos + newLastRow + ":" + signPos + newLastRow)
      .setFontColor("black")
      .setFontSize(10)
      .setFontWeight("bold");

    dataSheet.getRange(categoryPos + newLastRow)
      .setFontColor("#0b5394");

    var request = {
      result: true,
      id: newLastId
    }


  } catch (e) {
    var request = {
      request: false,
      result: e.toString()
    }
  }

  return request


}
