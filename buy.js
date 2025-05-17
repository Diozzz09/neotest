// Harga robux dari admin
const hargaRobux = {
  "100": 1500,
  "200": 2800,
  "300": 4000,
  "500": 6500,
  "1000": 12000,
  "2000": 23000
};

// Update harga ketika jumlah berubah
document.getElementById('jumlah_orderan').addEventListener('input', function () {
  const jumlah = this.value;
  const harga = hargaRobux[jumlah] || 0;

  document.getElementById('price_display').innerText = `Rp ${harga.toLocaleString('id-ID')}`;
  document.getElementById('price').value = harga;
});

// Submit form
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
    username: form.username.value.trim(),
    jenis_orderan: "Robux",
    jumlah_orderan: jumlah,
    price: harga,
    payment: form.payment.value,
    promo: form.promo.value || "-",
    wa: form.wa.value.trim(),
    email: form.email.value.trim()
  };

  const endpoint = 'https://script.google.com/macros/s/AKfycbzn8DE9ZhJ75yskOTyFDJ106DsI1P29TPIDJj3540U3Jl7Tp-jMrys8eSCGn2SytHBa/exec';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.text();
    if (result.includes("Berhasil")) {
      alert('Pesanan berhasil dikirim!');
      form.reset();
      document.getElementById('price_display').innerText = "Rp 0";
    } else {
      alert('Gagal membuat pesanan: ' + result);
    }
  } catch (err) {
    console.error(err);
    alert('Gagal koneksi ke server!');
  }
});
