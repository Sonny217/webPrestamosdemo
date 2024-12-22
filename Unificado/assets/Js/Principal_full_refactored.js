
function numeroALetras(num) {
    const unidades = ['Cero', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve'];
    const decenas = ['', '', 'Veinte', 'Treinta', 'Cuarenta', 'Cincuenta', 'Sesenta', 'Setenta', 'Ochenta', 'Noventa'];
    const centenas = ['', 'Cien', 'Doscientos', 'Trescientos', 'Cuatrocientos', 'Quinientos', 'Seiscientos', 'Setecientos', 'Ochocientos', 'Novecientos'];
    const especiales = ['Diez', 'Once', 'Doce', 'Trece', 'Catorce', 'Quince', 'Dieciséis', 'Diecisiete', 'Dieciocho', 'Diecinueve'];

    // Convierte los números menores de 10
    function Unidades(num) {
        return unidades[num];
    }

    // Convierte los números de 10 a 19
    function DecenasEspeciales(num) {
        return especiales[num - 10];
    }

    // Convierte números entre 20 y 99
    function Decenas(num) {
        if (num < 20) return DecenasEspeciales(num);
        const decena = Math.floor(num / 10);
        const unidad = num % 10;
        return decenas[decena] + (unidad ? ' y ' + Unidades(unidad) : '');
    }

    // Convierte los números entre 100 y 999
    function Centenas(num) {
        if (num < 100) return Decenas(num);
        const centena = Math.floor(num / 100);
        const resto = num % 100;
        return centenas[centena] + (resto ? ' ' + Decenas(resto) : '');
    }

    // Convierte los números entre 1000 y 999999
    function Miles(num) {
        if (num < 1000) return Centenas(num);
        const mil = Math.floor(num / 1000);
        const resto = num % 1000;
        return (mil === 1 ? 'Mil' : Centenas(mil) + ' Mil') + (resto ? ' ' + Centenas(resto) : '');
    }

    // Convierte los números entre 1 millón y 999999999
    function Millones(num) {
        if (num < 1000000) return Miles(num);
        const millon = Math.floor(num / 1000000);
        const resto = num % 1000000;
        return (millon === 1 ? 'Un Millón' : Centenas(millon) + ' Millones') + (resto ? ' ' + Miles(resto) : '');
    }

    // Si el número es mayor que 999,999 lo convierte
    return Millones(num).charAt(0).toUpperCase() + Millones(num).slice(1);
}

// Función para calcular el préstamo
function calcularPrestamo() {
    const loanAmount = parseFloat(document.getElementById("loan-amount").value);
    const loanDuration = parseInt(document.getElementById("loan-duration").value);
    const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;
    const lateFeePercentage = parseFloat(document.getElementById("late-fee").value) / 100;
    const lateDays = parseInt(document.getElementById("late-days").value) || 0;
    const paymentPeriod = document.getElementById("loan-period-type").value;

    if (isNaN(loanAmount) || isNaN(loanDuration) || isNaN(interestRate) || loanAmount <= 0 || loanDuration <= 0 || interestRate <= 0) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    const totalInterest = loanAmount * interestRate * loanDuration;
    let lateFee = 0;
    if (lateDays > 0) {
        const weeksLate = Math.ceil(lateDays / 7);
        lateFee = loanAmount * lateFeePercentage * weeksLate;
    }

    const totalToPay = loanAmount + totalInterest + lateFee;
    let paymentDetails = "";

    if (paymentPeriod === "Mensualmente") {
        paymentDetails = `Pago Mensual: $${(totalToPay / loanDuration).toFixed(2)}`;
    } else if (paymentPeriod === "weekly") {
        const totalWeeks = loanDuration * 4;
        paymentDetails = `Pago Semanal: $${(totalToPay / totalWeeks).toFixed(2)}`;
    } else {
        paymentDetails = `Pago Total: $${totalToPay.toFixed(2)}`;
    }

    document.getElementById("interest-calculation").textContent = `$${totalInterest.toFixed(2)}`;
    document.getElementById("total-monthly-payment").textContent = `$${(totalToPay / loanDuration).toFixed(2)}`;
    document.getElementById("delinquent-fees").textContent = `$${lateFee.toFixed(2)}`;
    document.getElementById("interest-rate-detail").textContent = `${(interestRate * 100).toFixed(2)}%`;
    document.getElementById("loan-duration-detail").textContent = `${loanDuration} meses`;
    document.getElementById("late-fee-detail").textContent = `${(lateFeePercentage * 100).toFixed(2)}%`;

    document.getElementById("loan-results").style.display = "block";
}

// Función para generar el PDF
function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const nombre = document.getElementById('client-name').value;
    const monto = parseFloat(document.getElementById('loan-amount').value) || 0;
    const totalMensual = document.getElementById('total-monthly-payment').textContent || '$0.00';
    const duracion = document.getElementById('loan-duration').value;

    const montoEnLetras = numeroALetras(monto);

    doc.setFont('Helvetica', 'Bold', 16);
    doc.setFontSize(16);
    doc.text('Reporte de Préstamo', 20, 20);

    doc.setFontSize(12);
    doc.text(`Nombre del Cliente: ${nombre}`, 20, 40);
    doc.text(`Monto del Préstamo: $${monto} (${montoEnLetras})`, 20, 50);
    doc.text(`Total a Pagar Mensualmente: ${totalMensual}`, 20, 60);
    doc.text(`Duración del Préstamo: ${duracion} meses`, 20, 70);

    doc.save('reporte-prestamo.pdf');
}

// Función para manejar el cambio de mes y semana
function manejarMesSemana() {
    const monthSelect = document.getElementById('mes');
    const weekSelect = document.getElementById('semana');
    const lateDaysInput = document.getElementById('late-days');

    monthSelect.addEventListener('change', () => {
        weekSelect.disabled = !monthSelect.value;
        if (!monthSelect.value) {
            weekSelect.value = '';
            lateDaysInput.value = '';
            lateDaysInput.disabled = true;
        }
    });

    weekSelect.addEventListener('change', () => {
        lateDaysInput.disabled = !weekSelect.value;
        if (!weekSelect.value) {
            lateDaysInput.value = '';
        }
    });
}

// Asignar eventos
document.getElementById("loan-form").addEventListener("submit", function (e) {
    e.preventDefault();
    calcularPrestamo();
});

document.getElementById('download').addEventListener('click', generarPDF);

// Inicializar la lógica de manejo de mes y semana
manejarMesSemana();

