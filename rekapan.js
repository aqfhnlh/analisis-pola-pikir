/* =====================================================
   REKAPAN.JS
   Dashboard Admin - Terhubung Google Apps Script API
===================================================== */


/* =====================================================
   1. KONFIGURASI API
===================================================== */

const API_URL =
    "https://script.google.com/macros/s/AKfycbzleJt9T8DZ4y-NgOUmREMy_7IXvfGbwlY9K6EKsZqNHUbTAvzzBcEJvpDQSPZjHPWNsw/exec";


/* =====================================================
   2. CEK LOGIN ADMIN
===================================================== */

const adminLogin =
    sessionStorage.getItem("adminLogin");

if (adminLogin !== "true") {

    window.location.href =
        "admin.html";

}


/* =====================================================
   3. DATA GLOBAL
===================================================== */

let rekapan = [];

let dataTerfilter = [];


/* =====================================================
   4. INTERPRETASI PROFIL
===================================================== */

const interpretasiProfil = {

    F: {

        nama:
            "Fixed Mindset",

        ringkasan:
            "Cenderung melihat kemampuan sebagai sesuatu yang relatif tetap.",

        deskripsi:
            "Cenderung melihat kemampuan sebagai sesuatu yang relatif tetap. Tantangan atau kegagalan dapat lebih mudah dipandang sebagai cerminan keterbatasan kemampuan. Pengembangan diri dapat didukung dengan membuka diri terhadap proses belajar, usaha, pengalaman, tantangan, dan umpan balik."

    },


    FG: {

        nama:
            "Fixed-Growth Mindset",

        ringkasan:
            "Menunjukkan perpaduan kecenderungan pola pikir tetap dan bertumbuh.",

        deskripsi:
            "Pada beberapa aspek masih terdapat kecenderungan melihat kemampuan sebagai sesuatu yang relatif tetap, sementara pada aspek lain sudah terbuka terhadap perkembangan dan pembelajaran. Menerima umpan balik dan belajar dari pengalaman dapat membantu memperkuat pola pikir bertumbuh."

    },


    GF: {

        nama:
            "Growth-Fixed Mindset",

        ringkasan:
            "Menunjukkan kecenderungan pola pikir bertumbuh yang cukup kuat, tetapi masih terdapat beberapa aspek pola pikir tetap.",

        deskripsi:
            "Cenderung melihat kemampuan sebagai sesuatu yang dapat dikembangkan melalui belajar, pengalaman, usaha, dan umpan balik. Namun, dalam situasi tertentu masih dapat muncul pandangan yang lebih tetap."

    },


    G: {

        nama:
            "Growth Mindset",

        ringkasan:
            "Cenderung memiliki pola pikir bertumbuh dalam memandang kemampuan dan pengembangan diri.",

        deskripsi:
            "Cenderung melihat kemampuan sebagai sesuatu yang dapat dikembangkan melalui proses belajar, usaha, pengalaman, strategi, tantangan, dan keterbukaan terhadap umpan balik."

    }

};


/* =====================================================
   5. ELEMENT HTML
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
   6. ELEMENT STATUS & LOADING
===================================================== */

const statusData =
    document.getElementById(
        "statusData"
    );


const statusIndicator =
    document.getElementById(
        "statusIndicator"
    );


const statusText =
    document.getElementById(
        "statusText"
    );


const loadingData =
    document.getElementById(
        "loadingData"
    );


/* =====================================================
   7. ELEMENT MODAL
===================================================== */

const modalDetail =
    document.getElementById(
        "modalDetail"
    );


