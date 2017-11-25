var fdb = new ForerunnerDB();
var db = fdb.db("school");

var studentsCollection = db.collection("students");


$(document).ready(function(){
	upDate(studentsCollection.find());
	$("#table-tbody").on("click", ".col", colClick);
})


studentsCollection.insert({
    name: "Koding",
    age: 18
});


console.log(studentsCollection.find());



studentsCollection.load(callback);


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
		"<td class ='dateID'>" + datas[i]._id + "</td>" +
		"<td>" + datas[i].name + "</td>" +
		"</tr>"
		);
	}
}


function colClick(){
	var ID = $(this).find(".dateID").text();
	var query = {
	    _id: ID
	};

	$("#modal-body").find("p").remove();

	var studentData = studentsCollection.find(query);
	$("#modal-body").append(
		"<p>ID: " + studentData[0]._id + "</p>" + 
		"<p>name: " + studentData[0].name + "</p>" + 
		"<p>age: " + studentData[0].age + "</p>"
		)
	$("#mymodal").modal("show")
}