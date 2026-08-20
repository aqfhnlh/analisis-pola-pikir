/* =====================================================
   REKAPAN.JS
   Dashboard Admin - Rekapan Hasil Analisis Pola Pikir
   DATA DIAMBIL DARI APPS SCRIPT API
===================================================== */


/* =====================================================
   1. CEK LOGIN ADMIN
===================================================== */

const adminLogin = sessionStorage.getItem("adminLogin");

if (adminLogin !== "true") {
    window.location.href = "admin.html";
}


/* =====================================================
   2. KONFIGURASI API
===================================================== */

/*
   GANTI URL DI BAWAH DENGAN URL WEB APP APPS SCRIPT
   YANG SUDAH KAMU DEPLOY.

   Contoh:
   https://script.google.com/macros/s/XXXXXXXX/exec
*/

const API_URL =
    "https://script.google.com/macros/s/AKfycbzleJt9T8DZ4y-NgOUmREMy_7IXvfGbwlY9K6EKsZqNHUbTAvzzBcEJvpDQSPZjHPWNsw/exec";


/* =====================================================
   3. DATA GLOBAL
===================================================== */

let rekapan = [];


/* =====================================================
   4. ELEMENT HALAMAN
===================================================== */

const jumlahResponden =
    document.getElementById("jumlahResponden");

const jumlahF =
    document.getElementById("jumlahF");

const jumlahFG =
    document.getElementById("jumlahFG");

const jumlahGF =
    document.getElementById("jumlahGF");

const jumlahG =
    document.getElementById("jumlahG");

const pieChart =
    document.getElementById("pieChart");

const pieTotal =
    document.getElementById("pieTotal");

const detailF =
    document.getElementById("detailF");

const detailFG =
    document.getElementById("detailFG");

const detailGF =
    document.getElementById("detailGF");

const detailG =
    document.getElementById("detailG");

const tabelRekapan =
    document.getElementById("tabelRekapan");

const tidakAdaData =
    document.getElementById("tidakAdaData");

const filterUnitKerja =
    document.getElementById("filterUnitKerja");

const cariResponden =
    document.getElementById("cariResponden");

const exportBtn =
    document.getElementById("exportBtn");

const kembaliBtn =
    document.getElementById("kembaliBtn");

const logoutBtn =
    document.getElementById("logoutBtn");


/* =====================================================
   5. ELEMENT MODAL
===================================================== */

const modalDetail =
    document.getElementById("modalDetail");

const tutupModalBtn =
    document.getElementById("tutupModalBtn");

const tutupModalBtnBottom =
    document.getElementById("tutupModalBtnBottom");

const detailNama =
    document.getElementById("detailNama");

const detailUnitKerja =
    document.getElementById("detailUnitKerja");

const detailEmail =
    document.getElementById("detailEmail");

const detailKategori =
    document.getElementById("detailKategori");

const detailTotal =
    document.getElementById("detailTotal");

const detailTanggal =
    document.getElementById("detailTanggal");

const detailJawaban =
    document.getElementById("detailJawaban");


/* =====================================================
   6. ESCAPE HTML
===================================================== */

function escapeHTML(text) {

    if (
        text === null ||
        text === undefined
    ) {
        return "";
    }

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =====================================================
   7. FORMAT TANGGAL
===================================================== */

function formatTanggal(timestamp) {

    if (!timestamp) {
        return "-";
    }

    try {

        const date =
            new Date(timestamp);

        if (isNaN(date.getTime())) {
            return timestamp;
        }

        return date.toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );

    } catch (error) {

        return timestamp;

    }
}


/* =====================================================
   8. NORMALISASI DATA API
===================================================== */

function normalisasiData(data) {

    return {
        id:
            data.id || "",

        timestamp:
            data.timestamp || "",

        nama:
            data.nama || "",

        unitKerja:
            data.unitKerja || "",

        email:
            data.email || "",

        totalSkor:
            data.totalSkor ?? 0,

        /*
           API kamu menggunakan "profil",
           sedangkan rekapan lama menggunakan
           "kategori".
        */

        kategori:
            data.profil ||
            data.kategori ||
            "",

        tanggal:
            data.tanggal ||
            formatTanggal(data.timestamp),

        jawaban:
            Array.isArray(data.jawaban)
                ? data.jawaban
                : []
    };
}


/* =====================================================
   9. AMBIL DATA DARI API
===================================================== */

