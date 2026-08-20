/* =====================================================
   ANALISIS POLA PIKIR
   SCRIPT.JS — VERSI FINAL
===================================================== */


/* =====================================================
   1. DATA PERTANYAAN
===================================================== */

const pertanyaan = [

    {
        no: 1,
        teks:
            "Kemampuan Anda adalah sesuatu yang sangat mendasar yang tidak banyak dapat Anda ubah lagi.",
        skor: [0, 1, 2, 3]
    },

    {
        no: 2,
        teks:
            "Tidak peduli seberapapun tingkat kemampuan Anda saat ini, Anda bisa mengubahnya walaupun sedikit.",
        skor: [3, 2, 1, 0]
    },

    {
        no: 3,
        teks:
            "Anda akan selalu dapat mengubah kemampuan Anda.",
        skor: [3, 2, 1, 0]
    },

    {
        no: 4,
        teks:
            "Anda adalah seseorang yang unik, tidak banyak yang dapat dilakukan untuk mengubahnya.",
        skor: [0, 1, 2, 3]
    },

    {
        no: 5,
        teks:
            "Anda akan selalu dapat mengubah diri Anda sendiri.",
        skor: [3, 2, 1, 0]
    },

    {
        no: 6,
        teks:
            "Kemampuan dalam bidang seni dan musik dapat dipelajari oleh siapapun.",
        skor: [3, 2, 1, 0]
    },

    {
        no: 7,
        teks:
            "Hanya sedikit orang yang benar-benar mahir dalam olahraga, Anda harus membawa bakat ini sejak lahir.",
        skor: [0, 1, 2, 3]
    },

    {
        no: 8,
        teks:
            "Matematika lebih mudah dipelajari oleh pria atau seseorang yang berada dalam lingkungan yang menyukainya.",
        skor: [0, 1, 2, 3]
    },

    {
        no: 9,
        teks:
            "Makin keras Anda mengerjakan sesuatu makin mahir Anda dalam hal ini.",
        skor: [3, 2, 1, 0]
    },

    {
        no: 10,
        teks:
            "Tidak peduli tipe apapun Anda saat ini, Anda akan selalu dapat mengubahnya.",
        skor: [3, 2, 1, 0]
    },

    {
        no: 11,
        teks:
            "Mencoba sesuatu yang baru akan sangat menyulitkan Anda sehingga Anda ingin menghindarinya.",
        skor: [0, 1, 2, 3]
    },

    {
        no: 12,
        teks:
            "Sebagian orang baik dan pintar, sebagian lagi tidak. Tidak banyak yang dapat berubah.",
        skor: [0, 1, 2, 3]
    },

    {
        no: 13,
        teks:
            "Saya sangat menghargai kritik dan saran dari siapapun juga terkait dengan kinerja saya saat ini.",
        skor: [3, 2, 1, 0]
    },

    {
        no: 14,
        teks:
            "Saya kurang senang bila ada kritik dan saran dari orang lain.",
        skor: [0, 1, 2, 3]
    },

    {
        no: 15,
        teks:
            "Semua orang yang tanpa cacat-otak atau cacat-lahir memiliki kemampuan yang sama dalam belajar.",
        skor: [3, 2, 1, 0]
    },

    {
        no: 16,
        teks:
            "Anda bisa mempelajari sesuatu yang baru, tapi Anda tidak bisa mengubah kemampuan Anda.",
        skor: [0, 1, 2, 3]
    },

    {
        no: 17,
        teks:
            "Anda dapat melakukan sesuatu secara berbeda, tapi sebenarnya Anda tetap tidak dapat mengubah kemampuan Anda.",
        skor: [0, 1, 2, 3]
    },

    {
        no: 18,
        teks:
            "Semua orang pada dasarnya baik, tapi kadang-kadang membuat keputusan yang salah.",
        skor: [3, 2, 1, 0]
    },

    {
        no: 19,
        teks:
            "Alasan terpenting mengapa Anda melakukan pekerjaan Anda adalah keinginan untuk mempelajari sesuatu yang baru.",
        skor: [3, 2, 1, 0]
    },

    {
        no: 20,
        teks:
            "Orang yang benar-benar cerdas, tidak perlu bekerja keras.",
        skor: [0, 1, 2, 3]
    }

];


