'use strict';

let num = 0; //いま、何問目？？
let price = 1000; //賞金額

//ライフラインフラグ
let fiftyFlg = true;
let telFlg = true;
let audFlg = true;

//各種配列
let questions = new Array;
let question = new Array;

let ansFlg = true;
let ans = '';
let teltime = 61;

document.getElementById('namebtn').addEventListener('click', function () {
	document.getElementById('name').textContent = document.getElementById('center-input').value;
	document.getElementById('header').style.visibility = 'visible';
	quizMode();
	init();
});

function quizMode() {
	document.getElementById('quiz').style.visibility = 'visible';
	document.getElementById('lifeline').style.visibility = 'visible';
	document.getElementById('center').style.visibility = 'hidden';
};

function msgMode() {
	document.getElementById('quiz').style.visibility = 'hidden';
	document.getElementById('lifeline').style.visibility = 'hidden';
	document.getElementById('center').style.visibility = 'visible';
};

function init() {
	//問題の作成
	questions = getCsv();
	//ランダムに並び替え
	questions = shuffle(questions);
	//ループしながら問題を選択
	question = makeQuestion(questions);
}


//出題用function
function makeQuestion(questions) {
	resetAns();
	document.getElementById('audience').style.visibility = 'hidden';
	num++;
	ansFlg = true;
	for (let item of questions) {
		if (num === item[0]) {
			document.getElementById('ask').textContent = `Q.${num}:${item[1]}`;
			document.getElementById('a').textContent = `A.${item[2]}`;
			document.getElementById('b').textContent = `B.${item[3]}`;
			document.getElementById('c').textContent = `C.${item[4]}`;
			document.getElementById('d').textContent = `D.${item[5]}`;
			document.getElementById('money').textContent = '¥' + String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'); //price;
			questions
			return item;
		}
	}
}

//問題作成 ※開発中用
function getCsv() {
	const array1 = [1, '次のうち、道路信号に使われていない色はどれ。', '赤', '青', '黒', '黄', 3];
	const array2 = [2, '次のうち、M-1グランプリで優勝していないコンビはどれ。', 'ミルクボーイ', 'マヂカルラブリー', '千鳥', 'アンタッチャブル', 3];
	const array3 = [3, '次のうち、The Beatlesのメンバーなのは誰。', 'ミック・ジャガー', 'ポール・マッカートニー', 'スティーヴン・タイラー', 'カート・コバーン', 2];
	const array4 = [4, '次のうち、テネシーウイスキーはどれ。', 'ジャック・ダニエル', 'ジョニー・ウォーカー', 'ジムビーム', 'ラフロイグ', 1];
	const array5 = [5, '総合格闘技のリングで、グレイシー一族と対戦していない日本人は次の誰。', '桜庭和志', '石田光洋', '中邑真輔', '田村潔司', 2];
	const questions = [array1, array2, array3, array4, array5];
	return questions;
}


//配列をシャッフル
function shuffle(array) {
	for (let i = (array.length - 1); 0 < i; i--) {
		// 0〜(i+1)の範囲で値を取得
		const r = Math.floor(Math.random() * (i + 1));
		// 要素の並び替えを実行
		const tmp = array[i];
		array[i] = array[r];
		array[r] = tmp;
	}
	return array;
}

//回答を選択したときの処理
const ansArray = document.getElementsByClassName('select');
for (let item of ansArray) {
	item.addEventListener('click', function (e) {
		if (item.textContent !== '　') {
			if (ansFlg) {
				resetAns();
				ans = e.target.id;
				coloredAns(ans, '#FDAE1D');
				ansFlg = false;
				const selectedAns = document.getElementById(ans).textContent;
				document.getElementById('center-content').innerHTML = `<p>${selectedAns}、ファイナルアンサー？？</p><button id="yesbtn" class="btn">はい</button><button id="nobtn" class="btn">いいえ</button>`;
				document.getElementById('center').style.visibility = 'visible';
				//ファイナルアンサーではいを選んだとき
				document.getElementById('yesbtn').addEventListener('click', function () {
					ansFlg = false;
					const waitTime = 1000;
					switch (ans) {
						case 'a':
							if (question[6] === 1) {
								setTimeout(clear, waitTime);
							} else {
								setTimeout(failed, waitTime);
							}
							break;
						case 'b':
							if (question[6] === 2) {
								setTimeout(clear, waitTime);
							} else {
								setTimeout(failed, waitTime);
							}
							break;
						case 'c':
							if (question[6] === 3) {
								setTimeout(clear, waitTime);
							} else {
								setTimeout(failed, waitTime);
							}
							break;
						case 'd':
							if (question[6] === 4) {
								setTimeout(clear, waitTime);
							} else {
								setTimeout(failed, waitTime);
							}
							break;
					}
				});
				//ファイナルアンサーでいいえを選んだとき
				document.getElementById('nobtn').addEventListener('click', function () {
					ansFlg = true;
					document.getElementById('center').style.visibility = 'hidden';
					resetAns();
				});
			}
		}
	})
};