async function ambilRekapan() {

    if (
        !API_URL ||
        API_URL ===
        "PASTE_URL_API_KAMU_DI_SINI"
    ) {

        console.error(
            "API_URL belum diisi."
        );

        alert(
            "URL API belum diatur di rekapan.js."
        );

        return false;
    }


    try {

        console.log(
            "Mengambil data dari API..."
        );


        const response =
            await fetch(
                API_URL +
                "?action=getData"
            );


        console.log(
            "HTTP STATUS:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "HTTP Error " +
                response.status
            );
        }


        const result =
            await response.json();


        console.log(
            "RESPONSE API:",
            result
        );


        if (
            !result ||
            result.success !== true
        ) {

            throw new Error(
                result?.message ||
                "API mengembalikan error."
            );
        }


        const data =
            Array.isArray(result.data)
                ? result.data
                : [];


        rekapan =
            data.map(
                normalisasiData
            );


        /*
           Data terbaru paling atas.
        */

        rekapan.sort(
            (a, b) =>
                new Date(b.timestamp) -
                new Date(a.timestamp)
        );


        console.log(
            "DATA RESPONDEN:",
            rekapan
        );


        isiFilterUnitKerja();

        updateDashboard();


        return true;


    } catch (error) {

        console.error(
            "GAGAL MENGAMBIL DATA API:",
            error
        );


        rekapan = [];

        updateDashboard();


        if (tidakAdaData) {

            tidakAdaData.classList.remove(
                "hidden"
            );

            tidakAdaData.innerHTML = `
                <p>
                    Gagal mengambil data dari server.
                </p>

                <small>
                    ${escapeHTML(
                        error.message
                    )}
                </small>
            `;
        }


        return false;
    }
}


/* =====================================================
   10. DATA TERFILTER
===================================================== */

function ambilDataTerfilter() {

    const unit =
        filterUnitKerja
            ? filterUnitKerja.value
            : "semua";


    const keyword =
        cariResponden
            ? cariResponden.value
                .toLowerCase()
                .trim()
            : "";


    return rekapan.filter(
        function (data) {

            const nama =
                String(
                    data.nama || ""
                ).toLowerCase();


            const email =
                String(
                    data.email || ""
                ).toLowerCase();


            const unitKerja =
                String(
                    data.unitKerja || ""
                );


            const cocokUnit =
                unit === "semua" ||
                unitKerja === unit;


            const cocokSearch =
                !keyword ||
                nama.includes(keyword) ||
                email.includes(keyword);


            return (
                cocokUnit &&
                cocokSearch
            );
        }
    );
}


/* =====================================================
   11. FILTER UNIT KERJA
===================================================== */

function isiFilterUnitKerja() {

    if (!filterUnitKerja) {
        return;
    }


    const nilaiSebelumnya =
        filterUnitKerja.value ||
        "semua";


    const daftarUnitKerja =
        [
            ...new Set(
                rekapan
                    .map(
                        data =>
                            data.unitKerja
                    )
                    .filter(Boolean)
            )
        ].sort(
            (a, b) =>
                String(a).localeCompare(
                    String(b),
                    "id"
                )
        );


    filterUnitKerja.innerHTML = `
        <option value="semua">
            Semua Unit Kerja
        </option>
    `;


    daftarUnitKerja.forEach(
        function (unit) {

            const option =
                document.createElement(
                    "option"
                );

            option.value = unit;
            option.textContent = unit;

            filterUnitKerja.appendChild(
                option
            );
        }
    );


    if (
        nilaiSebelumnya === "semua" ||
        daftarUnitKerja.includes(
            nilaiSebelumnya
        )
    ) {

        filterUnitKerja.value =
            nilaiSebelumnya;

    } else {

        filterUnitKerja.value =
            "semua";
    }
}


/* =====================================================
   12. UPDATE DASHBOARD
===================================================== */

function updateDashboard() {

    const data =
        ambilDataTerfilter();


    updateStatistik(data);

    tampilkanTabel(data);
}


/* =====================================================
   13. UPDATE STATISTIK
===================================================== */

