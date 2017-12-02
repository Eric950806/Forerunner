var fdb = new ForerunnerDB();
var db = fdb.db("school");

var studentsCollection = db.collection("students");


$(document).ready(function(){
	upDate(studentsCollection.find());
	$("#table-tbody").on("click", ".dataID", colIDClick);
	$("#table-tbody").on("click", ".btn-danger", btnDeleteClick);
})


studentsCollection.insert({
    name: "Koding",
    age: 18
});


console.log(studentsCollection.find());



studentsCollection.load(callback);


function btnDeleteClick(){
	upDate(studentsCollection.find());
	if (!confirm("確定要刪除嗎?")) {return;}
	var ID = $(this).closest("tr").find(".dataID").text();
	studentsCollection.remove({
    _id: ID
	});
	studentsCollection.save();
}


function datasave(){
	console.log("data saved");
	upDate(studentsCollection.find());
}



function callback(){
	// createData();
	upDate(studentsCollection.find());
}
function i(){
	console.log("dataSave");
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