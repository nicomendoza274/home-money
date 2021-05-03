function read() {

  // ============== En variables.gs ==================
  var posTable = defVars(); 
  var sheetParameters = defSheet();
  // =================================================

  var dataContent = sheetParameters.dataContent;
  // quito las primeras 3 filas
  dataContent.shift();
  dataContent.shift();
  dataContent.shift();

  var respuesta = getJsonRead(posTable, dataContent);
  return respuesta;
}

function getJsonRead(posTable, dataContent) {
  var arrayOfData = [];
  for (i in dataContent) {
    Logger.log(typeof i);

    var row = dataContent[i];
    var id = row[posTable.idPos.num];
    var uploadDate = row[posTable.uploadDatePos.num];
    var nameOfCount = row[posTable.nameOfCountPos.num];
    var category = row[posTable.categoryPos.num];
    var payment = row[posTable.paymentPos.num];
    var typePayment = row[posTable.typePaymentPos.num];
    var amount = row[posTable.amountPos.num];
    var sign = row[posTable.signPos.num];

    arrayOfData.push(
      { 
        id: id,
        uploadDate: uploadDate,
        nameOfCount: nameOfCount,
        category: category,
        payment: payment,
        typePayment: typePayment,
        amount: amount,
        sign: sign,
      }
    
    );
    
  }

  return arrayOfData;
}