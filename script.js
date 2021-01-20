'use strict';
//名前入力
let name = window.prompt('あなたの人生を変えるかもしれないクイズ・ミリオネア。\nまずは、あなたの名前を入力してください');
if (name === '') {
    name = '　';
}
document.getElementById('name').textContent = name;
let num = 0; //いま、何問目？？
let price = 1000; //賞金額

//ライフラインフラグ
let fiftyFlg = true;
let telFlg = true;
let audFlg = true;

//csv読み込み
const questions = getCsv();

//ランダムに並び替え
shuffle(questions);

//ループしながら問題を選択
let question = makeQuestion(questions);

//出題用function
function makeQuestion(questions) {
    resetAns();
    document.getElementById('audience').style.visibility = 'hidden';
    num++;
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
    const array3 = [3, '12世紀後半、日宋貿易を行った人物は次の誰。', '後醍醐天皇', '藤原道長', '足利義満', '平清盛', 4];
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
    item.addEventListener('click', function () {
        const ans = item.id;
        const selectedAns = document.getElementById(ans).textContent;
        const waitTime = 100;
        if (item.textContent !== '　') {
            if (window.confirm('ファイナルアンサー？？')) {
                checkAns();
                switch (ans) {
                    case 'a':
                        if (question[6] === 1) {
                            setTimeout(clear, waitTime);
                        } else {
                            failed();
                        }
                        break;
                    case 'b':
                        if (question[6] === 2) {
                            setTimeout(clear, waitTime);
                        } else {
                            failed();
                        }
                        break;
                    case 'c':
                        if (question[6] === 3) {
                            setTimeout(clear, waitTime);
                        } else {
                            failed();
                        }
                        break;
                    case 'd':
                        if (question[6] === 4) {
                            setTimeout(clear, waitTime);
                        } else {
                            failed();
                        }
                        break;
                }
            }
        }
    }, false);
}


//回答が正解だったとき
function clear() {
    window.alert('正解！！');
    if (num < 5) {
        price *= 10;
        question = makeQuestion(questions);
    } else {
        window.alert('ミリオネア達成おめでとう！！');
        retry();
    }
}

//回答が不正解だったとき
function failed() {
    window.alert('残念！！');
    setTimeout(retry, 1000);
}

//再挑戦confirm
function retry() {
    if (window.confirm('再挑戦しますか？')) {
        location.reload();
    } else {
        resetAns();
        document.getElementById('ask').textContent = '　';
        document.getElementById('a').textContent = '　';
        document.getElementById('b').textContent = '　';
        document.getElementById('c').textContent = '　';
        document.getElementById('d').textContent = '　';
        fiftyFlg = false;
        telFlg = false;
        audFlg = false;
    }
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
            if (window.confirm('50:50を使いますか?')) {
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
            if (window.confirm('テレフォンを使いますか?')) {
                window.alert('このウインドウを閉じると60秒のカウントダウンが始まります。\nその間に電話をかけて下さい。');
                telFlg = false;
                document.getElementById('tel').style.visibility = 'visible';
                reculc();
                
            }
        }
    }, false
);

function reculc() {
    let time = document.getElementById('tel').textContent;
    time--;
    document.getElementById('tel').textContent = time;
    if (time >= 0) {
        refresh();
    } else {
        document.getElementById('usedTel').style.visibility = 'visible';
        setTimeout(document.getElementById('tel').style.visibility = 'hidden', 1000);
    }

}

function refresh() {
    setTimeout(reculc, 1000);
}

//オーディエンス
document.getElementById('audienc').addEventListener('click',
    function () {
        if (audFlg) {
            if (window.confirm('オーディエンスを使いますか?')) {
                audFlg = false;
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
                const total = a + b + c + d;
                const per_a = Math.round(a / total * 100);
                const per_b = Math.round(b / total * 100);
                const per_c = Math.round(c / total * 100);
                const per_d = Math.round(d / total * 100);
                document.getElementById('bar1').style.height = per_a * 3 + 'px';
                document.getElementById('bar2').style.height = per_b * 3 + 'px';
                document.getElementById('bar3').style.height = per_c * 3 + 'px';
                document.getElementById('bar4').style.height = per_d * 3 + 'px';
                document.getElementById('answer1').textContent = 'A.' + per_a + '%';
                document.getElementById('answer2').textContent = 'B.' + per_b + '%';
                document.getElementById('answer3').textContent = 'C.' + per_c + '%';
                document.getElementById('answer4').textContent = 'D.' + per_d + '%';
                document.getElementById('usedAud').style.visibility = 'visible';
            }
        }
    }, false
);