function updateStatistik(data) {

    const total =
        data.length;


    const dataF =
        data.filter(
            item =>
                item.kategori === "F"
        ).length;


    const dataFG =
        data.filter(
            item =>
                item.kategori === "FG"
        ).length;


    const dataGF =
        data.filter(
            item =>
                item.kategori === "GF"
        ).length;


    const dataG =
        data.filter(
            item =>
                item.kategori === "G"
        ).length;


    if (jumlahResponden) {
        jumlahResponden.textContent =
            total;
    }


    if (jumlahF) {
        jumlahF.textContent =
            dataF;
    }


    if (jumlahFG) {
        jumlahFG.textContent =
            dataFG;
    }


    if (jumlahGF) {
        jumlahGF.textContent =
            dataGF;
    }


    if (jumlahG) {
        jumlahG.textContent =
            dataG;
    }


    if (pieTotal) {
        pieTotal.textContent =
            total;
    }


    const persenF =
        total > 0
            ? (dataF / total) * 100
            : 0;


    const persenFG =
        total > 0
            ? (dataFG / total) * 100
            : 0;


    const persenGF =
        total > 0
            ? (dataGF / total) * 100
            : 0;


    const persenG =
        total > 0
            ? (dataG / total) * 100
            : 0;


    if (detailF) {
        detailF.textContent =
            `${dataF} responden · ${persenF.toFixed(1)}%`;
    }


    if (detailFG) {
        detailFG.textContent =
            `${dataFG} responden · ${persenFG.toFixed(1)}%`;
    }


    if (detailGF) {
        detailGF.textContent =
            `${dataGF} responden · ${persenGF.toFixed(1)}%`;
    }


    if (detailG) {
        detailG.textContent =
            `${dataG} responden · ${persenG.toFixed(1)}%`;
    }


    updateDiagram(
        total,
        persenF,
        persenFG,
        persenGF,
        persenG
    );
}


/* =====================================================
   14. UPDATE DIAGRAM
===================================================== */

function updateDiagram(
    total,
    persenF,
    persenFG,
    persenGF,
    persenG
) {

    if (!pieChart) {
        return;
    }


    if (total === 0) {

        pieChart.style.background =
            "#eeeeee";

        return;
    }


    const batasF =
        persenF;


    const batasFG =
        batasF + persenFG;


    const batasGF =
        batasFG + persenGF;


    pieChart.style.background =
        `conic-gradient(
            #555555 0% ${batasF}%,
            #888888 ${batasF}% ${batasFG}%,
            #aaaaaa ${batasFG}% ${batasGF}%,
            #222222 ${batasGF}% 100%
        )`;
}


/* =====================================================
   15. TAMPILKAN TABEL
===================================================== */

