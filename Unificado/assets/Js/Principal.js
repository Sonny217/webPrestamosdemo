document.getElementById("loan-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const loanAmount = parseFloat(document.getElementById("loan-amount").value);
    const loanDuration = parseInt(document.getElementById("loan-duration").value);
    const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;
    const lateFeePercentage = parseFloat(document.getElementById("late-fee").value) / 100;
    const isLate = document.getElementById("is-late").checked;
    const lateDays = isLate ? parseInt(document.getElementById("late-days").value) : 0;

    const interestAmount = loanAmount * interestRate * loanDuration;
    const totalMonthlyPayment = (loanAmount + interestAmount) / loanDuration;
    const delinquentFees = isLate ? (lateFeePercentage * loanAmount * lateDays / 7) : 0;

    document.getElementById("interest-calculation").textContent = `$${interestAmount.toFixed(2)}`;
    document.getElementById("total-monthly-payment").textContent = `$${totalMonthlyPayment.toFixed(2)}`;
    document.getElementById("delinquent-fees").textContent = `$${delinquentFees.toFixed(2)}`;
});
// Seccion de selecc. de mes y atraso //
const monthSelect = document.getElementById('mes');
const weekSelect = document.getElementById('semana');
const lateDaysInput = document.getElementById('late-days');

monthSelect.addEventListener('change', () => {
    if (monthSelect.value) {
        weekSelect.disabled = false;
    } else {
        weekSelect.disabled = true;
        lateDaysInput.disabled = true;
        weekSelect.value = '';
        lateDaysInput.value = '';
    }
});

weekSelect.addEventListener('change', () => {
    if (weekSelect.value) {
        lateDaysInput.disabled = false;
    } else {
        lateDaysInput.disabled = true;
        lateDaysInput.value = '';
    }
});

 /*=============== SHOW SIDEBAR ===============*/
const showSidebar = (toggleId, sidebarId) => {
    const toggle = document.getElementById(toggleId);
    const sidebar = document.getElementById(sidebarId);
  
    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            // Alternar la clase 'show-sidebar' para mostrar/ocultar la barra lateral
            sidebar.classList.toggle('show-sidebar');
            /**Add padding header **/
            header.classList.toggle('left-pd')
            /**Add padding main**/
            main.classList.toggle('left-pd')
        });
    } else {
        console.warn(`Elementos con IDs ${toggleId} y/o ${sidebarId} no encontrados.`);
    }
}

showSidebar('header-toggle', 'sidebar');

/*=============== LINK ACTIVE ===============*/
const sidebarLink = document.querySelectorAll('.sidebar__list a')

function linkColor(){
    sidebarLink.forEach(l => l.classList.remove('active-link'))
    this.classList.add('active-link')
   
}
sidebarLink.forEach(l => l.addEventListener('click',linkColor))
/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-fill'

/*** previously selected topic(if user selected)***/

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

//we obtain the current that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrenticon = () => themeButton.classList.contains(iconTheme) ? 'ri-contrast-2-line' : 'ri-sun-fill'

//we validate if the user previosly chose a topic
if (selectedTheme){

    // if the validate is fulfilled, we the issue was  to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'] (darkTheme)
    themeButton.classList[selectedIcon === 'ri-contrast-2-line' ? 'add': 'remove'](iconTheme)
}

