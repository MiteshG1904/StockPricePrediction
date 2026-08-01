// ===============================
// Company Logos
// ===============================

const company = document.getElementById("company");
const companyLogo = document.getElementById("companyLogo");

const logos = {
    "AAPL": "images/Apple.jpg",
    "GOOGL": "images/Google.png",
    "AMZN": "images/Amazon.jpg",
    "TSLA": "images/Tesla.png"
};

company.addEventListener("change", function () {
    companyLogo.src = logos[this.value];
});

company.addEventListener("change", () => {
    companyLogo.src = logos[company.value];
});

// ===============================
// Buttons
// ===============================

const predictBtn = document.getElementById("predictBtn");
const clearBtn = document.getElementById("clearBtn");
const graphBtn = document.getElementById("graphBtn");
const historyBtn = document.getElementById("historyBtn");

// ===============================
// Predict
// ===============================

predictBtn.addEventListener("click", predictStock);

async function predictStock() {

    const open = document.getElementById("open").value;
    const high = document.getElementById("high").value;
    const low = document.getElementById("low").value;
    const volume = document.getElementById("volume").value;

    if(open=="" || high=="" || low=="" || volume==""){

        alert("Please fill all fields.");

        return;
    }

    document.getElementById("status").innerHTML="Predicting...";

    try{

        // ===============================
        // Flask API
        // ===============================

        const response = await fetch("http://127.0.0.1:5000/predict",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                company:company.value,

                open:parseFloat(open),

                high:parseFloat(high),

                low:parseFloat(low),

                volume:parseFloat(volume)

            })

        });

        const data = await response.json();

        document.getElementById("prediction").innerHTML =
            "₹ " + data.prediction.toFixed(2);

        document.getElementById("accuracy").innerHTML =
            data.accuracy + "%";

        if(data.prediction > open){

            document.getElementById("trend").innerHTML =
            "📈 Bullish";

        }

        else{

            document.getElementById("trend").innerHTML =
            "📉 Bearish";

        }

        document.getElementById("status").innerHTML =
        "Prediction Completed";

        saveHistory(data.prediction,data.accuracy);

    }

    catch(error){

        console.log(error);

        document.getElementById("status").innerHTML="Server Error";

        alert("Unable to connect to Flask Server.");

    }

}

// ===============================
// Save History
// ===============================

function saveHistory(prediction,accuracy){

    let history =
    JSON.parse(localStorage.getItem("history")) || [];

    history.push({

        company:company.value,

        open:document.getElementById("open").value,

        high:document.getElementById("high").value,

        low:document.getElementById("low").value,

        volume:document.getElementById("volume").value,

        prediction:prediction,

        accuracy:accuracy,

        date:new Date().toLocaleString()

    });

    localStorage.setItem("history",JSON.stringify(history));

}

// ===============================
// Clear
// ===============================

clearBtn.addEventListener("click",()=>{

    document.getElementById("open").value="";
    document.getElementById("high").value="";
    document.getElementById("low").value="";
    document.getElementById("volume").value="";

    document.getElementById("prediction").innerHTML="₹ 0.00";

    document.getElementById("trend").innerHTML="Waiting for Prediction";

    document.getElementById("accuracy").innerHTML="--%";

    document.getElementById("status").innerHTML="Ready";

});

// ===============================
// Graph Page
// ===============================

graphBtn.addEventListener("click",()=>{

    window.location.href="graph.html";

});

// ===============================
// History Page
// ===============================

historyBtn.addEventListener("click",()=>{

    window.location.href="history.html";

});

fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        open: open,
        high: high,
        low: low,
        volume: volume
    })
})