/* =====================================================
   2. PILIHAN JAWABAN
===================================================== */

const pilihanJawaban = [

    "Sangat Setuju",
    "Setuju",
    "Tidak Setuju",
    "Sangat Tidak Setuju"

];


/* =====================================================
   3. KONFIGURASI
===================================================== */

const STORAGE_KEY =
    "rekapanPolaPikir";


/* =====================================================
   4. INTERPRETASI PROFIL
===================================================== */

const interpretasiProfil = {

    F: {

        nama:
            "Fixed Mindset",

        ringkasan:
            "Anda cenderung memiliki pola pikir yang lebih tetap dalam memandang kemampuan dan potensi diri.",

        deskripsi:
            "Anda cenderung memandang kemampuan sebagai sesuatu yang relatif tetap dan lebih sulit diubah. Tantangan atau kesalahan dapat terasa kurang nyaman. Pengembangan diri dapat didukung dengan membuka diri terhadap proses belajar, usaha, pengalaman, tantangan, dan umpan balik."

    },


    FG: {

        nama:
            "Fixed-Growth Mindset",

        ringkasan:
            "Anda menunjukkan perpaduan kecenderungan pola pikir tetap dan pola pikir bertumbuh.",

        deskripsi:
            "Pada beberapa aspek Anda mungkin masih memandang kemampuan sebagai sesuatu yang relatif tetap, sementara pada aspek lain Anda terbuka terhadap perkembangan dan pembelajaran. Terus mencoba, menerima umpan balik, dan belajar dari kesalahan dapat membantu memperkuat pola pikir bertumbuh."

    },


    GF: {

        nama:
            "Growth-Fixed Mindset",

        ringkasan:
            "Anda lebih banyak menunjukkan kecenderungan pola pikir bertumbuh, meskipun masih terdapat beberapa karakteristik pola pikir tetap.",

        deskripsi:
            "Anda cenderung melihat kemampuan sebagai sesuatu yang dapat dikembangkan melalui belajar, pengalaman, usaha, dan umpan balik. Namun, dalam situasi tertentu masih dapat muncul pandangan yang lebih tetap. Tantangan dan pengalaman belajar dapat menjadi kesempatan untuk semakin memperkuat pola pikir bertumbuh."

    },


    G: {

        nama:
            "Growth Mindset",

        ringkasan:
            "Anda cenderung memiliki pola pikir bertumbuh dalam memandang kemampuan, pembelajaran, dan pengembangan diri.",

        deskripsi:
            "Anda cenderung memandang kemampuan sebagai sesuatu yang dapat dikembangkan melalui belajar, usaha, pengalaman, tantangan, dan umpan balik. Kesalahan dapat dipandang sebagai bagian dari proses pembelajaran dan Anda cenderung terbuka terhadap pengembangan diri."

    }

};


/* =====================================================
   5. ELEMENT HALAMAN
===================================================== */

const halamanAwal =
    document.getElementById("halamanAwal");

const formResponden =
    document.getElementById("formResponden");

const halamanKuesioner =
    document.getElementById("halamanKuesioner");

const halamanHasil =
    document.getElementById("halamanHasil");


const mulaiBtn =
    document.getElementById("mulaiBtn");

const dataForm =
    document.getElementById("dataForm");

const submitKuesioner =
    document.getElementById("submitKuesioner");

const selesaiBtn =
    document.getElementById("selesaiBtn");


const namaHasil =
    document.getElementById("namaHasil");

const kategoriHasil =
    document.getElementById("kategoriHasil");

const totalHasil =
    document.getElementById("totalHasil");

const ringkasanHasil =
    document.getElementById("ringkasanHasil");

const deskripsiHasil =
    document.getElementById("deskripsiHasil");


/* =====================================================
   6. DATA RESPONDEN SEMENTARA
===================================================== */

let dataResponden = {

    nama: "",
    unitKerja: "",
    email: ""

};


/* =====================================================
   7. RESET KUESIONER
===================================================== */

function resetKuesioner() {

    const daftarSoal =
        document.getElementById("daftarSoal");


    if (daftarSoal) {

        daftarSoal
            .querySelectorAll(
                'input[type="radio"]'
            )
            .forEach(
                function (radio) {

                    radio.checked = false;

                }
            );

    }

}