//Activate / desativate the theme manually with the button
themeButton.addEventListener('click', ()=> {
    //Add or remuve  the dark /icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    //the save the theme and the current icon that the user chose
    localStorage.setItem('seleced-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrenticon())

})
document.getElementById("loan-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Capturar valores del formulario
    const loanAmount = parseFloat(document.getElementById("loan-amount").value);
    const loanDuration = parseInt(document.getElementById("loan-duration").value);
    const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;
    const lateFeePercentage = parseFloat(document.getElementById("late-fee").value) / 100;
    const lateDays = parseInt(document.getElementById("late-days").value) || 0;
    const paymentPeriod = document.getElementById("loan-period-type").value;

    // Validar que todos los campos sean números y positivos
    if (isNaN(loanAmount) || isNaN(loanDuration) || isNaN(interestRate) || loanAmount <= 0 || loanDuration <= 0 || interestRate <= 0) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    // Cálculo de interés (simple)
    const totalInterest = loanAmount * interestRate * loanDuration;

    // Cálculo de mora (si aplica)
    let lateFee = 0;
    let lateFeeText = "No aplica";
    if (lateDays > 0) {
        const weeksLate = Math.ceil(lateDays / 7); // Convertir días a semanas
        lateFee = loanAmount * lateFeePercentage * weeksLate;
        lateFeeText = `${(lateFeePercentage * 100).toFixed(2)}% x ${weeksLate} semanas = $${lateFee.toFixed(2)}`;
    }

    // Total a pagar
    let totalToPay = loanAmount + totalInterest + lateFee;
    let paymentDetails = "";

    // Ajuste según el período de pago
    if (paymentPeriod === "monthly") {
        paymentDetails = `Pago Mensual: $${(totalToPay / loanDuration).toFixed(2)}`;
    } else if (paymentPeriod === "weekly") {
        const totalWeeks = loanDuration * 4; // Asumir 4 semanas por mes
        paymentDetails = `Pago Semanal: $${(totalToPay / totalWeeks).toFixed(2)}`;
    } else {
        paymentDetails = `Pago Total: $${totalToPay.toFixed(2)}`;
    }

    // Mostrar resultados
    document.getElementById("interest-calculation").textContent = `$${totalInterest.toFixed(2)}`;
    document.getElementById("total-monthly-payment").textContent = `$${(totalToPay / loanDuration).toFixed(2)}`;
    document.getElementById("delinquent-fees").textContent = lateFeeText;
    document.getElementById("loan-results").style.display = "block";

    // Opcional: Puedes también mostrar en consola los detalles del cálculo si lo necesitas
    console.log(paymentDetails);
});


  document.getElementById("loan-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Capturar valores del formulario
    const loanAmount = parseFloat(document.getElementById("loan-amount").value);
    const loanDuration = parseInt(document.getElementById("loan-duration").value);
    const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;
    const lateFeePercentage = parseFloat(document.getElementById("late-fee").value) / 100;
    const lateDays = parseInt(document.getElementById("late-days").value) || 0;
    const paymentPeriod = document.getElementById("loan-period-type").value;

    // Validar los campos
    if (isNaN(loanAmount) || isNaN(loanDuration) || isNaN(interestRate) || loanAmount <= 0 || loanDuration <= 0 || interestRate <= 0) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    // Cálculos
    const totalInterest = loanAmount * interestRate * loanDuration;
    let lateFee = 0;
    if (lateDays > 0) {
        const weeksLate = Math.ceil(lateDays / 7);
        lateFee = loanAmount * lateFeePercentage * weeksLate;
    }

    let totalToPay = loanAmount + totalInterest + lateFee;

    // Actualizar la interfaz con los resultados
    document.getElementById("interest-calculation").textContent = `$${totalInterest.toFixed(2)}`;
    document.getElementById("total-monthly-payment").textContent = `$${(totalToPay / loanDuration).toFixed(2)}`;
    document.getElementById("delinquent-fees").textContent = `$${lateFee.toFixed(2)}`;

    // Actualizar detalles con los valores seleccionados
    document.getElementById("interest-rate-detail").textContent = `${(interestRate * 100).toFixed(2)}%`;
    document.getElementById("loan-duration-detail").textContent = `${loanDuration} meses`;
    document.getElementById("late-fee-detail").textContent = `${(lateFeePercentage * 100).toFixed(2)}%`;

    document.getElementById("loan-results").style.display = "block";
});

