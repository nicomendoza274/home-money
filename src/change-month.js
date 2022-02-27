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

    return {
        code: 'success',
        result: 'Se realizo el cambio con exito'
    }

}