const modalOverlay =
    document.getElementById(
        "modalOverlay"
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


const detailInterpretasi =
    document.getElementById(
        "detailInterpretasi"
    );


const detailJawaban =
    document.getElementById(
        "detailJawaban"
    );


/* =====================================================
   8. ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

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
   9. AMBIL PROFIL
===================================================== */

/*
 * API saat ini mengirim:
 *
 * profil: "FG"
 *
 * Kita juga tetap mendukung
 * kategori jika nanti digunakan.
 */

function ambilProfil(data) {

    return String(
        data.profil ||
        data.kategori ||
        ""
    )
        .trim()
        .toUpperCase();

}


/* =====================================================
   10. FORMAT TANGGAL
===================================================== */

function formatTanggal(timestamp) {

    if (!timestamp) {

        return "-";

    }


    const tanggal =
        new Date(timestamp);


    if (
        Number.isNaN(
            tanggal.getTime()
        )
    ) {

        return String(
            timestamp
        );

    }


    return tanggal.toLocaleString(
        "id-ID",
        {

            day: "2-digit",

            month: "2-digit",

            year: "numeric",

            hour: "2-digit",

            minute: "2-digit"

        }
    );

}


/* =====================================================
   11. SET STATUS
===================================================== */

function setStatus(
    message,
    success = true
) {

    if (statusText) {

        statusText.textContent =
            message;

    }


    if (statusIndicator) {

        statusIndicator.classList.toggle(
            "success",
            success
        );

        statusIndicator.classList.toggle(
            "error",
            !success
        );

    }

}


/* =====================================================
   12. LOADING
===================================================== */

function setLoading(
    loading
) {

    if (!loadingData) {

        return;

    }


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


/* =====================================================
   13. AMBIL DATA DARI API
===================================================== */

async function ambilDataAPI() {

    try {

        setLoading(true);

        setStatus(
            "Menghubungkan ke server...",
            true
        );


        console.log(
            "===================================="
        );

        console.log(
            "MENGAMBIL DATA DARI API"
        );

        console.log(
            API_URL
        );


        const url =
            API_URL +
            "?action=getData&_=" +
            Date.now();


        const response =
            await fetch(
                url,
                {

                    method:
                        "GET",

                    cache:
                        "no-store"

                }
            );


        console.log(
            "HTTP STATUS:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "API mengembalikan HTTP " +
                response.status
            );

        }


        const hasil =
            await response.json();


        console.log(
            "RESPONSE API:",
            hasil
        );


        if (
            !hasil ||
            hasil.success !== true
        ) {

            throw new Error(
                hasil &&
                hasil.message
                    ? hasil.message
                    : "Response API tidak valid."
            );

        }


        if (
            !Array.isArray(
                hasil.data
            )
        ) {

            throw new Error(
                "Format data API tidak valid."
            );

        }


        /*
         * DATA DARI API
         */

        rekapan =
            hasil.data.map(
                function (item) {

                    return {

                        id:
                            item.id || "",

                        timestamp:
                            item.timestamp || "",

                        nama:
                            item.nama || "",

                        unitKerja:
                            item.unitKerja || "",

                        email:
                            item.email || "",

                        totalSkor:
                            Number(
                                item.totalSkor || 0
                            ),

                        profil:
                            ambilProfil(
                                item
                            ),

                        jawaban:
                            Array.isArray(
                                item.jawaban
                            )
                                ? item.jawaban
                                : [],

                        namaKategori:
                            item.namaKategori ||
                            "",

                        ringkasanKategori:
                            item.ringkasanKategori ||
                            "",

                        deskripsiKategori:
                            item.deskripsiKategori ||
                            ""

                    };

                }
            );


        /*
         * Urutkan terbaru
         * paling atas.
         */

        rekapan.sort(
            function (a, b) {

                return (
                    new Date(
                        b.timestamp
                    ) -
                    new Date(
                        a.timestamp
                    )
                );

            }
        );


        console.log(
            "TOTAL DATA:",
            rekapan.length
        );


        setStatus(
            "Terhubung · " +
            rekapan.length +
            " responden",
            true
        );


        isiFilterUnitKerja();

        updateDashboard();


    }
    catch (error) {

        console.error(
            "GAGAL MENGAMBIL DATA API:",
            error
        );


        rekapan = [];


        setStatus(
            "Gagal terhubung ke API",
            false
        );


        if (tabelRekapan) {

            tabelRekapan.innerHTML = "";

        }


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
                    ${escapeHTML(
                        error.message
                    )}
                </p>

                <button
                    type="button"
                    class="primary-btn"
                    onclick="ambilDataAPI()"
                >
                    Coba Lagi
                </button>

            `;

        }

    }
    finally {

        setLoading(false);

    }

}


/* =====================================================
   14. FILTER UNIT KERJA
===================================================== */

function isiFilterUnitKerja() {

    if (!filterUnitKerja) {

        return;

    }


    const nilaiLama =
        filterUnitKerja.value ||
        "semua";


    const daftarUnit =
        [
            ...new Set(

                rekapan

                    .map(
                        function (item) {

                            return (
                                item.unitKerja ||
                                ""
                            ).trim();

                        }
                    )

                    .filter(Boolean)

            )
        ]
        .sort(
            function (a, b) {

                return a.localeCompare(
                    b,
                    "id"
                );

            }
        );


    filterUnitKerja.innerHTML = `

        <option value="semua">
            Semua Unit Kerja
        </option>

    `;


    daftarUnit.forEach(
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
        nilaiLama === "semua" ||
        daftarUnit.includes(
            nilaiLama
        )
    ) {

        filterUnitKerja.value =
            nilaiLama;

    } else {

        filterUnitKerja.value =
            "semua";

    }

}


/* =====================================================
   15. DATA TERFILTER
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
        function (item) {

            const nama =
                String(
                    item.nama || ""
                ).toLowerCase();


            const email =
                String(
                    item.email || ""
                ).toLowerCase();


            const unitKerja =
                String(
                    item.unitKerja || ""
                );


            const cocokUnit =
                unit === "semua" ||
                unitKerja === unit;


            const cocokSearch =
                !keyword ||
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
   16. UPDATE DASHBOARD
===================================================== */

function updateDashboard() {

    dataTerfilter =
        ambilDataTerfilter();


    updateStatistik(
        dataTerfilter
    );


    tampilkanTabel(
        dataTerfilter
    );

}


/* =====================================================
   17. UPDATE STATISTIK
===================================================== */

function updateStatistik(
    data
) {

    const total =
        data.length;


    const jumlahFData =
        data.filter(
            item =>
                ambilProfil(item) ===
                "F"
        ).length;


    const jumlahFGData =
        data.filter(
            item =>
                ambilProfil(item) ===
                "FG"
        ).length;


    const jumlahGFData =
        data.filter(
            item =>
                ambilProfil(item) ===
                "GF"
        ).length;


    const jumlahGData =
        data.filter(
            item =>
                ambilProfil(item) ===
                "G"
        ).length;


    /*
     * TOTAL
     */

    if (jumlahResponden) {

        jumlahResponden.textContent =
            total;

    }


    if (pieTotal) {

        pieTotal.textContent =
            total;

    }


    /*
     * PROFIL
     */

    if (jumlahF) {

        jumlahF.textContent =
            jumlahFData;

    }


    if (jumlahFG) {

        jumlahFG.textContent =
            jumlahFGData;

    }


    if (jumlahGF) {

        jumlahGF.textContent =
            jumlahGFData;

    }


    if (jumlahG) {

        jumlahG.textContent =
            jumlahGData;

    }


    /*
     * PERSENTASE
     */

    const persenF =
        total
            ? (
                jumlahFData /
                total
            ) * 100
            : 0;


    const persenFG =
        total
            ? (
                jumlahFGData /
                total
            ) * 100
            : 0;


    const persenGF =
        total
            ? (
                jumlahGFData /
                total
            ) * 100
            : 0;


    const persenG =
        total
            ? (
                jumlahGData /
                total
            ) * 100
            : 0;


    /*
     * DETAIL
     */

    if (detailF) {

        detailF.textContent =
            jumlahFData +
            " responden · " +
            persenF.toFixed(1) +
            "%";

    }


    if (detailFG) {

        detailFG.textContent =
            jumlahFGData +
            " responden · " +
            persenFG.toFixed(1) +
            "%";

    }


    if (detailGF) {

        detailGF.textContent =
            jumlahGFData +
            " responden · " +
            persenGF.toFixed(1) +
            "%";

    }


    if (detailG) {

        detailG.textContent =
            jumlahGData +
            " responden · " +
            persenG.toFixed(1) +
            "%";

    }


    /*
     * DIAGRAM
     */

    updateDiagram(
        persenF,
        persenFG,
        persenGF,
        persenG
    );

}


/* =====================================================
   18. UPDATE DIAGRAM DONUT
===================================================== */

function updateDiagram(
    persenF,
    persenFG,
    persenGF,
    persenG
) {

    if (!pieChart) {

        return;

    }


    const totalPersen =
        persenF +
        persenFG +
        persenGF +
        persenG;


    if (
        totalPersen <= 0
    ) {

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
   19. TAMPILKAN TABEL
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

            const profil =
                ambilProfil(
                    responden
                );


            const tanggal =
                formatTanggal(
                    responden.timestamp
                );


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
                    <strong>
                        ${Number(
                            responden.totalSkor || 0
                        )}
                    </strong>
                </td>

                <td>

                    <span class="profil-badge">

                        ${escapeHTML(
                            profil || "-"
                        )}

                    </span>

                </td>

                <td>
                    ${escapeHTML(
                        tanggal
                    )}
                </td>

                <td>

                    <button
                        type="button"
                        class="detail-btn"
                        data-index="${index}"
                    >
                        Lihat Detail
                    </button>

                </td>

            `;


            const detailButton =
                row.querySelector(
                    ".detail-btn"
                );


            if (detailButton) {

                detailButton.addEventListener(
                    "click",
                    function () {

                        bukaDetail(
                            index
                        );

                    }
                );

            }


            tabelRekapan.appendChild(
                row
            );

        }
    );

}


