/* =====================================================
   LOGIN ADMIN — FINAL
===================================================== */


/* =====================================================
   1. KONSTANTA LOGIN
===================================================== */

/*
   Catatan:
   Username dan password ini masih bersifat
   client-side karena project menggunakan
   HTML + CSS + JavaScript.
*/

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";


/* =====================================================
   2. ELEMENT HALAMAN
===================================================== */

const loginForm =
    document.getElementById("loginForm");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const loginError =
    document.getElementById("loginError");

const kembaliBtn =
    document.getElementById("kembaliBtn");


/* =====================================================
   3. LOGIN ADMIN
===================================================== */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                usernameInput
                    ? usernameInput.value.trim()
                    : "";

            const password =
                passwordInput
                    ? passwordInput.value
                    : "";


            /* -----------------------------------------
               CEK USERNAME & PASSWORD
            ----------------------------------------- */

            if (
                username === ADMIN_USERNAME &&
                password === ADMIN_PASSWORD
            ) {

                /*
                   Tandai bahwa admin sudah login.
                   Data ini hanya berlaku selama
                   session browser berlangsung.
                */

                sessionStorage.setItem(
                    "adminLogin",
                    "true"
                );


                /*
                   Hilangkan pesan error
                */

                if (loginError) {
                    loginError.classList.add(
                        "hidden"
                    );
                }


                /*
                   Masuk ke dashboard admin
                */

                window.location.href =
                    "rekapan.html";

            } else {

                /*
                   Tampilkan pesan error
                */

                if (loginError) {
                    loginError.classList.remove(
                        "hidden"
                    );
                }


                /*
                   Kosongkan password
                   agar admin memasukkan ulang.
                */

                if (passwordInput) {
                    passwordInput.value = "";
                    passwordInput.focus();
                }

            }

        }
    );

}


/* =====================================================
   4. TOMBOL KEMBALI
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
   5. JIKA SUDAH LOGIN
===================================================== */

/*
   Jika admin sudah login lalu membuka
   admin.html lagi, langsung arahkan
   ke dashboard.
*/

if (
    sessionStorage.getItem(
        "adminLogin"
    ) === "true"
) {

    window.location.href =
        "rekapan.html";

}