// GENEREADOR DE REIBO //

    // Obtener los elementos del formulario y del recibo
    const form = document.getElementById('loan-form');
    const loanResults = document.getElementById('loan-results');
    const receiptSection = document.getElementById('receipt');
    const receiptContent = document.getElementById('receipt-content');
    const downloadBtn = document.getElementById('download');
    const saveImageBtn = document.getElementById('save-image');
    const printBtn = document.getElementById('print');

    // Función para mostrar los resultados
    function showReceipt() {
        const clientName = document.getElementById('client-name').value;
        const loanAmount = document.getElementById('loan-amount').value;
        const loanDuration = document.getElementById('loan-duration').value;
        const interestRate = document.getElementById('interest-rate').value;
        const loanPeriodType = document.getElementById('loan-period-type').value;
        const lateFee = document.getElementById('late-fee').value;

        // Mostrar el recibo con los datos ingresados
        receiptContent.innerHTML = `
            <h3>Recibo del Préstamo</h3>
            <p><strong>Nombre del Cliente:</strong> ${clientName}</p>
            <p><strong>Monto del Préstamo:</strong> $${parseFloat(loanAmount).toFixed(2)}</p>
            <p><strong>Duración del Préstamo:</strong> ${loanDuration} meses</p>
            <p><strong>Tasa de Interés Mensual:</strong> ${interestRate}%</p>
            <p><strong>Tipo de Período de Pago:</strong> ${loanPeriodType}</p>
            <p><strong>Porcentaje de Mora:</strong> ${lateFee}%</p>
        `;
        receiptSection.style.display = 'block';
    }

    // Generar PDF
    downloadBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Generar el PDF con los datos del recibo
        doc.text('Recibo del Préstamo', 10, 10);
        doc.text(`Nombre del Cliente: ${document.getElementById('client-name').value}`, 10, 20);
        doc.text(`Monto del Préstamo: $${parseFloat(document.getElementById('loan-amount').value).toFixed(2)}`, 10, 30);
        doc.text(`Duración del Préstamo: ${document.getElementById('loan-duration').value} meses`, 10, 40);
        doc.text(`Tasa de Interés Mensual: ${document.getElementById('interest-rate').value}%`, 10, 50);
        doc.text(`Tipo de Período de Pago: ${document.getElementById('loan-period-type').value}`, 10, 60);
        doc.text(`Porcentaje de Mora: ${document.getElementById('late-fee').value}%`, 10, 70);

        // Descargar el PDF
        doc.save('recibo-prestamo.pdf');
    });

    // Guardar como imagen
    saveImageBtn.addEventListener('click', () => {
        html2canvas(receiptContent).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'recibo-prestamo.png';
            link.click();
        });
    });

    // Imprimir el recibo
    printBtn.addEventListener('click', () => {
        const printWindow = window.open('', '', 'width=800, height=600');
        printWindow.document.write('<html><head><title>Recibo del Préstamo</title></head><body>');
        printWindow.document.write(receiptContent.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });

    // Mostrar los resultados cuando se envíe el formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showReceipt();
    });

    function numeroALetras(num) {
        const unidades = ['Cero', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve'];
        const decenas = ['', '', 'Veinte', 'Treinta', 'Cuarenta', 'Cincuenta', 'Sesenta', 'Setenta', 'Ochenta', 'Noventa'];
        const centenas = ['', 'Cien', 'Doscientos', 'Trescientos', 'Cuatrocientos', 'Quinientos', 'Seiscientos', 'Setecientos', 'Ochocientos', 'Novecientos'];

        let letras = '';

        if (num >= 1000) {
            letras += unidades[Math.floor(num / 1000)] + ' Mil ';
            num %= 1000;
        }

        if (num >= 100) {
            letras += centenas[Math.floor(num / 100)] + ' ';
            num %= 100;
        }

        if (num >= 10) {
            letras += decenas[Math.floor(num / 10)] + ' ';
            num %= 10;
        }

        if (num > 0) {
            letras += unidades[num];
        }

        return letras.trim();
    }

    document.getElementById('download').addEventListener('click', function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Obtener valores del formulario
        const nombre = document.getElementById('client-name').value;
        const monto = parseFloat(document.getElementById('loan-amount').value) || 0;
        const totalMensual = document.getElementById('total-monthly-payment').textContent;
        const duracion = document.getElementById('loan-duration').value;

        // Convertir monto a letras
        const montoEnLetras = numeroALetras(monto);

        // Crear contenido del PDF
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(16);
        doc.text('Reporte de Préstamo', 20, 20);

        doc.setFontSize(12);
        doc.text(`Nombre del Cliente: ${nombre}`, 20, 40);
        doc.text(`Monto del Préstamo: $${monto} (${montoEnLetras})`, 20, 50);
        doc.text(`Total a Pagar Mensualmente: ${totalMensual}`, 20, 60);
        doc.text(`Duración del Préstamo: ${duracion} meses`, 20, 70);

        // Descargar PDF
        doc.save('reporte-prestamo.pdf');
    });