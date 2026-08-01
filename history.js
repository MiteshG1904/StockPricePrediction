// =============================
// Load History
// =============================

let history =
JSON.parse(localStorage.getItem("history")) || [];

let tbody =
document.querySelector("#historyTable tbody");

// =============================
// Display Table
// =============================

history.forEach(item=>{

let row=`

<tr>

<td>${item.date}</td>

<td>${item.company}</td>

<td>${item.open}</td>

<td>${item.high}</td>

<td>${item.low}</td>

<td>${item.volume}</td>

<td>₹ ${Number(item.prediction).toFixed(2)}</td>

<td>${item.accuracy}%</td>

</tr>

`;

tbody.innerHTML+=row;

});

// =============================
// Dashboard
// =============================

function goHome(){

window.location.href="index.html";

}

// =============================
// Clear History
// =============================

function clearHistory(){

if(confirm("Delete all prediction history?")){

localStorage.removeItem("history");

location.reload();

}

}

// =============================
// Export CSV
// =============================

function downloadCSV(){

let csv =
"Date,Company,Open,High,Low,Volume,Prediction,Accuracy\n";

history.forEach(item=>{

csv+=`${item.date},${item.company},${item.open},${item.high},${item.low},${item.volume},${item.prediction},${item.accuracy}\n`;

});

const blob=new Blob([csv],{

type:"text/csv"

});

const url=
window.URL.createObjectURL(blob);

const a=
document.createElement("a");

a.href=url;

a.download="Prediction_History.csv";

a.click();

}