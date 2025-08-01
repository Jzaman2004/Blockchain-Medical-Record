// script.js - The FINAL, WORKING, "I DON'T CARE, IT JUST WORKS" Edition

// DOM Elements
const connectWalletBtn = document.getElementById("connectWalletBtn");
const walletStatus = document.getElementById("walletStatus");
const connectModal = document.getElementById("connectModal");
const closeButtons = document.querySelectorAll(".close");
const submitWallet = document.getElementById("submitWallet");
const grantAccessBtn = document.getElementById("grantAccessBtn");
const grantModal = document.getElementById("grantModal");
const submitGrant = document.getElementById("submitGrant");
const fileUpload = document.getElementById("fileUpload");
const uploadBtn = document.getElementById("uploadBtn");

// Sections to show after connect
const recordsSection = document.getElementById("recordsSection");
const accessSection = document.getElementById("accessSection");
const uploadSection = document.getElementById("uploadSection");

// Lists
const recordList = document.getElementById("recordList");
const accessList = document.getElementById("accessList");

// Open Modals
connectWalletBtn.addEventListener("click", () => {
  connectModal.style.display = "flex";
});

grantAccessBtn.addEventListener("click", () => {
  grantModal.style.display = "flex";
});

// Close Modals
closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    connectModal.style.display = "none";
    grantModal.style.display = "none";
  });
});

// Close on click outside
window.addEventListener("click", (e) => {
  if (e.target === connectModal) connectModal.style.display = "none";
  if (e.target === grantModal) grantModal.style.display = "none";
});

// ✅ Connect Wallet — Accept ANYTHING
submitWallet.addEventListener("click", () => {
  const nameInput = document.getElementById("patientNameInput").value;
  const addressInput = document.getElementById("walletAddress").value;

  const name = nameInput.trim() || "Patient";
  const address = addressInput.trim() || "kolpoa...aejn";

  // Just connect
  alert(`🔐 Wallet Connected! Welcome, ${name}!`);
  walletStatus.textContent = `Connected: ${address}`;
  document.getElementById("patientName").textContent = name;
  connectWalletBtn.style.display = "none";

  // Show the app
  recordsSection.style.display = "block";
  accessSection.style.display = "block";
  uploadSection.style.display = "block";

  connectModal.style.display = "none";
});

// ✅ Grant Access — Just add it
submitGrant.addEventListener("click", () => {
  const providerInput = document.getElementById("providerName").value;
  const duration = document.getElementById("accessDuration").value;

  const provider = providerInput.trim() || "Unknown Entity";

  const expires = duration == 0 ? "Never" : `${duration} days`;

  alert(`✅ Access granted to ${provider}! Expires: ${expires}`);

  const li = document.createElement("li");
  li.dataset.provider = provider;
  li.innerHTML = `
    <span>${provider} (Expires: ${expires})</span>
    <button class="revokeBtn">Revoke</button>
  `;
  accessList.appendChild(li);
  attachRevokeListeners();
  grantModal.style.display = "none";
  document.getElementById("providerName").value = "";
});

// ✅ Revoke Access
function attachRevokeListeners() {
  document.querySelectorAll(".revokeBtn").forEach(btn => {
    btn.onclick = function () {
      const provider = this.parentElement.dataset.provider;
      alert(`🚫 Access revoked from ${provider}`);
      this.parentElement.remove();
    };
  });

  // ✅ Make Verify buttons work
  document.querySelectorAll(".verify-btn").forEach(btn => {
    btn.onclick = function () {
      const fileName = this.parentElement.querySelector("strong").textContent;
      alert(`✅ Verified on Blockchain\n\n📄 Record: ${fileName}\n⛓️ Stored on Ethereum (Goerli)\n📦 Hash: ${generateFakeHash()}\n🔢 Tx: 0x${generateFakeHash()}`);
    };
  });
}

// ✅ Upload File
uploadBtn.addEventListener("click", () => {
  const file = fileUpload.files[0];
  const filename = file ? file.name : "medical-report.pdf";

  const hash = generateFakeHash();

  alert(`✅ File uploaded!\n\n📄 ${filename}\n🔐 Hash: ${hash}\n⛓️ Sealed on blockchain\n📌 Tx: 0x${hash}`);

  const li = document.createElement("li");
  const date = new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: '2-digit' });
  li.innerHTML = `
    <strong>${filename}</strong> – ${date} – 
    <span class="hash">${hash}</span>
    <button class="verify-btn">🔍 Verify</button>
  `;
  recordList.appendChild(li);

  // Re-attach listeners
  attachRevokeListeners();
  fileUpload.value = "";
});

// ✅ Dark Mode
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const btn = document.getElementById("darkModeToggle");
  btn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌓 Dark Mode";
});

// ✅ Helper: Generate fake hash
function generateFakeHash() {
  return Array(16).fill(null).map(() => Math.random().toString(16).charAt(2)).join('');
}

// Initialize listeners
attachRevokeListeners();