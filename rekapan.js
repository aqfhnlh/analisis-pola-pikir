/* =====================================================
   REKAPAN.JS
   Dashboard Admin - Rekapan Hasil Analisis Pola Pikir
   DATA DIAMBIL DARI APPS SCRIPT API
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
   2. KONFIGURASI API
===================================================== */

const API_URL =
    "https://script.google.com/macros/s/AKfycbzleJt9T8DZ4y-NgOUmREMy_7IXvfGbwlY9K6EKsZqNHUbTAvzzBcEJvpDQSPZjHPWNsw/exec";


/* =====================================================
   3. DATA GLOBAL
===================================================== */

let rekapan = [];

let sedangMemuat = false;


/* =====================================================
   4. ELEMENT HALAMAN
===================================================== */

const statusData =
    document.getElementById("statusData");

const statusIndicator =
    document.getElementById("statusIndicator");

const statusText =
    document.getElementById("statusText");


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

const refreshBtn =
    document.getElementById("refreshBtn");

const kembaliBtn =
    document.getElementById("kembaliBtn");

const logoutBtn =
    document.getElementById("logoutBtn");


const loadingData =
    document.getElementById("loadingData");


/* =====================================================
   5. ELEMENT MODAL
===================================================== */

const modalDetail =
    document.getElementById("modalDetail");

const modalOverlay =
    document.getElementById("modalOverlay");

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

const detailInterpretasi =
    document.getElementById("detailInterpretasi");

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
            return String(timestamp);
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

        return String(timestamp);

    }
}


/* =====================================================
   8. FORMAT TANGGAL + JAM
===================================================== */

