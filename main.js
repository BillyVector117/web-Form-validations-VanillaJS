const formulario = document.getElementById("formulario"); // Captura elemento formulario
const inputs = document.querySelectorAll("#formulario input"); // Captura todos los inputs (6)

// Expresiones regulares para validar cada input
const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos
  password: /^.{4,12}$/, // 4 - 12 digitos
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Letas, números, signos, @.
  telefono: /^\d{7,14}$/, // 7 - 14 numeros
};

// Se usara para alidar cada campo al enviar el form (default: false)
const campos = {
  usuario: false,
  nombre: false,
  password: false,
  password2: false,
  correo: false,
  telefono: false,
};
const validarFormulario = (e) => {
	// En cada typeo se llama esta función por lo que e.target.name detecta el input referenciado para que funcione el case
	switch (e.target.name) {
    // Casos si el e.target.name es el input indicado, cualquiera ejecuta la función validarCampo
    case "usuario":
      // Enviamos a la función la expresión regular para dicho campo, e.target el input completo, y el string del nombre del campo (manualmente)
      validarCampo(expresiones.usuario, e.target, "usuario");
      break;
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      validarPassword2(); // Ejecuta la función para comparar ambas contraseñas
      break;
    case "password2": // En caso de que se este validando el campo password2...
      validarPassword2(); // Ejecuta la función para comparar ambas contraseñas
      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target, "telefono");
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
  }
};
// VALIDA QUE CADA INPUT SEA IGUAL A SU EXPRESIÓN REGULAR ( Se ejecuta en cada type); Recibe 3 parametros; expresión de cada input, el input completo actual y el nombre de ese input de manera manual
const validarCampo = (expresion, input, campo) => {
  // Validar a TRUE si la comparación de la expresión con el valor del input es correcta
  if (expresion.test(input.value)) {
    // Captura el id del div completo del input en particular, agregale una clase y eliminale otra, ademas agrega su clase de icono (success)
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto"); // Los estilos tienen letras verdes sobre el div del input
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto"); // Elimina estilos letras rojas
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-times-circle"); // Accede al id del icono y elimina su clase de icono error
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-check-circle"); // Accede al id del icono y agrega el icono circle success
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo"); // Elimina clase del parrafo de error
    // Selecciona la clase del parrafo/mensaje, accedemos a su lista de clase y eliminamos su <<versión>> activa (en css el normal no tiene display on.)
    campos[campo] = true; // La propiedad del objeto campo de expresiones regulares pasa a ser TRUE ya que paso el test
  } else {
    // Si es FALSE al validar alguna expresión regular...
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto"); // Agrega estilos letras rojas sobre el div del input
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto"); // Elimina la clase de letras verdes
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-times-circle"); // Accede al id del icono y agrega el icono de incorrecto
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-check-circle"); // Accede al id del icono y elimina la clase/icono de correcto
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo"); // Agrega clase del parrafo de error
    // Selecciona la clase del parrafo/mensaje, accedemos a su lista de clase y agregamos su <<versión>> activa (en css el normal no tiene display on. Con el activo si se mostrara el mensaje.)
    campos[campo] = false; // Al no pasar el test de comparación la expresión regular sigue siendo FALSE
  }
};

// Validación de ambas contraseñas
const validarPassword2 = () => {
  const inputPassword1 = document.getElementById("password"); // Captura input password
  const inputPassword2 = document.getElementById("password2"); // Captura input password 2

  // Si el valor de ambos inputs son diferentes...
  if (inputPassword1.value !== inputPassword2.value) {
    // Coloca el icono rojo, el input rojo y el mensaje de error...
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-incorrecto"); // Agrega las propiedades de "error" al div del input password2
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-correcto"); // Elimina las propiedades de "success" al div del input password2
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-times-circle"); // Accede al id del icono y agrega su clase de estado "error"
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-check-circle"); // Accede al id del icono y elimina su clase de estado "success"
    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.add("formulario__input-error-activo"); // del div del password2 accede a su elemento hijo <p> (msg) y agregale el estado "error"
    campos["password"] = false; // En la expresión regular sigue siendo false su propiedad
  } else {
    // Si no, significa que ambos inputs tienen valores IGUALES
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-incorrecto"); // Elimina las propiedades "error" al div del input password2
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-correcto"); // Agrega las propiedades "success" al div del input password2
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-times-circle"); // Accede al id del icono y elimina su clase (el icono) de <<times/tache>> */
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-check-circle"); // Accede al id del icono y agrega su clase (el icono) de <<check/correcto>> */
    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.remove("formulario__input-error-activo"); // Accede al elemento hijo <p> del div de password2 y elimina su clase de "error" del msg
    campos["password"] = true; // En el objeto de expresiones regulares cambia a true ya que si coinciden
    campos["password2"] = true;
  }
};
// Para cada input existente (6) agrega eventos
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario); // Ejecuta validarFormulario() cada ves que se typee un caracter
  input.addEventListener("blur", validarFormulario); // Ejecuta validarFormulario() cada ves que se clickee fuera del input
});

// Evento al dar submit
formulario.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita el loading de la pagina
  const terminos = document.getElementById("terminos"); // Captura elemento 'terminos' (input)
  // Si todos los inputs son true (cambiamos de true a false en el objeto de expresiones regulares al ejecutar la función validarFormulario())
  if (
    campos.usuario &&
    campos.nombre &&
    campos.password &&
    campos.password2 &&
    campos.correo &&
    campos.telefono &&
    terminos.checked
  ) {
    // terminos.checked para validar que esta marcado el checkbox */
    formulario.reset(); // Se resetearan valores del formulario
    document
      .getElementById("formulario__mensaje-exito")
      .classList.add("formulario__mensaje-exito-activo"); // Captura por id el <p> del mensaje exito y agrega su clase "activo" (en css tiene display)
    setTimeout(() => {
      // Duración del mensaje
      // Cuerpo de la ejecución temporal
      document
        .getElementById("formulario__mensaje-exito")
        .classList.remove("formulario__mensaje-exito-activo"); // Remueve su estado "activo" del <p> (mensaje)
    }, 5000);
    // Elimina todos los iconos al dar submit y efectos
    document
      .querySelectorAll(".formulario__grupo-correcto")
      .forEach((icono) => {
        // Selecciona todos los div de inputs
        icono.classList.remove("formulario__grupo-correcto"); // Y de cada uno remueve su misma clase
      });
  } else {
    // Si hay algun error en minimo un input muestra mensaje de error
    document
      .getElementById("formulario__mensaje")
      .classList.add("formulario__mensaje-activo");
  }
});
