'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供を全て削除する
 * @param{HTMLElement} element HTMLの要素
 */
function removeAllchildren(element) {
  while (element.firstChild) {
    //子供の要素がある限り削除
    element.removeChild(element.firstChild);
  }
}
userNameInput.onkeydown = event => {
  if (event.key === 'Enter'){
    assessmentButton.onclick();
  }
}
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
   if (userName.length === 0) {
       //名前が空のときは処理を終了する
       return;
   }
  
    // 診断結果表示エリアの作成
    removeAllchildren(resultDivided);
    
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // TODO ツイートエリアの作成
removeAllchildren(tweetDivided);
const anchor = document.createElement('a');
const hrefValue =
  'https://twitter.com/intent/tweet?button_hashtag='+
  encodeURIComponent('あなたのいいところ')+
  '&ref_src=twsrc%5Etfw';
  
  anchor.setAttribute('href',hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-test','result');
  anchor.innerText = 'Tweet #あなたのいいところ'

　tweetDivided.appendChild(anchor);

　const script = document.createElement('script');
  script.setAttribute('src','https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};
const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声はみんなを引きつけ、心に残ります。',
'{userName}のいいところは眼差しです。{userName}に見つめラれた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさが物事をいつも成功させます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を引かれます',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気にかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことにみんなが共感し、わかり合うことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えにみんなが共感します。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところです。',
'{userName}のいいところは自制心です。やばいと思った時にしっかりと衝動を抑えられる{userName}がみんなから評価されています。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string}userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
      sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g,userName);
    return result;
}
