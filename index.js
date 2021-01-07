let tableData = []

const constructTable = (data = tableData) => {
	console.table(data)
	const ele = document.getElementById('myTable')
	ele.innerHTML = '';
	var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  for (var j = 0; j <= data.length; j++) {
    var row = document.createElement("tr");

    for(let o in data[j]){
    	var cell = document.createElement("td");
      var cellText = document.createTextNode(data[j][o]);

      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    tblBody.appendChild(row);
  }

  tbl.appendChild(tblBody);
  ele.appendChild(tbl);
}

const readExcel = (oEvent) => {
	var oFile = oEvent.target.files[0];
	var reader = new FileReader();

  reader.onload = function(e) {
    var data = e.target.result;
    var workbook = XLSX.read(data, {
      type: 'binary'
    });
    workbook.SheetNames.forEach(function(sheetName) {
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      var json_object = JSON.stringify(XL_row_object);

      for(let i=0;i<XL_row_object.length;i++){
      	const {__rowNum__, ...rest} = XL_row_object[i]
      	tableData.push(rest) 
      }
      constructTable()
    })
  };

  reader.onerror = function(ex) {
    console.log(ex);
  };

  reader.readAsBinaryString(oFile);
}

const filterTable = () => {
	const inputVal = document.getElementById("myInput").value.toLowerCase();
	let fData = []
	for(let i=0;i<tableData.length;i++){
		for(let o in tableData[i]){
			if(tableData[i][o].toLowerCase().includes(inputVal)){
				fData.push(tableData[i])
				break;
			}
		}
	}
	constructTable(fData)
}


window.onload = function() {
	const btn = document.getElementById('fileInput')
	btn.addEventListener('change', readExcel, false);
}