//回答が正解だったとき
function clear() {
	document.getElementById('center-content').innerHTML = `<p>正解！！</p><button id="nextbtn" class="btn">次へ</button>`;
	coloredAns(ans, '#92CC41');
	document.getElementById('nextbtn').addEventListener('click', function () {
		if (num < 5) {
			price *= 10;
			question = makeQuestion(questions);
			quizMode();
		} else {
			fiftyFlg = false;
			telFlg = false;
			audFlg = false;
			document.getElementById('center-content').innerHTML = `<p>ミリオネア達成おめでとう！！</p><button id="nextbtn" class="btn">次へ</button>`;
			document.getElementById('nextbtn').addEventListener('click', function () {
				retry();
			})
		}
	})

}

//回答が不正解だったとき
function failed() {
	fiftyFlg = false;
	telFlg = false;
	audFlg = false;
	ansFlg = false;
	checkAns();
	document.getElementById('center-content').innerHTML = `<p>残念！！</p><button id="nextbtn" class="btn">次へ</button>`;
	document.getElementById('nextbtn').addEventListener('click', function () {
		setTimeout(retry, 1000);
	})
}

//再挑戦confirm
function retry() {
	document.getElementById('center-content').innerHTML = `<p>再挑戦しますか？？</p><button id="yesbtn" class="btn">はい</button><button id="nobtn" class="btn">いいえ</button>`;
	//再挑戦する場合
	document.getElementById('yesbtn').addEventListener('click', function () {
		num = 0;
		price = 1000;
		fiftyFlg = true;
		telFlg = true;
		audFlg = true;
		document.getElementById('usedFifty').style.visibility = 'hidden';
		document.getElementById('usedTel').style.visibility = 'hidden';
		document.getElementById('usedAud').style.visibility = 'hidden';
		quizMode();
		init();
	})
	//再挑戦しない場合
	document.getElementById('nobtn').addEventListener('click', function () {
		document.getElementById('header').style.visibility = 'hidden';
		document.getElementById('center-content').innerHTML = `<p>お疲れさまでした。<br>再挑戦する場合はページを再読み込みしてください。</p>`;
	})
}

//不正解時の答え合わせ
function checkAns() {
	const clr = '#6BCB21';
	switch (question[6]) {
		case 1:
			coloredAns('a', clr);
			break;
		case 2:
			coloredAns('b', clr);
			break;
		case 3:
			coloredAns('c', clr);
			break;
		case 4:
			coloredAns('d', clr);
			break;
	}
}

//選択肢の色塗り
function coloredAns(ans, clr) {
	document.getElementById(ans).style.background = clr;
}

//選択肢の色をリセット
function resetAns() {
	coloredAns('a', null);
	coloredAns('b', null);
	coloredAns('c', null);
	coloredAns('d', null);
}


//50X50(正解の選択肢の抽出用)
document.getElementById('fifty-fifty').addEventListener('click',
	function () {
		if (fiftyFlg) {
			if (ansFlg) {
				document.getElementById('center').style.visibility = 'visible';
				ansFlg = false;
				document.getElementById('center-content').innerHTML = `<p>50:50を使用しますか？？</p><button id="yesbtn" class="btn">はい</button><button id="nobtn" class="btn">いいえ</button>`;
				//使用する場合
				document.getElementById('yesbtn').addEventListener('click', function () {
					fiftyFlg = false;
					let arrayAnswer = '';
					switch (question[6]) {
						case 1:
							arrayAnswer = ['b', 'c', 'd'];
							elaseAnswer(arrayAnswer);
							break;
						case 2:
							arrayAnswer = ['a', 'c', 'd'];
							elaseAnswer(arrayAnswer);
							break;
						case 3:
							arrayAnswer = ['a', 'b', 'd'];
							elaseAnswer(arrayAnswer);
							break;
						case 4:
							arrayAnswer = ['a', 'b', 'c'];
							elaseAnswer(arrayAnswer);
							break;
					}
					document.getElementById('usedFifty').style.visibility = 'visible';
					document.getElementById('center').style.visibility = 'hidden';
					ansFlg = true;
				})
				//使用しない場合
				document.getElementById('nobtn').addEventListener('click', function () {
					document.getElementById('center').style.visibility = 'hidden';
					ansFlg = true;
				})
			}
		}
	}, false
);

