// DATA RAHASIA BOS FAJAR (TETAP PAKAI HASH ASLI)
const SECRETS = {
    userAdmin: "66740bc98db09009125649c9cb0500900082e8b40423ef56d1837c08b39d4639", 
    passAdmin: "6b4cd84fcae2d87c1b7d2c46d4a0959276dd57828421e18bf0b8d0c917dbe42a"
};

const PRIZE_IMAGES = {
    "SR": "https://wallpaperaccess.com/full/1324795.jpg",
    "R": "https://wallpaperaccess.com/full/1569300.jpg",
    "C": "https://p4.wallpaperbetter.com/wallpaper/403/17/740/garena-free-fire-battlegrounds-official-logo-4k-wallpaper-preview.jpg",
    "ZONK": "https://wallpapercave.com/wp/wp4803525.jpg"
};

let koin = localStorage.getItem('koin') ? parseInt(localStorage.getItem('koin')) : 5;
let nickname = localStorage.getItem('nickname') || "PLAYER";
let backpack = JSON.parse(localStorage.getItem('backpack')) || [];
const ownerWA = "6287783141760";

document.getElementById('buyerName').value = nickname;
updateDisplay(); updateBackpack(); startFakeWinner();

// LOGIN ADMIN PAKAI SANDI RAHASIA BOS
function activateAdmin() {
    let u = prompt("USER:");
    let p = prompt("PASS:");
    
    // Verifikasi menggunakan SHA256 (Pastikan library crypto-js ada di HTML)
    if (CryptoJS.SHA256(u).toString() === SECRETS.userAdmin && CryptoJS.SHA256(p).toString() === SECRETS.passAdmin) {
        let j = prompt("JUMLAH KOIN:");
        if (j) { koin += parseInt(j); updateDisplay(); alert("KOIN DITAMBAHKAN, BOS!"); }
    } else { alert("AKSES DITOLAK! CEK LAGI USER & PW ASLI BOS."); }
}

// FAKE WINNER DENGAN NAMA SANGAT BANYAK (BIAR GAK BOSEN)
function startFakeWinner() {
    const n = [
        "Tatakae", "Windut", "Reja", "Bocil_FF", "Sultan_Keren", "Fajar_Fans", "Adit_Pro", 
        "Bang_Ganz", "Suka_Gacha", "Epep_Player", "Kipli_Gamer", "Raja_Gurun", "Wibu_FF", 
        "Noob_Master", "Zon_Ganteng", "Putra_FF", "Rangga_SG2", "Dafa_Old", "Bagas_Pro",
        "Aldi_Sultan", "Rizky_Gacor", "Fadil_Ganz", "Gibran_FF", "Zaki_Gacha", "Rama_Ace",
        "Si_Ganteng", "Epep_Slayer", "Akun_Hoki", "Maling_Gacha", "Pemburu_Sultan"
    ];
    const p = ["AKUN SULTAN 🔥", "1.000 DIAMOND 💎", "WEEKLY MEMBERSHIP ✨", "AKUN SG 💎", "RP 5.000 💵", "100 DIAMOND 💎"];
    
    setInterval(() => {
        const box = document.getElementById('fakeWinner');
        if(box){
            document.getElementById('fakeName').innerText = n[Math.floor(Math.random() * n.length)];
            document.getElementById('fakePrize').innerText = p[Math.floor(Math.random() * p.length)];
            box.classList.remove('hidden');
            setTimeout(() => box.classList.add('hidden'), 5000);
        }
    }, 10000);
}

// FUNGSI LAINNYA TETAP SAMA
function saveName() { nickname = document.getElementById('buyerName').value.toUpperCase(); localStorage.setItem('nickname', nickname); }
function updateDisplay() { document.getElementById('userKoin').innerText = koin; localStorage.setItem('koin', koin); }
function toggleModal(show) { document.getElementById('listModal').style.display = show ? 'flex' : 'none'; }

function spinGacha() {
    if (koin < 1) return alert("Koin Habis!");
    koin--; updateDisplay();
    const btn = document.getElementById('btnSpin');
    const res = document.getElementById('resultText');
    const img = document.getElementById('prizeImg');
    btn.disabled = true;
    res.innerHTML = "<span class='animate-pulse text-yellow-500'>ROLLING...</span>";

    setTimeout(() => {
        let rollK = Math.random() * 100;
        let rollH = Math.random() * 100;
        let hadiah = ""; let isZonk = false; let kasta = "";

        if (rollK <= 0.1) { kasta = "SR"; hadiah = rollH <= 10 ? "AKUN SULTAN 🔥" : "1K DIAMOND 💎"; } 
        else if (rollK <= 5.1) { kasta = "R"; if (rollH <= 10) hadiah = "AKUN POLOSAN SG 💎"; else if (rollH <= 40) hadiah = "WEEKLY ✨"; else hadiah = "100 DM 💎"; } 
        else { kasta = "C"; if (rollH <= 20) { isZonk = true; kasta = "ZONK"; } else if (rollH <= 40) hadiah = "RP 5.000 💵"; else if (rollH <= 70) hadiah = "12 DM ✨"; else hadiah = "RP 3.000 💵"; }

        img.src = PRIZE_IMAGES[kasta];
        if (isZonk) { res.innerHTML = "<b style='color:red;'>#𝙆𝙐𝙍𝘼𝙉𝙂 𝘽𝙀𝙍𝙐𝙉𝙏𝙐𝙉𝙂#</b>"; } 
        else { res.innerHTML = `<span class='text-yellow-400 font-black'>DAPAT: ${hadiah}</span>`; backpack.push({ item: hadiah, date: new Date().toLocaleString() }); localStorage.setItem('backpack', JSON.stringify(backpack)); updateBackpack(); }
        btn.disabled = false;
    }, 2000);
}

function updateBackpack() {
    const list = document.getElementById('backpackList');
    if (backpack.length === 0) return;
    list.innerHTML = backpack.map((p, i) => `
        <div class="bg-black/80 p-3 rounded flex justify-between items-center border-l-4 border-yellow-500 mb-2">
            <div><p class="text-[10px] font-bold text-white italic uppercase">${p.item}</p><p class="text-[7px] text-gray-500">${p.date}</p></div>
            <button onclick="claimWA('${p.item}', '${p.date}')" class="bg-green-600 text-[9px] px-3 py-1 rounded font-black italic uppercase">CLAIM</button>
        </div>
    `).join('');
}

function claimWA(item, date) {
    let verifyID = "FF-" + Math.random().toString(36).substr(2, 5).toUpperCase();
    let msg = `Halo Bos FajarAP, claim hadiah:%0A👤 NICKNAME: ${nickname}%0A🎁 HADIAH: ${item}%0A🆔 VERIFY ID: ${verifyID}`;
    window.open(`https://wa.me/${ownerWA}?text=${msg}`, "_blank");
}

function topup() { window.open(`https://wa.me/${ownerWA}?text=Halo+FajarAP+mau+topup+koin`, "_blank"); }
