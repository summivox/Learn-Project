function init(){
	var parser = new DOMParser();
	var result = "";
	processCourseList(false, createTable);
	$("#clearall").click(function(){clearAll()});
}
function createTable(courseList){
	var table = $('#course_table');
	table.children().remove();
	var head = $("<tr><th>课程序号</th><th>课程名称</th> <th>屏蔽本课程作业</th> <th>屏蔽本课程通知</th> </tr>");
	table.append(head);
	for (var i = 0; i < courseList.length; i++) {
		var id = courseList[i].id;
		var name = courseList[i].name;
		var row = $("<tr></tr>");
		var check = checkCourse(id);
		var hw_b = '<button class="exbtn checked' + (+check[0]) + '" data-args="' + 
					id + ',0,' + (+check[0]) +'">' + (check[0] ? "屏蔽" : "显示") + '</button>';
		var no_b = '<button class="exbtn checked' + (+check[1]) + '" data-args="' +
					id + ',1,' + (+check[1]) +'">' + (check[1] ? "屏蔽" : "显示") + '</button>';
		var line = "<td>" + id + "</td><td>" + name + "</td>" + "<td>" +
			hw_b + "</td><td>" + no_b + "</td>";
		row.html(line);
		table.append(row);
	}
	$('.exbtn').click(function() {
		var args = this.getAttribute('data-args').split(',');
		addException.apply(null, args);
		init();
	});
}
function checkCourse(id){
	hw_list = JSON.parse(localStorage.getItem("ignore_list_deadline")) || [];
	notifi_list = JSON.parse(localStorage.getItem("ignore_list_notification")) || [];
	return [hw_list.indexOf(id) !== -1, notifi_list.indexOf(id) !== -1]
}	
//op = 1 => 取消
//op = 0 => 添加	
//type = 0 =>作业, type = 1 => 通知
function addException(id, type, op){
	console.log(id , type , op);
	if (type == 0){
		var listname = "ignore_list_deadline";
	}
	else if (type == 1){
		var listname ="ignore_list_notification";
	}
	else
		return;
	var list = [];
	if (localStorage.getItem(listname)){
		list = JSON.parse(localStorage.getItem(listname));
	}
	for (var i = 0; i < list.length; i++){
		if (list[i] == id){
			if (op == 1){
				list[i] = list[list.length - 1];
				list.pop();
				localStorage[listname] = JSON.stringify(list);
			}
			return;
		}
	}
	list.push(id);
	localStorage[listname] = JSON.stringify(list);
	console.log(list);
}

function clearAll(){
	localStorage.removeItem("ignore_list_deadline");
	localStorage.removeItem("ignore_list_notification");
	window.location.reload();
}

$(function(){
	init();
});
