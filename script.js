// Mengambil data keranjang dari localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Tambah produk ke keranjang
function addToCart(nama, harga) {

    let produkLama = cart.find(item => item.nama === nama);

    if (produkLama) {

        produkLama.jumlah++;

    } else {

        let produk = {
            nama: nama,
            harga: harga,
            jumlah: 1
        };

        cart.push(produk);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(nama + " berhasil ditambahkan ke keranjang! 🛒");

}

// Menampilkan isi keranjang
function tampilkanKeranjang() {

    const cartContainer = document.getElementById("cart-items");
    const totalHarga = document.getElementById("total-harga");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartContainer.innerHTML =
        "<p class='text-center text-gray-500'>Keranjang masih kosong 😿</p>";

        totalHarga.innerHTML = "Rp0";

        return;
    }

    cart.forEach((item, index) => {

        total += item.harga * item.jumlah;

        cartContainer.innerHTML += `
        <div class="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-4">

            <div>
                <h3 class="font-bold">${item.nama}</h3>
                <p class="text-pink-500">
                  Rp${(item.harga * item.jumlah).toLocaleString("id-ID")}  
                </p>
                <div class="flex items-center gap-3">

<button onclick="kurangJumlah(${index})"
class="bg-gray-200 px-3 py-1 rounded-lg">
-
</button>

<span class="font-bold">
${item.jumlah}
</span>

<button onclick="tambahJumlah(${index})"
class="bg-pink-400 text-white px-3 py-1 rounded-lg">
+
</button>

</div>
            </div>


            <button
            onclick="hapusProduk(${index})"
            class="bg-red-500 text-white px-4 py-2 rounded-lg">

                Hapus

            </button>

        </div>
        `;

    });

    totalHarga.innerHTML =
    "Rp" + total.toLocaleString("id-ID");

}

// Menghapus produk
function hapusProduk(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    tampilkanKeranjang();

}

function tambahJumlah(index){

    cart[index].jumlah++;

    localStorage.setItem("cart", JSON.stringify(cart));

    tampilkanKeranjang();

}


function kurangJumlah(index){

    if(cart[index].jumlah > 1){

        cart[index].jumlah--;

    } else {

        cart.splice(index,1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    tampilkanKeranjang();

}

// Mengosongkan keranjang
function kosongkanKeranjang(){

    localStorage.removeItem("cart");

    cart=[];

    tampilkanKeranjang();

}

// Search Produk
function cariProduk() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const produk = document.querySelectorAll(".produk");

    produk.forEach((item) => {

        const nama = item.querySelector("h3").innerText.toLowerCase();

        if (nama.includes(keyword)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }

    });

}

document.addEventListener("DOMContentLoaded", tampilkanKeranjang);
function beliSekarang(nama, harga, gambar){

    let produk = {
        nama: nama,
        harga: harga,
        gambar: gambar
    };

    localStorage.setItem("checkout", JSON.stringify(produk));

    window.location.href = "checkout.html";

}

function filterProduk(kategori) {

    const produk = document.querySelectorAll(".produk");

    produk.forEach((item) => {

        if (kategori === "semua") {
            item.style.display = "block";
        } 
        else if (item.classList.contains(kategori)) {
            item.style.display = "block";
        } 
        else {
            item.style.display = "none";
        }

    });

}

function toggleLove(button) {

    if (button.innerHTML === "🤍") {

        button.innerHTML = "❤️";

    } else {

        button.innerHTML = "🤍";

    }

}