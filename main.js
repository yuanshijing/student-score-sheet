let readline = require('readline');

function getName(student) {
	return student.split('，')[0];
}

function getPrintList(ids_, students) {
	let ids= ids_.split('，');
	let print_list = `成绩单
姓名|数学|语文|英语|编程|平均分|总分
==================================
`;
	let student_1, student_2, student_3, student_4, student_sum, students_sum = 0, student_arr = [];
	students.map((student) => {
		if(ids.includes(student.split('，')[1])){
		student_1 = parseInt(student.split('，')[4].replace(/[^0-9]/ig,""));
		student_2 = parseInt(student.split('，')[5].replace(/[^0-9]/ig,""));
		student_3 = parseInt(student.split('，')[6].replace(/[^0-9]/ig,""));
		student_4 = parseInt(student.split('，')[7].replace(/[^0-9]/ig,""));
		student_sum = student_1 + student_2 + student_3 + student_4;
		student_arr.push(student_sum);
		students_sum += student_sum;
		print_list += `${student.split('，')[0]}|${student_1}|${student_2}|${student_3}|${student_4}|${student_sum/4}|${student_sum}
`;
	}
});
	print_list += `==================================
全班总分平均数：${student_sum/student_arr.length}
全班总分中位数：${getMedian(student_arr)}`;
	return print_list;
}

function getMedian(arr) {
	let al = arr.length;
	if(al % 2 === 0){
		return (arr[al/2 - 1]+arr[al/2])/2;
	}else{
		return arr[parseInt(al/2)];
	}
}


function isCorrect(student) {
	let rev = /^([\u4e00-\u9fa5]+[，]+\d+[，]+[\u4e00-\u9fa5]+[，]+\d+[，])([\u4e00-\u9fa5]+[：]+\d+[，]+){3}[\u4e00-\u9fa5]+[：]+\d+$/;
	return rev.test(student);
}

function isCorrectId(ids) {
	let rev = /^(\d+[，]+)*\d+$/;
	return rev.test(ids);
}
//console.log(isCorrectId('12，12'));

function getStudentId() {
	let getStudentIdF = readline.createInterface(process.stdin, process.stdout);

	getStudentIdF.question('------\n请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：\n------\n' , (inputStudentIds) => {
		if (isCorrectId(inputStudentIds)) {
		console.log(getPrintList(inputStudentIds, students));
		getStudentIdF.close();
		main();
	}else{
		getStudentIdF.close();
		notCorrectId();
	}

}
);
}

function notCorrectId() {
	let notCorrectIdF = readline.createInterface(process.stdin, process.stdout);

	notCorrectIdF.question(`------\n请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：
\n------\n`, (inputStudentIds) => {
		if(isCorrectId(inputStudentIds)){
		console.log(getPrintList(inputStudentIds, students));
		notCorrectIdF.close();
		main();
	}else{
		notCorrectIdF.close();
		notCorrectId();
	}
});
}
var students = [];

function main() {
	let totalList = readline.createInterface(process.stdin, process.stdout);

	totalList.question('******主菜单******\n' +
		'1. 添加学生\n' + '2. 生成成绩单\n' + '3. 退出\n******主菜单******\n请输入你的选择（1～3）： \n', function(firstInput) {

		switch (firstInput){
			case '1':
				totalList.close();
				getInputStudent();
				break;
			case '2':
				totalList.close();
				getStudentId();
				break;
			case '3':
				totalList.close();
				break;
			default:
				console.log('------\n请重新输入您的选择（1~3）： \n------\n');
				totalList.close();
				main();
		}
	});
}
main();

function getInputStudent() {
	let getInputStudentF = readline.createInterface(process.stdin, process.stdout);
	let student ;
	getInputStudentF.question('------\n请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：\n------\n', (inputStudent) => {
		student = getName(inputStudent);
	//students.push(inputStudent);
	if(isCorrect(inputStudent)){
		students.push(inputStudent);
		console.log(`-·-·-·-·-·-学生【${student}】的成绩被添加-·-·-·-·-·-`);
		getInputStudentF.close();
		main();
	}else{
		getInputStudentF.close();
		notCorrect();
	}
});
}

function notCorrect() {
	let notCorrectF = readline.createInterface(process.stdin, process.stdout);

	notCorrectF.question(`------\n请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：\n------\n`, (inputStudent) => {
		let student = getName(inputStudent);
	if(isCorrect(inputStudent)){
		students.push(inputStudent);
		console.log(`-·-·-·-·-·-\n学生【${student}】的成绩被添加\n-·-·-·-·-·-\n`);
		notCorrectF.close();
		main();
	}else{
		notCorrectF.close();
		notCorrect();
	}
});
}

