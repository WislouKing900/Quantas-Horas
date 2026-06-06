function calcular() {
  const inputHoras1 = document.getElementById('horas1').value;
  const inputHoras2 = document.getElementById('horas2').value;

  if (!inputHoras1 || !inputHoras2) {
    document.getElementById('resp').innerHTML = 'Por favor, insira os dois horários.';
    return;
  }

  const [horas1, minutos1] = inputHoras1.split(':').map(Number);
  const [horas2, minutos2] = inputHoras2.split(':').map(Number);
  
  const data1 = new Date();
  data1.setHours(horas1, minutos1, 0, 0);

  const data2 = new Date();
  data2.setHours(horas2, minutos2, 0, 0);

  let diferencaEmMili = data2.getTime() - data1.getTime();

  if (diferencaEmMili < 0) {
    diferencaEmMili += 24 * 60 * 60 * 1000;
  }

  const diferencaEmMinutos = Math.floor(diferencaEmMili / (1000 * 60));
  const diferencaHoras = Math.floor(diferencaEmMinutos / 60);
  const diferencaMinutos = diferencaEmMinutos % 60;

  // Formatação do texto de tempo
  let resultado = '';
  if (diferencaHoras > 0) {
    resultado += `${diferencaHoras} hora${diferencaHoras > 1 ? 's' : ''}`;
  }
  if (diferencaMinutos > 0) {
    resultado += (resultado.length > 0 ? ' e ' : '') + `${diferencaMinutos} minuto${diferencaMinutos > 1 ? 's' : ''}`;
  }
  if (resultado === '') resultado = 'Não há diferença de tempo.';

  // --- NOVA LÓGICA DE ACOPT ---
  // Se for >= 250 min (4h10), subtraímos 10 min e dividimos por 240 (4h)
  // Ex: 250min -> (250-10)/240 = 1 acompt
  // Ex: 480min (8h) -> (480-10)/240 = 1.95 -> Math.floor = 1 acompt
  // Ex: 490min (8h10) -> (490-10)/240 = 2 acompts
  let acomptos = 0;
  if (diferencaEmMinutos >= 250) {
    acomptos = Math.floor((diferencaEmMinutos - 10) / 240);
  }
  
  let mensagemAcomptos = '';
  if (acomptos > 0) {
    mensagemAcomptos = `<br>Mensagem: <strong>cobrar ${acomptos} acompt${acomptos > 1 ? 's' : ''}</strong>`;
  }

  // Lógica para horário especial
  let mensagemEspecial = '';
  if (horas1 >= 19 || horas2 >= 19) {
    mensagemEspecial = '<br><strong>cobrar TX add horario especial</strong>';
  }

  document.getElementById('resp').innerHTML = `A diferença de tempo é de: <strong>${resultado}</strong>.${mensagemAcomptos}${mensagemEspecial}`;
}