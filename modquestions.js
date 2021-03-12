'use strict';


let i = 1;

function makeLine(i) {
	let html = '';
	html += `<tr id=row_${i}>`;
	html += `<td>${i}:`;
	html += `<td><select name="level_${i}" id="level_${i}">`;
	html += `<option value="1">1</option>`;
	html += `<option value="2">2</option>`;
	html += `<option value="3">3</option>`;
	html += `<option value="4">4</option>`;
	html += `<option value="5">5</option>`;
	html += `</select></td>`;
	html += `<td><input type="text" id="question_${i}"></td>`;
	html += `<td><input type="text" id="a_${i}"></td>`;
	html += `<td><input type="text" id="b_${i}"></td>`;
	html += `<td><input type="text" id="c_${i}"></td>`;
	html += `<td><input type="text" id="d_${i}"></td>`;
	html += `<td><input type="checkbox" id="delflg_${i}"></td>`;
	html += `</tr>`;
	return html;
}
//問題作成
$(document).ready(function () {
	//ファイルの読み込み
	$.ajax({
			url: 'questions.json',
			dataType: 'json'
		})
		.done(function (data) {
			const json = data;
			let html = '';
			for (let item of json) {
				//値を取得
				const level = item['level'];
				const question = item['question'];
				const a = item['a'];
				const b = item['b'];
				const c = item['c'];
				const d = item['d'];
				const delflg = item['delflg'];
				//htmlを生成
				document.getElementById('qtable').insertAdjacentHTML('beforeend', makeLine(i));
				//値を挿入
				document.getElementById(`level_${i}`).value = level;
				document.getElementById(`question_${i}`).value = question;
				document.getElementById(`a_${i}`).value = a;
				document.getElementById(`b_${i}`).value = b;
				document.getElementById(`c_${i}`).value = c;
				document.getElementById(`d_${i}`).value = d;
				document.getElementById(`delflg_${i}`).checked = delflg;
				// if(i % 2 == 1){
				// 	document.getElementById(`row_${i}`).style.backgroundColor = 'gray';
				// }
				i++;
			}
			document.getElementById('addline-btn').addEventListener('click', () => {
				document.getElementById('qtable').insertAdjacentHTML('beforeend', makeLine(i));
				i++
			})

			document.getElementById('update-btn').addEventListener('click', () => {
				const array = [];
				for (let k = 1; k < i; k++) {
					const level = document.getElementById(`level_${k}`).value;
					const question = document.getElementById(`question_${k}`).value;
					const a = document.getElementById(`a_${k}`).value;
					const b = document.getElementById(`b_${k}`).value;
					const c = document.getElementById(`c_${k}`).value;
					const d = document.getElementById(`d_${k}`).value;
					const delflg = document.getElementById(`delflg_${k}`).checked;
					if (question && a && b && c && d) {
						const data = {
							level: level,
							question: question,
							a: a,
							b: b,
							c: c,
							d: d,
							delflg: delflg
						}
						array.push(data);
					}
				}
				const fileName = "questions.json";
				const blob = new Blob([JSON.stringify(array, null, 2)], {
					type: 'application/json'
				});
				const link = document.createElement('a');
				link.href = URL.createObjectURL(blob);
				link.download = fileName;
				link.click();
			})

		})
		.fail(function () {
			window.alert('読み込みエラー');
		});
});