/* =====================================================
   8. TAMPILKAN PERTANYAAN
===================================================== */

function tampilkanPertanyaan() {

    const daftarSoal =
        document.getElementById("daftarSoal");


    if (!daftarSoal) {
        return;
    }


    daftarSoal.innerHTML = "";


    pertanyaan.forEach(
        function (soal) {

            const card =
                document.createElement("div");


            card.className =
                "soal-card";


            card.innerHTML = `

                <div class="nomor-soal">
                    Soal ${soal.no}
                </div>


                <div class="teks-soal">
                    ${escapeHTML(soal.teks)}
                </div>


                <div class="pilihan">

                    ${pilihanJawaban
                        .map(
                            function (
                                pilihan,
                                index
                            ) {

                                return `

                                    <label class="pilihan-item">

                                        <input
                                            type="radio"
                                            name="soal${soal.no}"
                                            value="${soal.skor[index]}"
                                        >

                                        <span>
                                            ${escapeHTML(
                                                pilihan
                                            )}
                                        </span>

                                    </label>

                                `;

                            }
                        )
                        .join("")}

                </div>

            `;


            daftarSoal.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   9. PINDAH HALAMAN
===================================================== */

function tampilkanHalaman(
    halamanAktif
) {

    const semuaHalaman = [

        halamanAwal,
        formResponden,
        halamanKuesioner,
        halamanHasil

    ];


    semuaHalaman.forEach(
        function (halaman) {

            if (halaman) {

                halaman.classList.add(
                    "hidden"
                );

            }

        }
    );


    if (halamanAktif) {

        halamanAktif.classList.remove(
            "hidden"
        );

    }


    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

}


/* =====================================================
   10. TENTUKAN KATEGORI
===================================================== */

function tentukanKategori(
    totalSkor
) {

    if (
        totalSkor >= 0
        && totalSkor <= 20
    ) {

        return "F";

    }


    if (
        totalSkor >= 21
        && totalSkor <= 33
    ) {

        return "FG";

    }


    if (
        totalSkor >= 34
        && totalSkor <= 44
    ) {

        return "GF";

    }


    if (
        totalSkor >= 45
        && totalSkor <= 60
    ) {

        return "G";

    }


    return "-";
}


/* =====================================================
   11. AMBIL JAWABAN KUESIONER
===================================================== */

function ambilJawabanKuesioner() {

    let totalSkor = 0;

    let semuaTerjawab = true;

    const daftarJawaban = [];


    pertanyaan.forEach(
        function (soal) {

            const jawabanDipilih =
                document.querySelector(
                    `input[name="soal${soal.no}"]:checked`
                );


            if (!jawabanDipilih) {

                semuaTerjawab = false;

                return;

            }


            const skor =
                Number(
                    jawabanDipilih.value
                );


            totalSkor +=
                skor;


            const indexJawaban =
                soal.skor.indexOf(
                    skor
                );


            daftarJawaban.push({

                no:
                    soal.no,

                pertanyaan:
                    soal.teks,

                jawaban:
                    pilihanJawaban[
                        indexJawaban
                    ],

                skor:
                    skor

            });

        }
    );


    /* VALIDASI */

    if (!semuaTerjawab) {

        alert(
            "Silakan jawab semua pertanyaan terlebih dahulu."
        );

        return null;

    }


    /* KATEGORI */

    const kategori =
        tentukanKategori(
            totalSkor
        );


    const profil =
        interpretasiProfil[
            kategori
        ];


    return {

        totalSkor:
            totalSkor,

        kategori:
            kategori,

        namaKategori:
            profil
                ? profil.nama
                : "-",

        ringkasanKategori:
            profil
                ? profil.ringkasan
                : "-",

        deskripsiKategori:
            profil
                ? profil.deskripsi
                : "-",

        jawaban:
            daftarJawaban

    };

}


/* =====================================================
   12. SIMPAN DATA
===================================================== */

function simpanData(
    hasil
) {

    let dataLama = [];


    try {

        const dataTersimpan =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (dataTersimpan) {

            dataLama =
                JSON.parse(
                    dataTersimpan
                );

        }


        if (
            !Array.isArray(
                dataLama
            )
        ) {

            dataLama = [];

        }

    } catch (error) {

        console.error(
            "Gagal membaca data lama:",
            error
        );

        dataLama = [];

    }


    const dataBaru = {

        nama:
            dataResponden.nama,

        unitKerja:
            dataResponden.unitKerja,

        email:
            dataResponden.email,

        totalSkor:
            hasil.totalSkor,

        kategori:
            hasil.kategori,

        namaKategori:
            hasil.namaKategori,

        ringkasanKategori:
            hasil.ringkasanKategori,

        deskripsiKategori:
            hasil.deskripsiKategori,

        jawaban:
            hasil.jawaban,

        tanggal:
            buatTanggal()

    };


    dataLama.push(
        dataBaru
    );


    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(
            dataLama
        )

    );


    return dataBaru;

}


/* =====================================================
   13. FORMAT TANGGAL
===================================================== */

function buatTanggal() {

    return new Date()
        .toLocaleString(
            "id-ID",
            {

                day:
                    "numeric",

                month:
                    "numeric",

                year:
                    "numeric",

                hour:
                    "2-digit",

                minute:
                    "2-digit",

                second:
                    "2-digit"

            }
        );

}


/* =====================================================
   14. TAMPILKAN HASIL
===================================================== */

function tampilkanHasil(
    data
) {

    if (namaHasil) {

        namaHasil.textContent =
            data.nama;

    }


    if (kategoriHasil) {

        kategoriHasil.textContent =
            `${data.kategori} — `
            + `${data.namaKategori}`;

    }


    if (totalHasil) {

        totalHasil.textContent =
            data.totalSkor;

    }


    if (ringkasanHasil) {

        ringkasanHasil.textContent =

            `Anda memperoleh skor `
            + `${data.totalSkor} dari `
            + `maksimum 60 dan termasuk `
            + `dalam kategori `
            + `${data.kategori} `
            + `(${data.namaKategori}). `
            + `${data.ringkasanKategori}`;

    }


    if (deskripsiHasil) {

        deskripsiHasil.textContent =
            data.deskripsiKategori;

    }


    tampilkanHalaman(
        halamanHasil
    );

}


/* =====================================================
   15. MULAI ANALISIS
===================================================== */

if (mulaiBtn) {

    mulaiBtn.addEventListener(
        "click",
        function () {

            dataResponden = {

                nama: "",
                unitKerja: "",
                email: ""

            };


            resetKuesioner();


            if (dataForm) {

                dataForm.reset();

            }


            tampilkanHalaman(
                formResponden
            );

        }
    );

}


/* =====================================================
   16. FORM DATA RESPONDEN
===================================================== */

if (dataForm) {

    dataForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const namaInput =
                document.getElementById(
                    "nama"
                );


            const unitKerjaInput =
                document.getElementById(
                    "unitKerja"
                );


            const emailInput =
                document.getElementById(
                    "email"
                );


            dataResponden.nama =
                namaInput
                    ? namaInput.value.trim()
                    : "";


            dataResponden.unitKerja =
                unitKerjaInput
                    ? unitKerjaInput.value.trim()
                    : "";


            dataResponden.email =
                emailInput
                    ? emailInput.value.trim()
                    : "";


            resetKuesioner();


            tampilkanHalaman(
                halamanKuesioner
            );

        }
    );

}


/* =====================================================
   17. SUBMIT KUESIONER
===================================================== */

if (submitKuesioner) {

    submitKuesioner.addEventListener(
        "click",
        function () {

            const hasil =
                ambilJawabanKuesioner();


            if (!hasil) {
                return;
            }


            const dataTersimpan =
                simpanData(
                    hasil
                );


            tampilkanHasil(
                dataTersimpan
            );

        }
    );

}


/* =====================================================
   18. SELESAI
===================================================== */

if (selesaiBtn) {

    selesaiBtn.addEventListener(
        "click",
        function () {

            dataResponden = {

                nama: "",
                unitKerja: "",
                email: ""

            };


            if (dataForm) {

                dataForm.reset();

            }


            resetKuesioner();


            tampilkanHalaman(
                halamanAwal
            );

        }
    );

}


/* =====================================================
   19. ESCAPE HTML
===================================================== */

function escapeHTML(
    text
) {

    if (
        text === null
        || text === undefined
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
   20. INISIALISASI
===================================================== */

tampilkanPertanyaan();