/* =====================================================
   20. DETAIL RESPONDEN
===================================================== */

function bukaDetail(
    index
) {

    const data =
        dataTerfilter[index];


    if (!data) {

        return;

    }


    const profil =
        ambilProfil(
            data
        );


    const interpretasi =
        interpretasiProfil[
            profil
        ];


    /*
     * IDENTITAS
     */

    if (detailNama) {

        detailNama.textContent =
            data.nama ||
            "-";

    }


    if (detailUnitKerja) {

        detailUnitKerja.textContent =
            data.unitKerja ||
            "-";

    }


    if (detailEmail) {

        detailEmail.textContent =
            data.email ||
            "-";

    }


    if (detailKategori) {

        detailKategori.textContent =
            profil +
            (
                interpretasi
                    ? " — " +
                      interpretasi.nama
                    : ""
            );

    }


    if (detailTotal) {

        detailTotal.textContent =
            data.totalSkor ??
            "-";

    }


    if (detailTanggal) {

        detailTanggal.textContent =
            formatTanggal(
                data.timestamp
            );

    }


    /*
     * INTERPRETASI
     */

    if (detailInterpretasi) {

        if (interpretasi) {

            detailInterpretasi.innerHTML = `

                <div class="detail-interpretasi-inner">

                    <span>
                        PROFIL ${escapeHTML(
                            profil
                        )}
                    </span>

                    <h3>
                        ${escapeHTML(
                            interpretasi.nama
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            data.ringkasanKategori ||
                            interpretasi.ringkasan
                        )}
                    </p>

                    <p>
                        ${escapeHTML(
                            data.deskripsiKategori ||
                            interpretasi.deskripsi
                        )}
                    </p>

                </div>

            `;

        } else {

            detailInterpretasi.innerHTML =
                "";

        }

    }


    /*
     * JAWABAN
     */

    tampilkanDetailJawaban(
        data.jawaban
    );


    /*
     * BUKA MODAL
     */

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
   21. DETAIL JAWABAN
===================================================== */

function tampilkanDetailJawaban(
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
                    Detail jawaban tidak tersedia.
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


            card.className =
                "detail-soal-card";


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


/* =====================================================
   22. TUTUP MODAL
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


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        tutupModal
    );

}


/* =====================================================
   23. ESCAPE UNTUK TUTUP MODAL
===================================================== */

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
   24. PENCARIAN
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
   25. FILTER UNIT KERJA
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
   26. EXPORT CSV
===================================================== */

function csvEscape(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return (
        '"' +
        String(value)
            .replace(
                /"/g,
                '""'
            ) +
        '"'
    );

}


if (exportBtn) {

    exportBtn.addEventListener(
        "click",
        function () {

            const data =
                ambilDataTerfilter();


            if (
                data.length === 0
            ) {

                alert(
                    "Tidak ada data yang dapat diekspor."
                );

                return;

            }


            let csv =
                "No,Nama,Unit Kerja,Email,Grand Total,Profil,Tanggal\n";


            data.forEach(
                function (
                    item,
                    index
                ) {

                    csv += [

                        index + 1,

                        csvEscape(
                            item.nama
                        ),

                        csvEscape(
                            item.unitKerja
                        ),

                        csvEscape(
                            item.email
                        ),

                        item.totalSkor,

                        csvEscape(
                            ambilProfil(
                                item
                            )
                        ),

                        csvEscape(
                            formatTanggal(
                                item.timestamp
                            )
                        )

                    ].join(",") + "\n";

                }
            );


            const blob =
                new Blob(
                    [
                        "\uFEFF" +
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
                "rekapan-pola-pikir-" +
                new Date()
                    .toISOString()
                    .slice(0, 10) +
                ".csv";


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
   27. KEMBALI KE HALAMAN UTAMA
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
   28. LOGOUT ADMIN
===================================================== */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            sessionStorage.removeItem(
                "adminLogin"
            );


            window.location.href =
                "admin.html";

        }
    );

}


/* =====================================================
   29. JALANKAN SAAT HALAMAN DIBUKA
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "===================================="
        );

        console.log(
            "REKAPAN POLA PIKIR"
        );

        console.log(
            "Dashboard terhubung ke API"
        );

        console.log(
            "===================================="
        );


        ambilDataAPI();

    }
);
