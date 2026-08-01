// ===========================
// Read History
// ===========================

let history =
JSON.parse(localStorage.getItem("history")) || [];

let labels = [];
let predicted = [];
let actual = [];

// ===========================
// Generate Data
// ===========================

history.forEach(item=>{

    labels.push(item.company);

    predicted.push(item.prediction);

    // Dummy actual values
    actual.push(item.open);

});

// ===========================
// Chart
// ===========================

const ctx =
document.getElementById("stockChart");

new Chart(ctx,{

type:"line",

data:{

labels:labels,

datasets:[

{

label:"Actual Price",

data:actual,

borderColor:"#2563EB",

backgroundColor:"#2563EB33",

borderWidth:3,

fill:false,

tension:.4

},

{

label:"Predicted Price",

data:predicted,

borderColor:"#16A34A",

backgroundColor:"#16A34A33",

borderWidth:3,

fill:false,

tension:.4

}

]

},

options:{

responsive:true,

plugins:{

legend:{

labels:{

font:{

size:16

}

}

}

},

scales:{

y:{

beginAtZero:false

}

}

}

});

// ===========================
// Dashboard
// ===========================

function goHome(){

window.location.href="index.html";

}

// ===========================
// Refresh
// ===========================

function refreshGraph(){

location.reload();

}