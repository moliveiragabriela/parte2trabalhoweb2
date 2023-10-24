let proximoIDReserva = 1;

const disponibilidadeMesas = {
  mesa2: { total: 4, disponivel: 4, idReserva: null },
  mesa4: { total: 4, disponivel: 4, idReserva: null },
  mesa6: { total: 4, disponivel: 4, idReserva: null },
  mesa10: { total: 2, disponivel: 2, idReserva: null }
};

function mostrarFormulario(opcao) {
  document.getElementById('formFazerReserva').style.display = 'none';
  document.getElementById('formCancelarReserva').style.display = 'none';

  if (opcao === 'fazerReserva') {
    document.getElementById('formFazerReserva').style.display = 'block';
  } else if (opcao === 'cancelarReserva') {
    document.getElementById('formCancelarReserva').style.display = 'block';
  }
}

function fazerReserva() {
  const nomeCompleto = document.getElementById('nomeCompleto').value;
  const dataNascimento = document.getElementById('dataNascimento').value;
  const dataReserva = document.getElementById('dataReserva').value;
  const horarioReserva = document.getElementById('horarioReserva').value;
  const numPessoas = parseInt(document.getElementById('numPessoas').value, 10);
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;

  // Validar o formato do telefone (DDD + 9 números)
  const telefoneRegex = /^\d{2}\d{9}$/;
  if (!telefone.match(telefoneRegex)) {
    alert('Formato de telefone inválido. O telefone deve conter DDD + 9 números.');
    return; // Não prosseguir com a reserva se o formato do telefone for inválido
  }

  const tipoMesa = `mesa${numPessoas}`;
  if (disponibilidadeMesas[tipoMesa].disponivel > 0) {
    const idReserva = proximoIDReserva;
    proximoIDReserva++;

    disponibilidadeMesas[tipoMesa].disponivel--;
    disponibilidadeMesas[tipoMesa].idReserva = idReserva;

    // Exibindo o resumo da reserva
    document.getElementById('idReserva').innerText = idReserva;
    document.getElementById('reservaNomeCompleto').innerText = nomeCompleto;
    document.getElementById('reservaData').innerText = dataReserva;
    document.getElementById('reservaHorario').innerText = horarioReserva;
    document.getElementById('reservaNumPessoas').innerText = numPessoas;
    document.getElementById('reservaTelefone').innerText = telefone;
    document.getElementById('reservaEmail').innerText = email;

    document.getElementById('resumoReserva').style.display = 'block';
  } else {
    alert('Não existem mais reservas para essa opção.');
  }
}

function cancelarReserva() {
  const codigoReserva = parseInt(document.getElementById('codigoReserva').value, 10);
  const dataNascimentoCancelar = document.getElementById('dataNascimentoCancelar').value;

  for (const mesa in disponibilidadeMesas) {
    if (disponibilidadeMesas[mesa].idReserva === codigoReserva) {
      disponibilidadeMesas[mesa].disponivel++;
      disponibilidadeMesas[mesa].idReserva = null;
      break;
    }
  }

  document.getElementById('mensagemCancelarReservaTexto').innerText = 'A reserva foi cancelada.';
  document.getElementById('mensagemCancelarReserva').style.display = 'block';
}




