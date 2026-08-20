/* =====================================================
   ANALISIS POLA PIKIR
   SCRIPT.JS — TERHUBUNG KE GOOGLE APPS SCRIPT API
===================================================== */


/* =====================================================
   1. KONFIGURASI API
===================================================== */

/*
 * GANTI URL DI BAWAH INI DENGAN URL WEB APP APPS SCRIPT
 *
 * Contoh:
 * https://script.google.com/macros/s/XXXXXXXXXXXX/exec
 */

const API_URL =
    "https://script.google.com/macros/s/AKfycbzleJt9T8DZ4y-NgOUmREMy_7IXvfGbwlY9K6EKsZqNHUbTAvzzBcEJvpDQSPZjHPWNsw/exec";


/* =====================================================
   2. DATA PERTANYAAN
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
   3. PILIHAN JAWABAN
===================================================== */

const pilihanJawaban = [

    "Sangat Setuju",
    "Setuju",
    "Tidak Setuju",
    "Sangat Tidak Setuju"

];


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

/*
 * Data ini hanya berada di RAM/browser
 * selama responden mengerjakan kuesioner.
 *
 * TIDAK menggunakan localStorage.
 * TIDAK menggunakan Firebase.
 */

let dataResponden = {

    nama: "",
    unitKerja: "",
    email: ""

};


/* =====================================================
   7. STATUS PENGIRIMAN
===================================================== */

let sedangMengirim = false;


/* =====================================================
   8. RESET KUESIONER
===================================================== */

function resetKuesioner() {

    const daftarSoal =
        document.getElementById("daftarSoal");


    if (!daftarSoal) {
        return;
    }


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


/* =====================================================
   9. TAMPILKAN PERTANYAAN
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
                                            ${escapeHTML(pilihan)}
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
   10. PINDAH HALAMAN
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
   11. TENTUKAN KATEGORI
===================================================== */

function tentukanKategori(
    totalSkor
) {

    if (
        totalSkor >= 0 &&
        totalSkor <= 20
    ) {

        return "F";

    }


    if (
        totalSkor >= 21 &&
        totalSkor <= 33
    ) {

        return "FG";

    }


    if (
        totalSkor >= 34 &&
        totalSkor <= 44
    ) {

        return "GF";

    }


    if (
        totalSkor >= 45 &&
        totalSkor <= 60
    ) {

        return "G";

    }


    return "-";

}


/* =====================================================
   12. AMBIL JAWABAN KUESIONER
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


            totalSkor += skor;


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


    if (!semuaTerjawab) {

        alert(
            "Silakan jawab semua pertanyaan terlebih dahulu."
        );

        return null;

    }


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
   13. KIRIM DATA KE API
===================================================== */

async function kirimDataKeAPI(
    hasil
) {

    /*
     * Pastikan URL API sudah diisi.
     */

    if (
        !API_URL ||
        API_URL.includes(
            "PASTE_URL_API"
        )
    ) {

        throw new Error(
            "URL API belum diisi di script.js."
        );

    }


    const dataYangDikirim = {

        action:
            "saveResponse",

        nama:
            dataResponden.nama,

        unitKerja:
            dataResponden.unitKerja,

        email:
            dataResponden.email,

        totalSkor:
            hasil.totalSkor,

        profil:
            hasil.kategori,

        kategori:
            hasil.kategori,

        namaKategori:
            hasil.namaKategori,

        ringkasanKategori:
            hasil.ringkasanKategori,

        deskripsiKategori:
            hasil.deskripsiKategori,

        jawaban:
            hasil.jawaban

    };


    console.log(
        "===================================="
    );

    console.log(
        "MENGIRIM DATA KE API"
    );

    console.log(
        dataYangDikirim
    );

    console.log(
        "===================================="
    );


    /*
     * Content-Type text/plain digunakan
     * agar request tidak memicu preflight
     * CORS yang rumit pada Apps Script.
     */

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
                    JSON.stringify(
                        dataYangDikirim
                    )

            }
        );


    if (!response.ok) {

        throw new Error(
            "Server API mengembalikan status " +
            response.status
        );

    }


    const hasilAPI =
        await response.json();


    console.log(
        "RESPON API:",
        hasilAPI
    );


    if (
        !hasilAPI.success
    ) {

        throw new Error(
            hasilAPI.message ||
            "Data gagal disimpan."
        );

    }


    return hasilAPI;

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
            `${data.kategori} — ` +
            `${data.namaKategori}`;

    }


    if (totalHasil) {

        totalHasil.textContent =
            data.totalSkor;

    }


    if (ringkasanHasil) {

        ringkasanHasil.textContent =

            `Anda memperoleh skor ` +
            `${data.totalSkor} dari ` +
            `maksimum 60 dan termasuk ` +
            `dalam kategori ` +
            `${data.kategori} ` +
            `(${data.namaKategori}). ` +
            `${data.ringkasanKategori}`;

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


            /*
             * Validasi tambahan.
             */

            if (
                !dataResponden.nama ||
                !dataResponden.unitKerja ||
                !dataResponden.email
            ) {

                alert(
                    "Semua data responden wajib diisi."
                );

                return;

            }


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
        async function () {

            /*
             * Jangan izinkan submit kedua
             * saat proses pengiriman berlangsung.
             */

            if (sedangMengirim) {

                return;

            }


            const hasil =
                ambilJawabanKuesioner();


            if (!hasil) {

                return;

            }


            /*
             * Ubah status tombol.
             */

            sedangMengirim = true;


            const teksTombolAsli =
                submitKuesioner.textContent;


            submitKuesioner.disabled =
                true;


            submitKuesioner.textContent =
                "Mengirim hasil...";


            /*
             * Gabungkan data responden
             * dengan hasil analisis.
             */

            const dataLengkap = {

                ...hasil,

                nama:
                    dataResponden.nama,

                unitKerja:
                    dataResponden.unitKerja,

                email:
                    dataResponden.email

            };


            try {

                /*
                 * KIRIM KE SERVER
                 */

                const hasilAPI =
                    await kirimDataKeAPI(
                        hasil
                    );


                console.log(
                    "Data berhasil masuk database pusat.",
                    hasilAPI
                );


                /*
                 * Tampilkan hasil kepada responden.
                 */

                tampilkanHasil(
                    dataLengkap
                );


            } catch (error) {

                console.error(
                    "GAGAL MENGIRIM DATA:",
                    error
                );


                alert(
                    "Hasil analisis belum berhasil dikirim ke server.\n\n" +
                    "Silakan periksa koneksi internet dan coba lagi."
                );


                return;


            } finally {

                sedangMengirim =
                    false;


                submitKuesioner.disabled =
                    false;


                submitKuesioner.textContent =
                    teksTombolAsli;

            }

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

            /*
             * Hapus data dari RAM.
             *
             * Tidak ada localStorage.
             */

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
   20. INISIALISASI
===================================================== */

tampilkanPertanyaan();


console.log(
    "===================================="
);

console.log(
    "ANALISIS POLA PIKIR"
);

console.log(
    "Script berhasil dimuat."
);

console.log(
    "API:",
    API_URL
);

console.log(
    "===================================="
);
