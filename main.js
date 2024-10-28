document.addEventListener('DOMContentLoaded', () => {
    const entradaInput = document.getElementById('entradaInput');
    const exp = document.getElementById('exp');
    const resultado = document.getElementById('resultado');
    const calcularBtn = document.getElementById('calcular');

        calcularBtn.addEventListener('click', () => {
        const input = entradaInput.value.trim();

        if (input === '') {
            Swal.fire('Campo vacio, ingresa una operación', 'error');
            return;
        }

        // Verificar que la entrada tenga al menos 4 números
        const regex = /[\d]+(\s*[\+\-\*\/]\s*[\d]+){3}/;
        if (!regex.test(input)) {
            Swal.fire('La operación debe ser cuadruplo', 'error');
            return;
        }

        try {
            // Evaluar la expresión matemática
            const resultadoOperacion = eval(input); 

            // Mostrar el desglose y el resultado
            exp.innerHTML = desglosarOperacion(input);
            resultado.textContent = `Resultado final: ${resultadoOperacion}`;
        } catch (error) {
            Swal.fire('Error', 'La operación no es válida', 'error');
        }

        entradaInput.value = '';  // Limpiar el campo de entrada
    });

    // Función para desglosar la operación paso por paso
    const desglosarOperacion = (operacion) => {
        let pasos = [];
        let tempOperacion = operacion.replace(/\s+/g, '');  // Eliminar espacios innecesarios
    
        // Extraer y resolver paso por paso de acuerdo a la jerarquía
        while (/[\*\/]/.test(tempOperacion)) {
            tempOperacion = tempOperacion.replace(/(\d+\.?\d*)([\*\/])(\d+\.?\d*)/, (match, n1, op, n2) => {
                const res = op === '*' ? (parseFloat(n1) * parseFloat(n2)) : (parseFloat(n1) / parseFloat(n2));
                pasos.push(`${n1} ${op} ${n2} = ${res}`);
                return res;
            });
        }
    
        while (/[\+\-]/.test(tempOperacion)) {
            tempOperacion = tempOperacion.replace(/(\d+\.?\d*)([\+\-])(\d+\.?\d*)/, (match, n1, op, n2) => {
                const res = op === '+' ? (parseFloat(n1) + parseFloat(n2)) : (parseFloat(n1) - parseFloat(n2));
                pasos.push(`${n1} ${op} ${n2} = ${res}`);
                return res;
            });
        }
    
        return pasos.join('<br>');
    };
    
});
