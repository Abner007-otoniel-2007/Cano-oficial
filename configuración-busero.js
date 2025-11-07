function guardar() {
    const email = document.getElementById("correo").value.trim();
    const password = document.getElementById("contraseña").value.trim();

    if (!email || !password) {
        alert("Por favor, completá todos los campos.");
        return;
    }

    // Crear usuario con Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("✅ Cuenta creada exitosamente!");
            console.log("Usuario registrado:", userCredential.user);
            
            // Limpiar campos
            document.getElementById("correo").value = "";
            document.getElementById("contraseña").value = "";
            
            // Opcional: cambiar a pantalla de login
            document.getElementById("container").classList.remove("active");
        })
        .catch((error) => {
            console.error("Error:", error.code, error.message);
            
            if (error.code === 'auth/email-already-in-use') {
                alert("❌ Este email ya está registrado");
            } else if (error.code === 'auth/weak-password') {
                alert("❌ La contraseña debe tener al menos 6 caracteres");
            } else if (error.code === 'auth/invalid-email') {
                alert("❌ Email inválido");
            } else {
                alert("❌ Error: " + error.message);
            }
        });
}

// ============================================
// LOGIN (Sign In)
// ============================================
function iniciarSesion() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("contra").value.trim();

    if (!email || !password) {
        alert("Por favor, completá todos los campos.");
        return;
    }

    // Iniciar sesión con Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("✅ Bienvenido!");
            console.log("Usuario logueado:", userCredential.user);
            
            // Redirigir a otra página
            window.location.href = "menú-busero.html";
        })
        .catch((error) => {
            console.error("Error:", error.code, error.message);
            
            // IMPORTANTE: Firebase ahora usa auth/invalid-credential 
            // en lugar de auth/user-not-found y auth/wrong-password
            if (error.code === 'auth/invalid-credential') {
                alert("❌ Email o contraseña incorrectos");
            } else if (error.code === 'auth/invalid-email') {
                alert("❌ Email inválido");
            } else if (error.code === 'auth/user-disabled') {
                alert("❌ Esta cuenta ha sido deshabilitada");
            } else if (error.code === 'auth/too-many-requests') {
                alert("❌ Demasiados intentos fallidos. Intenta más tarde");
            } else {
                alert("❌ Error: " + error.message);
            }
        });
}