function tampilkanTabel(data) {

    if (!tabelRekapan) {
        return;
    }


    tabelRekapan.innerHTML = "";


    if (!data || data.length === 0) {

        if (tidakAdaData) {

            tidakAdaData.classList.remove(
                "hidden"
            );
        }

        return;
    }


    if (tidakAdaData) {

        tidakAdaData.classList.add(
            "hidden"
        );
    }


    data.forEach(
        function (responden, index) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${escapeHTML(
                        responden.nama
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        responden.unitKerja
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        responden.email
                    )}
                </td>

                <td>
                    ${responden.totalSkor}
                </td>

                <td>
                    <span class="profil-badge">
                        ${escapeHTML(
                            responden.kategori
                        )}
                    </span>
                </td>

                <td>
                    ${escapeHTML(
                        responden.tanggal
                    )}
                </td>

                <td>

                    <div class="aksi-container">

                        <button
                            type="button"
                            class="detail-btn"
                            onclick="bukaDetail('${escapeHTML(
                                responden.id
                            )}')"
                        >
                            Lihat Detail
                        </button>

                    </div>

                </td>
            `;


            tabelRekapan.appendChild(
                row
            );
        }
    );
}


/* =====================================================
   16. CARI RESPONDEN
===================================================== */

if (cariResponden) {

    cariResponden.addEventListener(
        "input",
        function () {

            updateDashboard();

        }
    );
}


/* =====================================================
   17. FILTER UNIT KERJA
===================================================== */

if (filterUnitKerja) {

    filterUnitKerja.addEventListener(
        "change",
        function () {

            updateDashboard();

        }
    );
}


/* =====================================================
   18. DETAIL RESPONDEN
===================================================== */

function bukaDetail(id) {

    const data =
        rekapan.find(
            item =>
                item.id === id
        );


    if (!data) {

        console.error(
            "Data responden tidak ditemukan:",
            id
        );

        return;
    }


    if (detailNama) {
        detailNama.textContent =
            data.nama || "-";
    }


    if (detailUnitKerja) {
        detailUnitKerja.textContent =
            data.unitKerja || "-";
    }


    if (detailEmail) {
        detailEmail.textContent =
            data.email || "-";
    }


    if (detailKategori) {
        detailKategori.textContent =
            data.kategori || "-";
    }


    if (detailTotal) {
        detailTotal.textContent =
            data.totalSkor ?? "-";
    }


    if (detailTanggal) {
        detailTanggal.textContent =
            data.tanggal || "-";
    }


    if (!detailJawaban) {
        return;
    }


    detailJawaban.innerHTML = "";


    if (
        !Array.isArray(
            data.jawaban
        ) ||
        data.jawaban.length === 0
    ) {

        detailJawaban.innerHTML = `

            <div class="detail-kosong">

                <p>
                    Detail jawaban tidak tersedia
                    untuk data responden ini.
                </p>

            </div>

        `;

    } else {

        data.jawaban.forEach(
            function (item) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.classList.add(
                    "detail-soal-card"
                );


                card.innerHTML = `

                    <div class="detail-soal-header">

                        <strong>
                            Soal ${escapeHTML(
                                item.no
                            )}
                        </strong>

                        <span>
                            Skor ${escapeHTML(
                                item.skor
                            )}
                        </span>

                    </div>


                    <p class="detail-pertanyaan">

                        ${escapeHTML(
                            item.pertanyaan
                        )}

                    </p>


                    <div class="detail-jawaban-text">

                        <span>
                            Jawaban
                        </span>

                        <strong>
                            ${escapeHTML(
                                item.jawaban
                            )}
                        </strong>

                    </div>

                `;


                detailJawaban.appendChild(
                    card
                );
            }
        );
    }


    if (modalDetail) {

        modalDetail.classList.remove(
            "hidden"
        );

        document.body.classList.add(
            "modal-open"
        );
    }
}


/* =====================================================
   19. TUTUP MODAL
===================================================== */

function tutupModal() {

    if (!modalDetail) {
        return;
    }


    modalDetail.classList.add(
        "hidden"
    );


    document.body.classList.remove(
        "modal-open"
    );
}


if (tutupModalBtn) {

    tutupModalBtn.addEventListener(
        "click",
        tutupModal
    );
}


if (tutupModalBtnBottom) {

    tutupModalBtnBottom.addEventListener(
        "click",
        tutupModal
    );
}


const modalOverlay =
    document.querySelector(
        ".modal-overlay"
    );


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        tutupModal
    );
}


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            modalDetail &&
            !modalDetail.classList.contains(
                "hidden"
            )
        ) {

            tutupModal();
        }
    }
);


/* =====================================================
   20. EXPORT CSV
===================================================== */

function csvEscape(text) {

    if (
        text === null ||
        text === undefined
    ) {

        return "";
    }


    return `"${String(text)
        .replace(/"/g, '""')}"`;
}


if (exportBtn) {

    exportBtn.addEventListener(
        "click",
        function () {

            const data =
                ambilDataTerfilter();


            if (data.length === 0) {

                alert(
                    "Tidak ada data yang dapat diekspor."
                );

                return;
            }


            let csv =
                "No,Nama,Unit Kerja,Email,Grand Total,Profil,Tanggal\n";


            data.forEach(
                function (
                    responden,
                    index
                ) {

                    csv += [

                        index + 1,

                        csvEscape(
                            responden.nama
                        ),

                        csvEscape(
                            responden.unitKerja
                        ),

                        csvEscape(
                            responden.email
                        ),

                        responden.totalSkor,

                        csvEscape(
                            responden.kategori
                        ),

                        csvEscape(
                            responden.tanggal
                        )

                    ].join(",") + "\n";
                }
            );


            const blob =
                new Blob(
                    [
                        "\uFEFF",
                        csv
                    ],
                    {
                        type:
                            "text/csv;charset=utf-8;"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href = url;

            link.download =
                "rekapan-pola-pikir.csv";


            document.body.appendChild(
                link
            );


            link.click();


            document.body.removeChild(
                link
            );


            URL.revokeObjectURL(
                url
            );
        }
    );
}


/* =====================================================
   21. KEMBALI
===================================================== */

if (kembaliBtn) {

    kembaliBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "index.html";

        }
    );
}


/* =====================================================
   22. LOGOUT
===================================================== */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            const yakin =
                confirm(
                    "Apakah Anda yakin ingin logout?"
                );


            if (!yakin) {
                return;
            }


            sessionStorage.removeItem(
                "adminLogin"
            );


            window.location.href =
                "admin.html";
        }
    );
}


/* =====================================================
   23. AUTO REFRESH API
===================================================== */

/*
   Dashboard mengambil data terbaru
   dari server setiap 10 detik.
*/

setInterval(
    function () {

        ambilRekapan();

    },
    10000
);


/* =====================================================
   24. REFRESH SAAT TAB AKTIF
===================================================== */

window.addEventListener(
    "focus",
    function () {

        ambilRekapan();

    }
);


document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.visibilityState ===
            "visible"
        ) {

            ambilRekapan();

        }
    }
);


/* =====================================================
   25. LOAD PERTAMA
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "================================"
        );

        console.log(
            "REKAPAN ADMIN"
        );

        console.log(
            "Menghubungkan ke API..."
        );

        console.log(
            "API:",
            API_URL
        );

        console.log(
            "================================"
        );


        ambilRekapan();

    }
);
