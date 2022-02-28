function changeMonth(month){
    var monthsList = [
        'ENERO',
        'FEBRERO',
        'MARZO',
        'ABRIL',
        'MAYO',
        'JUNIO',
        'JULIO',
        'AGOSTO',
        'SEPTIEMBRE',
        'OCTUBRE',
        'NOVIEMBRE',
        'DICIEMBRE',
    ];

    if (monthsList.indexOf(month) === -1){
        return {
            code: 'error',
            result: 'Ingrese un valor correcto'
        }
    }

    var allSheets = sheetnames();

    if (allSheets.indexOf(month) !== -1){
        return {
            code: 'error',
            result: 'El mes seleccionado ya existe'
        }
    }

    var source = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = source.getSheetByName('BASE');
   
    sheet.copyTo(source).setName(month);

    // Add new Counts
    // ============== En variables.gs ==================
    var posTable = defCounts();
    var sheetParameters = defCountSheet();
    // =================================================

    //selecciono todo el contenido de la hoja para leer
    var dataContent = sheetParameters.dataContent;
    var dataSheet = sheetParameters.sheet;

    // Remove the first 2 rows
    dataContent.shift();
    dataContent.shift();

    //return dataContent;
    var request = addThreeRows(posTable, dataSheet, month, dataSheet);

    if (!request.result){
        return {
            code: 'error',
            result: `Error, se produjo la excepcion: ${request.message}`
        }
    }

    return {
        code: 'success',
        result: 'Se realizo el cambio con exito'
    }

}

function addThreeRows(posTable, dataSheet, month, dataSheet){
    // get the last written position of sheet 
    var lastRowNum = dataSheet.getLastRow();

    try {
        dataSheet.insertRowsAfter(lastRowNum, 1);
        var newLastRow = lastRowNum + 1;
        
        addNewRow(posTable, 'NICO', newLastRow, month, dataSheet);
        newLastRow++;
        addNewRow(posTable, 'MAMA', newLastRow, month, dataSheet);
        newLastRow++;
        addNewRow(posTable, 'MAR', newLastRow, month, dataSheet);
        newLastRow++;

        return {
            result: true
        }

    } catch (error) {
        return {
            result: false,
            message: error
        }
    }

}

function addNewRow(posTable, name, newLastRow, month, dataSheet){
    //============ define letter columns positions of sheet============
    var monthPos = posTable.monthPos.letter;
    var personPos = posTable.personPos.letter;
    var cardAssetsPos = posTable.cardAssetsPos.letter;
    var cashAssetsPos = posTable.cashAssetsPos.letter;
    var totalAssetsPos = posTable.totalAssetsPos.letter;
    var cardLiabilitiesPos = posTable.cardLiabilitiesPos.letter;
    var cashLiabilitiesPos = posTable.cashLiabilitiesPos.letter;
    var totalLiabilitiesPos = posTable.totalLiabilitiesPos.letter;
    var extractionPos = posTable.extractionPos.letter;
    var depositoryPos = posTable.depositoryPos.letter;
    var depositoryPos = posTable.depositoryPos.letter;
    var cardNetWorthPos = posTable.cardNetWorthPos.letter;
    var cashNetWorthPos = posTable.cashNetWorthPos.letter;
    var totalNetWorthPos = posTable.totalNetWorthPos.letter;
    // ================================================================

    dataSheet
        .getRange(`${monthPos}${newLastRow}`)
        .setValue(month);

    dataSheet
        .getRange(`${personPos}${newLastRow}`)
        .setValue(name);

    dataSheet
        .getRange(`${cardAssetsPos}${newLastRow}`)
        .setFormula(`=SUMIFS(${month}!$H$4:$H$5; ${month}!$F$4:$F$5; "=${name}"; ${month}!$G$4:$G$5; "=T"; ${month}!$I$4:$I$5; "=P")`);

    dataSheet
        .getRange(`${cashAssetsPos}${newLastRow}`)
        .setFormula(`=SUMIFS(${month}!$H$4:$H$5; ${month}!$F$4:$F$5; "=${name}"; ${month}!$G$4:$G$5; "=E"; ${month}!$I$4:$I$5; "=P")`);

    dataSheet
        .getRange(`${totalAssetsPos}${newLastRow}`)
        .setFormula(`=SUM(D${newLastRow};E${newLastRow})`);

    dataSheet
        .getRange(`${cardLiabilitiesPos}${newLastRow}`)
        .setFormula(`=SUMIFS(${month}!$H$4:$H$5; ${month}!$F$4:$F$5; "=${name}"; ${month}!$G$4:$G$5; "=T"; ${month}!$I$4:$I$5; "=N")`);

    dataSheet
        .getRange(`${cashLiabilitiesPos}${newLastRow}`)
        .setFormula(`=SUMIFS(${month}!$H$4:$H$5; ${month}!$F$4:$F$5; "=${name}"; ${month}!$G$4:$G$5; "=E"; ${month}!$I$4:$I$5; "=N")`);

    dataSheet
        .getRange(`${totalLiabilitiesPos}${newLastRow}`)
        .setFormula(`=SUM(G${newLastRow};H${newLastRow})`);

    dataSheet
        .getRange(`${extractionPos}${newLastRow}`)
        .setFormula(`=SUMIFS(${month}!$H$4:$H$5; ${month}!$F$4:$F$5;"=${name}"; ${month}!$E$4:$E$5;"=EXTRACCION")`);
        
    dataSheet
        .getRange(`${depositoryPos}${newLastRow}`)
        .setFormula(`=SUMIFS(${month}!$H$4:$H$5; ${month}!$F$4:$F$5;"=${name}"; ${month}!$E$4:$E$5;"=DEPOSITO")`);

    dataSheet
        .getRange(`${cardNetWorthPos}${newLastRow}`)
        .setFormula(`=D${newLastRow}-G${newLastRow}-J${newLastRow}+K${newLastRow}`);

    dataSheet
        .getRange(`${cashNetWorthPos}${newLastRow}`)
        .setFormula(`=E${newLastRow}-H${newLastRow}+J${newLastRow}-K${newLastRow}`);

    dataSheet
        .getRange(`${totalNetWorthPos}${newLastRow}`)
        .setFormula(`=SUM(L${newLastRow};M${newLastRow})`);

}