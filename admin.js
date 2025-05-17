document.addEventListener("DOMContentLoaded", function () {
  const sheetURL = 'https://script.google.com/macros/s/AKfycbxxx/exec'; // GANTI

  const tableBody = document.querySelector("#orderTable tbody");

  fetch(sheetURL)
    .then(res => res.json())
    .then(data => {
      data.forEach(row => {
        const tr = document.createElement("tr");

        row.forEach((cell, index) => {
          const td = document.createElement("td");

          if (index === 5) {
            const input = document.createElement("input");
            input.type = "number";
            input.value = cell;
            input.dataset.noPesanan = row[1]; // Simpan No Pesanan
            td.appendChild(input);
          } else {
            td.textContent = cell;
          }

          tr.appendChild(td);
        });

        // Tambahkan tombol Simpan
        const actionTd = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = "Simpan";
        button.onclick = function () {
          const input = tr.querySelector("input");
          const noPesanan = input.dataset.noPesanan;
          const newHarga = input.value;

          fetch(sheetURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ no_pesanan: noPesanan, harga: newHarga })
          })
          .then(res => res.text())
          .then(msg => alert(msg))
          .catch(err => alert("Gagal update: " + err));
        };

        actionTd.appendChild(button);
        tr.appendChild(actionTd);

        tableBody.appendChild(tr);
      });
    });
});