//50X50で選択肢を消すfunction
function elaseAnswer(arrayAnswer) {
	shuffle(arrayAnswer);
	document.getElementById(arrayAnswer[0]).textContent = '　';
	document.getElementById(arrayAnswer[1]).textContent = '　';
}

//テレフォン
document.getElementById('telephone').addEventListener('click',
	function () {
		if (telFlg) {
			if (ansFlg) {
				ansFlg = false;
				document.getElementById('center').style.visibility = 'visible';
				document.getElementById('center-content').innerHTML = `<p>テレフォンを使用しますか？？</p><button id="yesbtn" class="btn">はい</button><button id="nobtn" class="btn">いいえ</button>`;
				//使用する場合
				document.getElementById('yesbtn').addEventListener('click', function () {
					document.getElementById('center-content').innerHTML = `<p>このボタンをクリックするとテレフォン開始です。</p><button id="startbtn" class="btn">START</button>`;
					document.getElementById('startbtn').addEventListener('click', function () {
						telFlg = false;
						let countdown = setInterval(function () {
							reculc();
							if (teltime < 0) {
								clearInterval(countdown);
								document.getElementById('usedTel').style.visibility = 'visible';
								document.getElementById('center').style.visibility = 'hidden';
								ansFlg = true;
							}
						}, 1000);
					})
				})
				//使用しない場合
				document.getElementById('nobtn').addEventListener('click', function () {
					document.getElementById('center').style.visibility = 'hidden';
					ansFlg = true;
				})
			}
		}
	}, false
);

function reculc() {
	teltime--;
	document.getElementById('center-content').innerHTML = `<h1>${teltime}</h1>`;
};


//オーディエンス
document.getElementById('audienc').addEventListener('click',
	function () {
		if (audFlg) {
			if (ansFlg) {
				ansFlg = false;
				document.getElementById('center').style.visibility = 'visible';
				document.getElementById('center-content').innerHTML = `<p>オーディエンスを使用しますか？？</p><button id="yesbtn" class="btn">はい</button><button id="nobtn" class="btn">いいえ</button>`;
				//使用する場合
				document.getElementById('yesbtn').addEventListener('click', () => {
					audFlg = false;
					const audArray = [200, 150, 100, 50, 0];
					let a = 0;
					let b = 0;
					let c = 0;
					let d = 0;
					document.getElementById('audience').style.visibility = 'visible';
					if (document.getElementById('a').textContent !== '　') {
						a = Math.floor(Math.random() * 100);
					}
					if (document.getElementById('b').textContent !== '　') {
						b = Math.floor(Math.random() * 100);
					}
					if (document.getElementById('c').textContent !== '　') {
						c = Math.floor(Math.random() * 100);
					}
					if (document.getElementById('d').textContent !== '　') {
						d = Math.floor(Math.random() * 100);
					}
					switch (question[6]) {
						case 1:
							a += audArray[num - 1];
							break;
						case 2:
							b += audArray[num - 1];
							break;
						case 3:
							c += audArray[num - 1];
							break;
						case 4:
							d += audArray[num - 1];
							break;
					}
					const total = a + b + c + d;
					const per_a = Math.round(a / total * 100);
					const per_b = Math.round(b / total * 100);
					const per_c = Math.round(c / total * 100);
					const per_d = Math.round(d / total * 100);
					document.getElementById('bar1').style.height = per_a * 2.5 + 'px';
					document.getElementById('bar2').style.height = per_b * 2.5 + 'px';
					document.getElementById('bar3').style.height = per_c * 2.5 + 'px';
					document.getElementById('bar4').style.height = per_d * 2.5 + 'px';
					document.getElementById('answer1').textContent = 'A.' + per_a + '%';
					document.getElementById('answer2').textContent = 'B.' + per_b + '%';
					document.getElementById('answer3').textContent = 'C.' + per_c + '%';
					document.getElementById('answer4').textContent = 'D.' + per_d + '%';
					document.getElementById('usedAud').style.visibility = 'visible';
					document.getElementById('center').style.visibility = 'hidden';
					ansFlg = true;
				})
				document.getElementById('nobtn').addEventListener('click', function () {
					document.getElementById('center').style.visibility = 'hidden';
					ansFlg = true;
				})
			}
		}
	}, false
);
