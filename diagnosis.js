'use strict';
//htmlから要素取得
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
const questionParagraph = document.getElementById('question');

//日付からの値生成
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth()+1;
const day = today.getDate();
const weekDay = today.getDay();

//初期設定
const positions = [
    //正常位
    '網代本手','揚羽本手','筏本手','せきれい本手','寿本手',
    '洞入り本手','笠舟本手','深山','入船本手',

    '締め小股','しがらみ','こたつ隠れ','だるま返し','吊り橋',
    '松葉崩し','てこがかり',
    //腰高位
    '千鳥',
    //後背位
    '後櫓','鴨越え','碁盤攻め・将棋攻め','仏壇返し','つばめ返し','抱き上げ','押し車',
    //腰吊位
    '立ち松葉',
    //対面座位
    '獅子舞','首引き恋慕(紐付き)','帆掛け茶臼','唐草居茶臼','忍び居茶臼','抱き地蔵',
    //後背座位
    '本駒駆け','しぼり芙蓉','乱れ牡丹','鳴門','こたつがかり','手がけ','浮橋',
    //男性上位・女性上位
    '百閉','茶臼のばし・筏茶臼','本茶臼',
    //騎乗位
    '流鏑馬','時雨茶臼','機織茶臼','月見茶臼','宝船(寶船)','御所車','ヨシムラ',
    //側臥位=側位
    '菊一文字',
    //仰臥位
    '撞木ぞり','窓の月','こぼれ松葉','横笛',
    //立交位=立位
    '立ち鼎','櫓立ち'
];
const maleTongueTechnique = [
    '寄り添い','鶯の谷渡り','立ち花菱','岩清水','鴨越えの逆落とし','二つ巴','逆さ椋鳥'
];
const femaleTongueTechnique = ['雁が首','千鳥の曲','椋鳥','二つ巴','逆さ椋鳥'];

//表示のリセット
/**
 * 指定した要素の子要素を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

//診断
function diagnosis(userName) {
    let num = assessment(userName);
    let num_p = num % positions.length;

    /* TD　num_sを生成し舌技を決定、出力
    if (userSex === 'male'){
        let num_tT = num % maleTongueTechnique.length;
        let tT = maleTongueTechnique[num_tT];
    }else if (userSex === 'female'){
        let num_tT = num % femaleTongueTechnique.length;
        let tT = femaleTongueTechnique[num_tT];
    }
    */

    let ans = `${userName}さんの得意な体位は${positions[num_p]}です。`;
    console.log(ans);
    return ans;
}

//結果の表示処理
assessmentButton.onclick = () => {
    const userName = userNameInput.value;

    //TD ラジオボタンから性別取得

    //入力がない場合処理終了
    if (userName.length === 0){
        return;
    }
    
    //結果表示
    removeAllChildren(resultDivided);
    const header = document.createElement('h1');
    header.innerText = `${userName}さんの得意な体位`;
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = diagnosis(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    questionParagraph.innerHTML = '<br><br>別の名前で診断'

    //ツイートの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = `https://twitter.com/intent/tweet?button_hashtag=${encodeURIComponent('私の得意な体位')}&ref_src=twsrc%5Etfw`;
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.setAttribute('data-url', 'https://github.com/jinshichiro/position_diagnosis');
    anchor.innerText = 'Tweet #私の得意な体位';
    tweetDivided.appendChild(anchor);

    //widjet.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script); 
};

// 入力後Enterでも処理できるようにする
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};

//入力名と日付から値を生成
/**
 * 名前の文字列を渡すと値を返す関数
 * @param {string} userName ユーザーの名前
 * @return {number} 値
 */
function assessment(userName){
    let sumOfCharaCode = 0;
    for (let i  = 0; i < userName.length; i++){
        sumOfCharaCode += userName.charCodeAt(i);
    }

    let index = sumOfCharaCode*(year+month+day);
    return index;
}
