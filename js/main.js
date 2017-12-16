var fdb = new ForerunnerDB();
var db = fdb.db("school");

var studentsCollection = db.collection("students");


$(document).ready(function(){
	studentsCollection.load(callback);
	// upDate(studentsCollection.find());
	$("#table-tbody").on("click", ".dataID", colIDClick);
	$("#table-tbody").on("click", ".btn-danger", btnDeleteClick);
	$("#table-tbody").on("click", ".btn-warning", btnEditClick);
	$("#c").on("click", insertData);
	$("#btnSave").on("click", saveUpdateData);
	$("#btnLimitSearch").on("click", limitSearch);
})


function insertData(){
	var name = $("#a").val();
	var age = $("#b").val();
	if (name != "undefined" || age != "undefined") {
		studentsCollection.insert({
			name: name,
			age: age
		});
		studentsCollection.save(datasave);
	$("#a").val("");
	$("#b").val("");
	}
}


function btnDeleteClick(){
	upDate(studentsCollection.find());
	if (!confirm("確定要刪除嗎?")) {return;}
	var ID = $(this).closest("tr").find(".dataID").text();
	studentsCollection.remove({
    _id: ID
	});
	studentsCollection.save(datasave);
}


function datasave(){
	console.log("data saved");
	upDate(studentsCollection.find());
}



function callback(){
	// createData();
	upDate(studentsCollection.find());
}



 function createData(){
	console.log("creat data");
	for (var i = 0; i < 20; i++) {
		studentsCollection.insert({
			name: String.fromCharCode(Math.floor((Math.random()* 26) + 65),
				Math.floor((Math.random()* 26) + 97),
				Math.floor((Math.random()* 26) + 97)),
			age: Math.floor((Math.random()* 7) + 7)
		});
	}
	console.log(studentsCollection.find());
	studentsCollection.save(i);
}

function upDate(datas){
	$("#table-tbody").find("tr").remove();
	for (var i = 0; i < datas.length; i++) {
		$("#table-tbody").append(
		"<tr class = 'col'>" +
		"<td>" + (i+1) + "</td>" +
		"<td class ='dataID'>" + datas[i]._id + "</td>" +
		"<td>" + datas[i].name + "</td>" +
		"<td><botton class = 'btn btn-warning'>修改</botton>" +
		"<botton class='btn btn-danger'>刪除</botton></td>" +
		"</tr>"
		);
	}
}


function colIDClick(){
	console.log("colIDClick");
	var ID = $(this).text();
	var query = {
	    _id: ID
	};

	$("#modal-body").find("p").remove();

	var studentData = studentsCollection.find(query);
	$("#modal-body").append(
		"<p>ID: " + studentData[0]._id + "</p>" + 
		"<p>name: " + studentData[0].name + "</p>" + 
		"<p>age: " + studentData[0].age + "</p>"
		);
	$("#mymodal").modal("show");
}

function btnEditClick(){
	var ID = $(this).closest("tr").find(".dataID").text();
	var query = {
	    _id: ID
	};
	var studentData = studentsCollection.find(query);
	$("#modalName").val(studentData[0].name);
	$("#modalAge").val(studentData[0].age);
	$("#editmodal").attr("studentID", ID);
	$("#editmodal").modal("show");
}




function saveUpdateData(){
	var	ID = $("#editmodal").attr("studentID");
	var name = $("#modalName").val();
	var age = $("#modalAge").val();
	var newData = {
    name: name,
    age: age
};
	studentsCollection.updateById(ID,newData);
	$("#editmodal").modal("hide");
	studentsCollection.save(datasave);
}


function limitSearch(){
	var GT = $("#edtGT").val();
	var LT = $("#edtLT").val();
	var datas = studentsCollection.find({
    age: {
        "$gt": GT,
        "$lt": LT
    }
    upDate(datas);
});
}
