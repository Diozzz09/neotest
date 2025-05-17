// Harga robux dari admin (bisa kamu ubah sesuka hati)
const hargaRobux = {
  "100": 1500,
  "200": 2800,
  "300": 4000,
  "500": 6500,
  "1000": 12000,
  "2000": 23000
};

document.getElementById('jumlah_orderan').addEventListener('input', function () {
  const jumlah = this.value;
  const harga = hargaRobux[jumlah] || 0;
  
  // Tampilkan harga ke user
  document.getElementById('price_display').innerText = `Rp ${harga.toLocaleString('id-ID')}`;

  // Set harga untuk dikirim ke server
  document.getElementById('price').value = harga;
});

// Form submission
document.getElementById('orderForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const jumlah = form.jumlah_orderan.value;
  const harga = hargaRobux[jumlah];

  if (!harga) {
    alert('Jumlah Robux tidak valid atau belum ada harganya.');
    return;
  }

  const data = {
    no_pembeli: "AUTO",
    no_pesanan: "ORDER-" + Date.now(),
    username: form.username.value,
    jenis_orderan: "Robux",
    jumlah_orderan: jumlah,
    price: harga,
    payment: form.payment.value,
    promo: form.promo.value,
    wa: form.wa.value,
    email: form.email.value
  };

  const endpoint = 'https://script.google.com/macros/s/AKfycby4-Y8ZjkMLPS8Sc5Or_ErlUSAHetkMxHul8Pw7xEt0xCaVfxpjm0V_dG40JWEWE78P2g/exec';
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.text();
    if (result.includes("Berhasil")) {
      alert('Pesanan berhasil dikirim!');
      form.reset();
    } else {
      alert('Gagal membuat pesanan: ' + result);
    }
  } catch (err) {
    console.error(err);
    alert('Gagal koneksi ke server!');
  }
});
