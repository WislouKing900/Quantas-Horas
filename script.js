function calcular() {
  const inputHoras1 = document.getElementById('horas1').value;
  const inputHoras2 = document.getElementById('horas2').value;

  // Verifique se os campos não estão vazios
  if (!inputHoras1 || !inputHoras2) {
    document.getElementById('resp').innerHTML = 'Por favor, insira os dois horários.';
    return;
  }

  // Converta as strings de tempo (ex: "08:30") em objetos Date
  const [horas1, minutos1] = inputHoras1.split(':').map(Number);
  const [horas2, minutos2] = inputHoras2.split(':').map(Number);
  
  const data1 = new Date();
  data1.setHours(horas1, minutos1, 0);

  const data2 = new Date();
  data2.setHours(horas2, minutos2, 0);

  // Calcule a diferença em milissegundos
  let diferencaEmMili = data2.getTime() - data1.getTime();

  // Se o horário final for anterior ao inicial (por exemplo, 23:00 a 02:00 do dia seguinte), some 24 horas
  if (diferencaEmMili < 0) {
    diferencaEmMili += 24 * 60 * 60 * 1000;
  }

  // Converta a diferença para horas e minutos
  const diferencaEmMinutos = Math.floor(diferencaEmMili / (1000 * 60));
  const diferencaHoras = Math.floor(diferencaEmMinutos / 60);
  const diferencaMinutos = diferencaEmMinutos % 60;

  let resultado = '';

  if (diferencaHoras > 0) {
    resultado += `${diferencaHoras} hora${diferencaHoras > 1 ? 's' : ''}`;
  }

  if (diferencaMinutos > 0) {
    if (resultado.length > 0) {
      resultado += ' e ';
    }
    resultado += `${diferencaMinutos} minuto${diferencaMinutos > 1 ? 's' : ''}`;
  }

  if (resultado === '') {
    resultado = 'Não há diferença de tempo.';
  }

  // Exiba o resultado na tela
  document.getElementById('resp').innerHTML = `A diferença de tempo é de: <strong>${resultado}</strong>.`;
}

