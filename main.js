const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const inputNome = document.querySelector('#nome')
const inputCargo = document.querySelector('#cargo')
const inputRenumeracao = document.querySelector('#renumeracao')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  // Seleciona o botão de fechar
  const closeButton = document.querySelector('.close-modal-btn');
  closeButton.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    inputNome.value = itens[index].nome
    inputCargo.value = itens[index].cargo
    inputRenumeracao.value = itens[index].renumeracao
    id = index
  } else {
    inputNome.value = ''
   inputCargo.value = ''
    inputRenumeracao.value = ''
  }
  
}


function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.cargo}</td>
    <td>R$ ${parseFloat(item.renumeracao).toLocaleString('pt-BR')}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (inputNome.value == '' ||inputCargo.value == '' || inputRenumeracao.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = inputNome.value
    itens[id].cargo =inputCargo.value
    itens[id].renumeracao = inputRenumeracao.value
  } else {
    itens.push({'nome': inputNome.value, 'cargo':inputCargo.value, 'renumeracao': inputRenumeracao.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()