function formatTanggalLengkap(timestamp) {

    if (!timestamp) {
        return "-";
    }

    try {

        const date =
            new Date(timestamp);

        if (isNaN(date.getTime())) {
            return String(timestamp);
        }

        return date.toLocaleString(
            "id-ID",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    } catch (error) {

        return String(timestamp);

    }
}


/* =====================================================
   9. NORMALISASI DATA API
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
   10. STATUS API
===================================================== */

function setStatus(
    status,
    message
) {

    if (statusText) {
        statusText.textContent =
            message;
    }

    if (!statusIndicator) {
        return;
    }

    statusIndicator.classList.remove(
        "online",
        "offline",
        "loading"
    );

    if (status === "online") {

        statusIndicator.classList.add(
            "online"
        );

    } else if (status === "offline") {

        statusIndicator.classList.add(
            "offline"
        );

    } else {

        statusIndicator.classList.add(
            "loading"
        );

    }

}


/* =====================================================
   11. LOADING STATE
===================================================== */

function setLoading(
    loading
) {

    sedangMemuat =
        loading;

    if (loadingData) {

        if (loading) {

            loadingData.classList.remove(
                "hidden"
            );

        } else {

            loadingData.classList.add(
                "hidden"
            );

        }

    }

    if (refreshBtn) {

        refreshBtn.disabled =
            loading;

        refreshBtn.innerHTML =
            loading
                ? "↻ Memuat..."
                : "↻ Refresh";

    }

}


/* =====================================================
   12. AMBIL DATA DARI API
===================================================== */

async function ambilRekapan() {

    if (sedangMemuat) {
        return false;
    }

    if (
        !API_URL ||
        API_URL ===
        "PASTE_URL_API_KAMU_DI_SINI"
    ) {

        setStatus(
            "offline",
            "URL API belum diatur."
        );

        console.error(
            "API_URL belum diisi."
        );

        return false;
    }


    setLoading(true);

    setStatus(
        "loading",
        "Menghubungkan ke server..."
    );


    try {

        console.log(
            "================================"
        );

        console.log(
            "MENGAMBIL DATA DARI API"
        );

        console.log(
            "API:",
            API_URL
        );


        const response =
            await fetch(
                API_URL +
                "?action=getData&t=" +
                Date.now(),
                {
                    method: "GET",
                    cache: "no-store"
                }
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
         * Data terbaru
         * ditampilkan paling atas.
         */

        rekapan.sort(
            (a, b) => {

                const waktuA =
                    new Date(
                        a.timestamp
                    ).getTime() || 0;

                const waktuB =
                    new Date(
                        b.timestamp
                    ).getTime() || 0;

                return waktuB - waktuA;

            }
        );


        console.log(
            "TOTAL DATA:",
            rekapan.length
        );


        setStatus(
            "online",
            "Terhubung ke server"
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


        setStatus(
            "offline",
            "Gagal terhubung ke server"
        );


        updateDashboard();


        if (tidakAdaData) {

            tidakAdaData.classList.remove(
                "hidden"
            );

            tidakAdaData.innerHTML = `

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Gagal Memuat Data
                </h3>

                <p>
                    Tidak dapat mengambil data
                    dari server.
                </p>

                <small>
                    ${escapeHTML(
                        error.message
                    )}
                </small>

            `;

        }


        return false;


    } finally {

        setLoading(false);

    }

}


/* =====================================================
   13. AMBIL DATA TERFILTER
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
   14. ISI FILTER UNIT KERJA
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
        nilaiSebelumnya ===
            "semua" ||
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
   15. UPDATE DASHBOARD
===================================================== */

function updateDashboard() {

    const data =
        ambilDataTerfilter();


    updateStatistik(
        data
    );


    tampilkanTabel(
        data
    );

}


/* =====================================================
   16. UPDATE STATISTIK
===================================================== */

function updateStatistik(
    data
) {

    const total =
        data.length;


    const dataF =
        data.filter(
            item =>
                item.kategori ===
                "F"
        ).length;


    const dataFG =
        data.filter(
            item =>
                item.kategori ===
                "FG"
        ).length;


    const dataGF =
        data.filter(
            item =>
                item.kategori ===
                "GF"
        ).length;


    const dataG =
        data.filter(
            item =>
                item.kategori ===
                "G"
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
   17. UPDATE DIAGRAM DONUT
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
        batasF +
        persenFG;


    const batasGF =
        batasFG +
        persenGF;


    pieChart.style.background =
        `conic-gradient(
            #555555 0% ${batasF}%,
            #888888 ${batasF}% ${batasFG}%,
            #aaaaaa ${batasFG}% ${batasGF}%,
            #222222 ${batasGF}% 100%
        )`;

}


/* =====================================================
   18. TAMPILKAN TABEL
===================================================== */

function tampilkanTabel(
    data
) {

    if (!tabelRekapan) {
        return;
    }


    tabelRekapan.innerHTML =
        "";


    if (
        !data ||
        data.length === 0
    ) {

        if (tidakAdaData) {

            tidakAdaData.classList.remove(
                "hidden"
            );


            /*
             * Jangan menimpa pesan error
             * ketika API sedang offline.
             */

            if (
                !sedangMemuat &&
                rekapan.length === 0
            ) {

                tidakAdaData.innerHTML = `

                    <div class="empty-icon">
                        📋
                    </div>

                    <h3>
                        Belum Ada Data
                    </h3>

                    <p>
                        Belum ada responden yang
                        mengisi kuesioner.
                    </p>

                `;

            }

        }

        return;

    }


    if (tidakAdaData) {

        tidakAdaData.classList.add(
            "hidden"
        );

    }


    data.forEach(
        function (
            responden,
            index
        ) {

            const row =
                document.createElement(
                    "tr"
                );


            row.dataset.id =
                responden.id;


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
                    <strong>
                        ${escapeHTML(
                            responden.totalSkor
                        )}
                    </strong>
                </td>


                <td>

                    <span class="profil-badge">
                        ${escapeHTML(
                            responden.kategori ||
                            "-"
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
                            data-action="detail"
                            data-id="${escapeHTML(
                                responden.id
                            )}"
                        >
                            Lihat Detail
                        </button>


                        <button
                            type="button"
                            class="hapus-btn"
                            data-action="hapus"
                            data-id="${escapeHTML(
                                responden.id
                            )}"
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
   19. EVENT TABEL
===================================================== */

if (tabelRekapan) {

    tabelRekapan.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "button[data-action]"
                );


            if (!button) {
                return;
            }


            const action =
                button.dataset.action;


            const id =
                button.dataset.id;


            if (!id) {
                return;
            }


            if (
                action ===
                "detail"
            ) {

                bukaDetail(id);

            }


            if (
                action ===
                "hapus"
            ) {

                hapusResponden(id);

            }

        }
    );

}


/* =====================================================
   20. CARI RESPONDEN
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
   21. FILTER UNIT KERJA
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
   22. DETAIL RESPONDEN
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

        alert(
            "Data responden tidak ditemukan."
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
            formatTanggalLengkap(
                data.timestamp
            );

    }


    tampilkanInterpretasi(
        data.kategori
    );


    tampilkanJawaban(
        data.jawaban
    );


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
   23. INTERPRETASI DETAIL
===================================================== */

function tampilkanInterpretasi(
    kategori
) {

    if (!detailInterpretasi) {
        return;
    }


    const interpretasi = {

        F: {

            judul:
                "Fixed Mindset",

            deskripsi:
                "Cenderung melihat kemampuan sebagai sesuatu yang relatif tetap. Tantangan atau kegagalan dapat lebih mudah dipandang sebagai cerminan keterbatasan kemampuan."

        },


        FG: {

            judul:
                "Fixed-Growth Mindset",

            deskripsi:
                "Menunjukkan perpaduan kecenderungan pola pikir tetap dan bertumbuh. Pada situasi tertentu dapat melihat kemampuan sebagai sesuatu yang dapat berkembang, namun pada situasi lain masih terdapat kecenderungan melihat kemampuan sebagai sesuatu yang relatif tetap."

        },


        GF: {

            judul:
                "Growth-Fixed Mindset",

            deskripsi:
                "Menunjukkan kecenderungan pola pikir bertumbuh yang cukup kuat, tetapi masih terdapat beberapa aspek pola pikir tetap. Individu dapat terbuka terhadap proses belajar dan pengembangan diri."

        },


        G: {

            judul:
                "Growth Mindset",

            deskripsi:
                "Cenderung melihat kemampuan sebagai sesuatu yang dapat dikembangkan melalui proses belajar, usaha, pengalaman, strategi, dan keterbukaan terhadap umpan balik."

        }

    };


    const hasil =
        interpretasi[kategori];


    if (!hasil) {

        detailInterpretasi.innerHTML = `

            <div class="interpretasi-detail-box">

                <span>
                    Profil
                </span>

                <h3>
                    ${escapeHTML(
                        kategori || "-"
                    )}
                </h3>

                <p>
                    Interpretasi profil belum tersedia.
                </p>

            </div>

        `;

        return;

    }


    detailInterpretasi.innerHTML = `

        <div class="interpretasi-detail-box">

            <span>
                PROFIL POLA PIKIR
            </span>

            <h3>
                ${escapeHTML(
                    hasil.judul
                )}
            </h3>

            <p>
                ${escapeHTML(
                    hasil.deskripsi
                )}
            </p>

        </div>

    `;

}


/* =====================================================
   24. TAMPILKAN DETAIL JAWABAN
===================================================== */

function tampilkanJawaban(
    jawaban
) {

    if (!detailJawaban) {
        return;
    }


    detailJawaban.innerHTML =
        "";


    if (
        !Array.isArray(jawaban) ||
        jawaban.length === 0
    ) {

        detailJawaban.innerHTML = `

            <div class="detail-kosong">

                <p>
                    Detail jawaban tidak tersedia
                    untuk data responden ini.
                </p>

            </div>

        `;

        return;

    }


    jawaban.forEach(
        function (item) {

            const card =
                document.createElement(
                    "div"
                );


            card.classList.add(
                "detail-soal-card"
            );


            const nomor =
                item.no ??
                "-";


            const skor =
                item.skor ??
                "-";


            const pertanyaan =
                item.pertanyaan ||
                "-";


            const jawabanResponden =
                item.jawaban ||
                "-";


            card.innerHTML = `

                <div class="detail-soal-header">

                    <strong>
                        Soal ${escapeHTML(
                            nomor
                        )}
                    </strong>

                    <span>
                        Skor ${escapeHTML(
                            skor
                        )}
                    </span>

                </div>


                <p class="detail-pertanyaan">

                    ${escapeHTML(
                        pertanyaan
                    )}

                </p>


                <div class="detail-jawaban-text">

                    <span>
                        Jawaban
                    </span>

                    <strong>
                        ${escapeHTML(
                            jawabanResponden
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


/* =====================================================
   25. TUTUP MODAL
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


/* =====================================================
   26. EVENT TUTUP MODAL
===================================================== */

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
   27. HAPUS RESPONDEN
===================================================== */

async function hapusResponden(
    id
) {

    const data =
        rekapan.find(
            item =>
                item.id === id
        );


    if (!data) {

        alert(
            "Data responden tidak ditemukan."
        );

        return;

    }


    const nama =
        data.nama ||
        "responden ini";


    const yakin =
        confirm(
            `Apakah Anda yakin ingin menghapus data ${nama}?\n\nData yang dihapus tidak dapat dikembalikan.`
        );


    if (!yakin) {
        return;
    }


    try {

        setStatus(
            "loading",
            "Menghapus data..."
        );


        const response =
            await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify({

                            action:
                                "deleteResponse",

                            id:
                                id

                        })
                }
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
            "RESPONSE DELETE:",
            result
        );


        if (
            !result ||
            result.success !== true
        ) {

            throw new Error(
                result?.message ||
                "Data gagal dihapus."
            );

        }


        /*
         * Hapus dari data lokal
         * terlebih dahulu agar tampilan
         * terasa langsung berubah.
         */

        rekapan =
            rekapan.filter(
                item =>
                    item.id !== id
            );


        isiFilterUnitKerja();

        updateDashboard();


        setStatus(
            "online",
            "Data berhasil dihapus"
        );


        alert(
            "Data responden berhasil dihapus."
        );


    } catch (error) {

        console.error(
            "GAGAL MENGHAPUS DATA:",
            error
        );


        setStatus(
            "offline",
            "Gagal menghapus data"
        );


        alert(
            "Data gagal dihapus.\n\n" +
            error.message
        );


        /*
         * Ambil ulang data dari server
         * supaya dashboard kembali sinkron.
         */

        await ambilRekapan();

    }

}


/* =====================================================
   28. EXPORT CSV
===================================================== */

function csvEscape(
    text
) {

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

                        csvEscape(
                            responden.totalSkor
                        ),

                        csvEscape(
                            responden.kategori
                        ),

                        csvEscape(
                            responden.tanggal
                        )

                    ].join(",") +
                    "\n";

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


            const tanggal =
                new Date()
                    .toISOString()
                    .slice(
                        0,
                        10
                    );


            link.href =
                url;


            link.download =
                `rekapan-pola-pikir-${tanggal}.csv`;


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
   29. REFRESH MANUAL
===================================================== */

if (refreshBtn) {

    refreshBtn.addEventListener(
        "click",
        function () {

            ambilRekapan();

        }
    );

}


/* =====================================================
   30. KEMBALI KE HALAMAN UTAMA
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
   31. LOGOUT
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
   32. AUTO REFRESH API
===================================================== */

/*
 * Ambil data terbaru setiap 30 detik.
 *
 * Tidak terlalu sering supaya API
 * tidak dipanggil berlebihan.
 */

setInterval(
    function () {

        if (
            document.visibilityState ===
            "visible"
        ) {

            ambilRekapan();

        }

    },
    30000
);


/* =====================================================
   33. REFRESH SAAT TAB AKTIF
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
   34. LOAD PERTAMA
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
            "Dashboard siap."
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
