document.addEventListener('DOMContentLoaded', () => {
    const entradaInput = document.getElementById('entradaInput');
    const exp = document.getElementById('exp');
    const resultado = document.getElementById('resultado');
    const calcularBtn = document.getElementById('calcular');
    
    let acumulado = null;  // Para almacenar el resultado acumulado
    let pasos = []; // Para almacenar cada paso de la operación

    calcularBtn.addEventListener('click', () => {
        const input = entradaInput.value.trim();

        if (input === '') {
            Swal.fire('Error', 'Por favor ingresa una operación', 'error');
            return;
        }

        // Intentar convertir el input en un array de números separados por '+'
        const numeros = input.split('+').map(num => num.trim());

        // Validar que todos los valores ingresados sean números
        if (numeros.some(num => isNaN(num))) {
            Swal.fire('Error', 'Por favor ingresa solo números separados por "+"', 'error');
            return;
        }

        try {
            let resultadoOperacion;

            // Si es la primera operación, empezamos con el primer número
            if (acumulado === null) {
                acumulado = parseFloat(numeros[0]);  // Tomar el primer número como el acumulado inicial
                pasos.push(acumulado);  // Agregar el primer paso
            }

            // Iterar sobre el array de números y realizar las operaciones
            for (let i = 1; i < numeros.length; i++) {
                let numeroActual = parseFloat(numeros[i]);
                resultadoOperacion = acumulado + numeroActual;  // Sumar al acumulado
                pasos.push(`${acumulado} + ${numeroActual} = ${resultadoOperacion}`);  // Desglosar el paso
                acumulado = resultadoOperacion;  // Actualizar el acumulado con el nuevo resultado
            }

            // Mostrar los pasos desglosados
            exp.innerHTML = pasos.join('<br>');
            resultado.textContent = `Resultado final: ${resultadoOperacion}`;  // Mostrar el resultado final
        } catch (error) {
            Swal.fire('Error', 'La operación no es válida', 'error');
        }

        entradaInput.value = '';  // Limpiar el campo de entrada
    });
});
