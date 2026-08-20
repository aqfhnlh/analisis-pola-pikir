/* =====================================================
   REKAPAN.JS
   Dashboard Admin - Rekapan Hasil Analisis Pola Pikir
===================================================== */


/* =====================================================
   1. CEK LOGIN ADMIN
===================================================== */

const adminLogin =
    sessionStorage.getItem("adminLogin");

if (adminLogin !== "true") {
    window.location.href = "admin.html";
}


/* =====================================================
   2. KONFIGURASI STORAGE
===================================================== */

const STORAGE_KEY =
    "rekapanPolaPikir";

let rekapan = [];

let lastStorageData = null;


/* =====================================================
   3. AMBIL DATA DARI LOCAL STORAGE
===================================================== */

function ambilRekapan() {

    try {

        const data =
            localStorage.getItem(
                STORAGE_KEY
            );

        if (!data) {

            rekapan = [];

            return;
        }


        const parsed =
            JSON.parse(data);


        if (Array.isArray(parsed)) {

            rekapan = parsed;

        } else {

            rekapan = [];

        }

    }

    catch (error) {

        console.error(
            "Gagal membaca data rekapan:",
            error
        );

        rekapan = [];

    }
}


/* =====================================================
   4. ELEMENT HALAMAN
===================================================== */

const jumlahResponden =
    document.getElementById(
        "jumlahResponden"
    );

const jumlahF =
    document.getElementById(
        "jumlahF"
    );

const jumlahFG =
    document.getElementById(
        "jumlahFG"
    );

const jumlahGF =
    document.getElementById(
        "jumlahGF"
    );

const jumlahG =
    document.getElementById(
        "jumlahG"
    );

const pieChart =
    document.getElementById(
        "pieChart"
    );

const pieTotal =
    document.getElementById(
        "pieTotal"
    );

const detailF =
    document.getElementById(
        "detailF"
    );

const detailFG =
    document.getElementById(
        "detailFG"
    );

const detailGF =
    document.getElementById(
        "detailGF"
    );

const detailG =
    document.getElementById(
        "detailG"
    );

const tabelRekapan =
    document.getElementById(
        "tabelRekapan"
    );

const tidakAdaData =
    document.getElementById(
        "tidakAdaData"
    );

const filterUnitKerja =
    document.getElementById(
        "filterUnitKerja"
    );

const cariResponden =
    document.getElementById(
        "cariResponden"
    );

const exportBtn =
    document.getElementById(
        "exportBtn"
    );

