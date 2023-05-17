// CSVファイルを取得
let csv = new XMLHttpRequest();

// CSVファイルへのパス
csv.open("GET", "../data.csv", false);

// csvファイル読み込み失敗時のエラー対応
try {
    csv.send(null);
} catch (err) {
    console.log(err);
}

// 配列を定義
let csvArray = [];

// 改行ごとに配列化
let lines = csv.responseText.split(/\r\n|\n/);

// 1行ごとに処理
for (let i = 0; i < lines.length; ++i) {
    let cells = lines[i].split(",");
    if (cells.length != 1) {
    csvArray.push(cells);
    }
}

function loadMain(){
    for(i=0; i<25; i++){
        document.getElementById('q-num'+(i+1)).textContent = String(csvArray[i+((page-6)*25)][0]);
        document.getElementById('q-for'+(i+1)).textContent = String(csvArray[i+((page-6)*25)][1]);
        document.getElementById('q'+(i+1)).textContent = String(csvArray[i+((page-6)*25)][2]);
        document.getElementById('a'+(i+1)).textContent = String(csvArray[i+((page-6)*25)][4]);
        document.getElementById('q-back'+(i+1)).textContent = String(csvArray[i+((page-6)*25)][3]);
    }

    document.getElementById('pages').textContent = "P."+ String(page*2-6) + " - " + String(page*2-5);

    return 0;
}

window.onload = loadMain;






var i;
var page = 6;
var array = []
for(i=0; i<25;i++){
    array.push(i);
}

$("#showall").click(function(){
    $(".que").addClass("active");
    $("#showall").addClass("active");
    $("#hideall").addClass("active");
});

$("#hideall").click(function(){
    $(".que").removeClass("active");
    $("#showall").removeClass("active");
    $("#hideall").removeClass("active");
});

$(".que").click(function(){
    $(this).toggleClass("active");
});

$("#page-next").click(function(){
    page = page < 10 ? page + 1 : page;
    loadMain();
});

$("#page-prev").click(function(){
    page = page > 6 ? page - 1 : page;
    loadMain();
});

$("#random").click(function(){
    var a;
    var b;
    var temp;
    for(i=0; i<50; i++){
        a = Math.floor( Math.random() * 25);
        b = Math.floor( Math.random() * 25);

        temp = array[a];

        array[a] = array[b];
        array[b] = temp;
    }

    for(i=0; i<25; i++){
        document.getElementById('q-num'+(i+1)).textContent = String(csvArray[array[i]+((page-6)*25)][0]);
        document.getElementById('q-for'+(i+1)).textContent = String(csvArray[array[i]+((page-6)*25)][1]);
        document.getElementById('q'+(i+1)).textContent = String(csvArray[array[i]+((page-6)*25)][2]);
        document.getElementById('a'+(i+1)).textContent = String(csvArray[array[i]+((page-6)*25)][4]);
        document.getElementById('q-back'+(i+1)).textContent = String(csvArray[array[i]+((page-6)*25)][3]);
    }
    
    $("#random").addClass("active");
    $("#rev-random").addClass("active");
});

$("#rev-random").click(function(){
    loadMain();
    $("#random").removeClass("active");
    $("#rev-random").removeClass("active");
});