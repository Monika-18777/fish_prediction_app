// Fish info data (dummy data)
const fishData = {
  Salmon: {
    scientific: "Salmo salar",
    size: "70-120 cm",
    weight: "3.6 - 5.4 kg",
    lifespan: "3-8 years",
    habitat: "North Atlantic Ocean",
    distribution: "Europe, North America",
    status: "Least Concern",
    fact: "Salmon can swim upstream over waterfalls!"
  },
  Tuna: {
    scientific: "Thunnus",
    size: "1-2.5 meters",
    weight: "30 - 250 kg",
    lifespan: "15 years",
    habitat: "Warm seas",
    distribution: "Worldwide",
    status: "Near Threatened",
    fact: "Tuna can swim up to 75 km/h!"
  }
};

function showSignup() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

function showLogin() {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// Handle login success (fake for now)
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("login-slide").classList.add("hidden");
  document.getElementById("main-slide").classList.remove("hidden");
});

document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Signup successful! Please login.");
  showLogin();
});

function predictFish() {
  const file = document.getElementById("imageInput").files[0];
  if (!file) return;

  document.getElementById("loader").style.display = "block";
  document.getElementById("result-container").classList.add("hidden");

  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("preview-image").src = e.target.result;
  };
  reader.readAsDataURL(file);

  setTimeout(() => {
    const species = Math.random() > 0.5 ? "Salmon" : "Tuna";
    const confidence = Math.floor(Math.random() * 30) + 70;

    document.getElementById("species-name").innerText = species;
    document.getElementById("confidence-score").innerText = confidence + "%";
    document.getElementById("confidence-fill").style.width = confidence + "%";

    const info = fishData[species];
    document.getElementById("scientific-name").innerText = info.scientific;
    document.getElementById("average-size").innerText = info.size;
    document.getElementById("weight").innerText = info.weight;
    document.getElementById("lifespan").innerText = info.lifespan;
    document.getElementById("habitat").innerText = info.habitat;
    document.getElementById("distribution").innerText = info.distribution;
    document.getElementById("status").innerText = info.status;
    document.getElementById("fun-fact").innerText = info.fact;

    document.getElementById("loader").style.display = "none";
    document.getElementById("result-container").classList.remove("hidden");
  }, 2000);
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const species = document.getElementById("species-name").innerText;
  const confidence = document.getElementById("confidence-score").innerText;
  const info = fishData[species];

  doc.setFontSize(16);
  doc.text("🐟 Fish Species Report", 20, 20);

  // Insert image from preview
  const imgElement = document.getElementById("preview-image");
  if (imgElement.src && imgElement.src.startsWith('data:image')) {
    doc.addImage(imgElement.src, 'JPEG', 15, 30, 180, 90);  // x, y, width, height
  }

  let y = 130;

  doc.setFontSize(12);
  doc.text(`Species Name: ${species}`, 20, y);
  doc.text(`Scientific Name: ${info.scientific}`, 20, y += 10);
  doc.text(`Average Size: ${info.size}`, 20, y += 10);
  doc.text(`Average Weight: ${info.weight}`, 20, y += 10);
  doc.text(`Lifespan: ${info.lifespan}`, 20, y += 10);
  doc.text(`Habitat: ${info.habitat}`, 20, y += 10);
  doc.text(`Distribution: ${info.distribution}`, 20, y += 10);
  doc.text(`Conservation Status: ${info.status}`, 20, y += 10);
  doc.text(`Prediction Confidence: ${confidence}`, 20, y += 10);
  doc.text(`Fun Fact: ${info.fact}`, 20, y += 10);

  doc.save("fish_report.pdf");
}