const kembaliBtn =
    document.getElementById(
        "kembaliBtn"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


/* =====================================================
   5. ELEMENT MODAL DETAIL
===================================================== */

const modalDetail =
    document.getElementById(
        "modalDetail"
    );

const tutupModalBtn =
    document.getElementById(
        "tutupModalBtn"
    );

const tutupModalBtnBottom =
    document.getElementById(
        "tutupModalBtnBottom"
    );

const detailNama =
    document.getElementById(
        "detailNama"
    );

const detailUnitKerja =
    document.getElementById(
        "detailUnitKerja"
    );

const detailEmail =
    document.getElementById(
        "detailEmail"
    );

const detailKategori =
    document.getElementById(
        "detailKategori"
    );

const detailTotal =
    document.getElementById(
        "detailTotal"
    );

const detailTanggal =
    document.getElementById(
        "detailTanggal"
    );

const detailJawaban =
    document.getElementById(
        "detailJawaban"
    );


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

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


/* =====================================================
   7. AMBIL DATA TERFILTER
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
                nama.includes(
                    keyword
                ) ||
                email.includes(
                    keyword
                );


            return (
                cocokUnit &&
                cocokSearch
            );
        }
    );
}


/* =====================================================
   8. ISI FILTER UNIT KERJA
===================================================== */

function isiFilterUnitKerja() {

    if (!filterUnitKerja) {
        return;
    }


    const nilaiSebelumnya =
        filterUnitKerja.value ||
        "semua";


    const daftarUnitKerja = [
        ...new Set(
            rekapan
                .map(
                    function (data) {
                        return data.unitKerja;
                    }
                )
                .filter(Boolean)
        )
    ].sort(
        function (a, b) {

            return String(a)
                .localeCompare(
                    String(b),
                    "id"
                );
        }
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


            option.value =
                unit;


            option.textContent =
                unit;


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
   9. UPDATE DASHBOARD
===================================================== */

function updateDashboard() {

    const data =
        ambilDataTerfilter();


    updateStatistik(data);

    tampilkanTabel(data);
}


/* =====================================================
   10. UPDATE STATISTIK
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


    /* TOTAL RESPONDEN */

    if (jumlahResponden) {

        jumlahResponden.textContent =
            total;
    }


    /* JUMLAH F */

    if (jumlahF) {

        jumlahF.textContent =
            dataF;
    }


    /* JUMLAH FG */

    if (jumlahFG) {

        jumlahFG.textContent =
            dataFG;
    }


    /* JUMLAH GF */

    if (jumlahGF) {

        jumlahGF.textContent =
            dataGF;
    }


    /* JUMLAH G */

    if (jumlahG) {

        jumlahG.textContent =
            dataG;
    }


    /* TOTAL DIAGRAM */

    if (pieTotal) {

        pieTotal.textContent =
            total;
    }


    /* PERSENTASE */

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


    /* DETAIL LEGEND */

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


    /* UPDATE DIAGRAM */

    updateDiagram(
        total,
        persenF,
        persenFG,
        persenGF,
        persenG
    );
}


/* =====================================================
   11. UPDATE DIAGRAM
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
   12. TAMPILKAN TABEL
===================================================== */

function tampilkanTabel(data) {

    if (!tabelRekapan) {
        return;
    }


    if (!data) {

        data =
            ambilDataTerfilter();
    }


    tabelRekapan.innerHTML =
        "";


    if (data.length === 0) {

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
        function (responden) {

            const indexAsli =
                rekapan.indexOf(
                    responden
                );


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${indexAsli + 1}
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
                    ${responden.totalSkor ?? "-"}
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
                            onclick="bukaDetail(${indexAsli})"
                        >
                            Lihat Detail
                        </button>

                        <button
                            type="button"
                            class="hapus-btn"
                            onclick="hapusResponden(${indexAsli})"
                        >
                            Hapus
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
   13. REFRESH SELURUH DASHBOARD
===================================================== */

function refreshDashboard() {

    /*
       Ambil ulang data terbaru
       dari localStorage.
    */

    ambilRekapan();


    /*
       Update daftar unit kerja.
    */

    isiFilterUnitKerja();


    /*
       Update statistik + diagram + tabel.
    */

    updateDashboard();
}


/* =====================================================
   14. LIHAT DETAIL RESPONDEN
===================================================== */

function bukaDetail(index) {

    const data =
        rekapan[index];


    if (!data) {
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


    detailJawaban.innerHTML =
        "";


    /*
       Jika tidak ada jawaban
    */

    if (
        !data.jawaban ||
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

                <small>
                    Data responden tidak memiliki
                    daftar jawaban kuesioner.
                </small>

            </div>

        `;

    }

    else {

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
                            Soal ${item.no}
                        </strong>

                        <span>
                            Skor ${item.skor}
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
   15. TUTUP MODAL
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


/* TOMBOL X */

if (tutupModalBtn) {

    tutupModalBtn.addEventListener(
        "click",
        tutupModal
    );
}


/* TOMBOL TUTUP BAWAH */

if (tutupModalBtnBottom) {

    tutupModalBtnBottom.addEventListener(
        "click",
        tutupModal
    );
}


/* OVERLAY */

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


/* ESCAPE */

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
   16. HAPUS RESPONDEN
===================================================== */

function hapusResponden(index) {

    const data =
        rekapan[index];


    if (!data) {
        return;
    }


    const yakin =
        confirm(
            `Hapus data responden "${data.nama}"?\n\n` +
            `Data ini akan dihapus dari rekapan dan analisis.`
        );


    if (!yakin) {
        return;
    }


    rekapan.splice(
        index,
        1
    );


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
            rekapan
        )
    );


    /*
       Langsung refresh dashboard
       setelah data dihapus.
    */

    refreshDashboard();
}


/* =====================================================
   17. EXPORT CSV
===================================================== */

function csvEscape(text) {

    if (
        text === null ||
        text === undefined
    ) {

        return "";
    }


    return `"${String(text)
        .replace(
            /"/g,
            '""'
        )}"`;
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

                        responden.totalSkor ?? "",

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


            link.href =
                url;


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
   18. FILTER UNIT KERJA
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
   19. PENCARIAN RESPONDEN
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
   20. KEMBALI KE HALAMAN UTAMA
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
   21. LOGOUT ADMIN
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
   22. AUTO UPDATE DENGAN STORAGE EVENT
===================================================== */

/*
   Jika localStorage berubah dari
   TAB / WINDOW lain, dashboard langsung
   mengambil data terbaru.
*/

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key === STORAGE_KEY
        ) {

            refreshDashboard();
        }
    }
);


/* =====================================================
   23. AUTO UPDATE DENGAN POLLING
===================================================== */

/*
   Ini bagian PALING PENTING.

   Dashboard mengecek localStorage
   setiap 1 detik.

   Jadi ketika responden baru selesai
   mengisi kuesioner dan script.js
   melakukan:

   localStorage.setItem(
       "rekapanPolaPikir",
       ...
   );

   rekapan.js akan mendeteksi perubahan
   tersebut dan memperbarui dashboard.
*/

function cekPerubahanStorage() {

    try {

        const dataSekarang =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (
            dataSekarang !==
            lastStorageData
        ) {

            lastStorageData =
                dataSekarang;


            refreshDashboard();
        }

    }

    catch (error) {

        console.error(
            "Gagal memeriksa perubahan storage:",
            error
        );
    }
}


setInterval(
    cekPerubahanStorage,
    1000
);


/* =====================================================
   24. UPDATE SAAT KEMBALI KE TAB
===================================================== */

window.addEventListener(
    "focus",
    function () {

        refreshDashboard();

    }
);


document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.visibilityState ===
            "visible"
        ) {

            refreshDashboard();

        }
    }
);


/* =====================================================
   25. INISIALISASI
===================================================== */

function tampilkanData() {

    refreshDashboard();


    try {

        lastStorageData =
            localStorage.getItem(
                STORAGE_KEY
            );

    }

    catch (error) {

        lastStorageData =
            null;
    }
}


tampilkanData();


/* =====================================================
   SELESAI
===================================================== */