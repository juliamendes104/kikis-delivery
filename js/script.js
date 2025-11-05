document.addEventListener('DOMContentLoaded', function() {
  //Formulário de contato
  const form = document.getElementById('contato-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const dados = Object.fromEntries(formData.entries());

      fetch('../api/contato.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      .then(res => res.json())
      .then(res => {
        if (res.status === 'ok') {
          alert('Mensagem enviada com sucesso!');
          form.reset();
        } else {
          alert('Erro: ' + res.erro);
        }
      })
      .catch(() => {
        alert('Erro de conexão com o servidor.');
      });
    });
  } else {
    console.log('Formulário com id "contato-form" não encontrado!');
  }

  //Formulário de cadastro
  const form_cad = document.getElementById('cadastro-form');
  if (form_cad) {
    form_cad.addEventListener('submit', function (e) {
      e.preventDefault();

      console.log('Interceptado! Enviando via fetch...');

      const formData = new FormData(form_cad);
      const dados = Object.fromEntries(formData.entries());

      fetch('../api/cadastro.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      .then(res => res.json())
      .then(res => {
        if (res.status === 'ok') {
          alert('Cadastro feito com sucesso!');
          form_cad.reset();
        } else {
          alert('Erro: ' + res.erro);
        }
      })
      .catch(() => {
        alert('Erro de conexão com o servidor.');
      });
    });
  } else {
    console.log('Formulário com id "cadastro-form" não encontrado!');
  }

  const form_ent = document.getElementById('entrar-form');
  if (form_ent) {
    form_ent.addEventListener('submit', function (e) {
      e.preventDefault();

      console.log('Interceptado! Enviando via fetch...');

      const formData = new FormData(form_ent);
      const dados = Object.fromEntries(formData.entries());

      fetch('../api/entrar.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      .then(res => res.json())
      .then(res => {
        if (res.status === 'ok') {
          
          window.location.href = 'index.html';
        } else {
          alert('Erro: ' + res.erro);
        }
      })
      .catch(() => {
        alert('Erro de conexão com o servidor.');
      });
    });
  } else {
    console.log('Formulário com id "entrar-form" não encontrado!');
  }
});
