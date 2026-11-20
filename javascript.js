let elements =[]
const elementos= //Puxei os elementos do HTML
{
saldo:document.getElementById('valorSaldo'),
entradas:document.getElementById('valorEntradas'),
saidas:document.getElementById('valorSaidas'),
botao:document.getElementById('botao'),
filtroall:document.getElementById('filtroTodas'),
filtroentrada:document.getElementById('filtroEntradas'),
filtroclose:document.getElementById('filtroSaidas'),
Descricao:document.getElementById('Descricao'),
Numeroadd:document.getElementById('numeroadicionar'),
Lista:document.getElementById('Valores'),
tipotransaction:document.getElementById('tipoTransacao'),
painelentrada:document.getElementById('cardentradas'),
painelsaida:document.getElementById('cardsaidas'),
painelsaldototal:document.getElementById('cardsaldo'),
}
let identificador = 0// Criei uma variavel que vai ser o identificador de cada transação
let editando = false // Criei a variavel da edição
let guardarachado // Aqui nessa variavel vai ser guardado as infos do objeto que foi clicado no editar
let descricaoEditada //valor da desc editada
let valorEditado // valor do valor editado
let numeroanterior = 0 // saldo atual da transação
let numeroproximo = 0 // numero da proxima transação
let totalentradas = 0 // valor do painel das entradas 
let totalsaidas = 0 // valor do painel das saidas
function adicionar(){
let text2 =  document.createElement('div')//criei uma div que vai entrar o numero do valor
let descricaoachada = document.createElement('div')//criei uma div que vai entrar a nova descrição

//promise da validação
let validacaopromise = new Promise((resolve, reject) => {  
if(elementos.Descricao.value === ''||elementos.Numeroadd.value === ''){
resolve('Digite uma descrição e um numero')
}else if(elementos.Numeroadd.value < 0){
reject('O valor não pode ser negativo')
}
return
})
validacaopromise.then((Resultado) => window.alert(Resultado),
(erro)=> window.alert(erro))
if(elementos.Descricao.value === '' ||elementos.Numeroadd.value === ''){//Validação que impede campos de ficarem vazios
window.alert('Digite uma descrição e um numero')
return
}
if(elementos.Numeroadd.value < 0){// validação que impede numeros negativos
window.alert('O valor não pode ser negativo')
return
}
// fim da promise

// CORRIGIDO: removi o "let descricaoEditada" e "let valorEditado" daqui (agora são globais)

if(editando === true){ // aqui ta caso se o botão de edit for clicado entra no modo edit
let guardarachadoquant = Number(guardarachado.quantidade)// aqui guarda a quantidade do objeto antigo
let guardarachadotip = guardarachado.tiptransaction // aqui guarda o tipo de transacao do objeto antigo
if(guardarachadotip === "entrada"){
numeroanterior -= guardarachadoquant
totalentradas -= guardarachadoquant
}else if(guardarachadotip === "saida"){
numeroanterior  += guardarachadoquant
totalsaidas -= guardarachadoquant
}
let novovalor = Number(elementos.Numeroadd.value)
let novotipo = elementos.tipotransaction.value
if(novotipo === "entrada"){
numeroanterior += novovalor
totalentradas+= novovalor
}else if(novotipo=== "saida"){
numeroanterior -= novovalor
totalsaidas += novovalor
}
elementos.saldo.textContent=`R$:${numeroanterior}`
elementos.entradas.textContent=`R$:${totalentradas}`
elementos.saidas.textContent=`R$:${totalsaidas}`
console.log(guardarachadotip)
console.log(guardarachadoquant)

guardarachado.Description = elementos.Descricao.value
guardarachado.quantidade = elementos.Numeroadd.value
guardarachado.tiptransaction = elementos.tipotransaction.value
// CORRIGIDO: removi "description1.textContent = ..." (description1 não existe nesse ponto)
descricaoEditada.textContent = elementos.Descricao.value
valorEditado.classList.remove('entrada','saida') // CORRIGIDO: tira a classe antiga
if(elementos.tipotransaction.value === "entrada"){//vai adicionar a classe ao texto 2 pra estilizar o numero
valorEditado.classList.add('entrada') 
valorEditado.textContent = `+R$: ${elementos.Numeroadd.value}` 
}
if(elementos.tipotransaction.value === "saida"){// vai adicionar a classe ao texto 2 e estilizar o numero com negativo
valorEditado.classList.add("saida") 
valorEditado.textContent = `-R$: ${elementos.Numeroadd.value}` 
}
editando = false
return
}else{
identificador++
//Criei os elementos das entradas de dinheiro a descrição quanto de dinheiro e o tipodetransação
elements.push({
Description:elementos.Descricao.value,
quantidade:elementos.Numeroadd.value,
tiptransaction:elementos.tipotransaction.value,
id:identificador
})
}
//Parte da criação do painel
let soma
numeroproximo = Number(elementos.Numeroadd.value)
console.log("Saldo anterior:", numeroanterior);
console.log("Valor da transação:", numeroproximo);
console.log("Tipo:", elementos.tipotransaction.value);
if(elementos.tipotransaction.value === "saida"){
soma = numeroanterior - numeroproximo
totalsaidas += numeroproximo
elementos.saidas.textContent =`R$:${totalsaidas}`
}else{
soma = numeroanterior + numeroproximo
totalentradas += numeroproximo
elementos.entradas.textContent=`R$:${totalentradas}`
}
numeroanterior = soma
elementos.saldo.textContent= `R$:${soma}`
console.log(`AQUI É A SOMA DO SALDO TOTAL ${soma} `)
console.log(`AQUI É A DIMINUIÇÃO DO SALDO TOTAL ${totalsaidas}`)
console.log(`AQUI É A SOMA DE TOTAL DE ENTRADAS QUE VAI DIMUNUIR DO SALDO TOTAL ${soma}`)
//PAREI POR AQUI
let iddatransacao = identificador
let list = elementos.Lista//Criei a Lista que vai ser o select pra entrar as tarefas
let card = document.createElement('div')//Criei um card que vai ser quando eu adicionar dinheiro
let transacaoatual = elements.find(item => item.id === iddatransacao)
console.log(transacaoatual)
transacaoatual.card = card
console.log(card)
list.appendChild(card)//coloquei card dentro da lista dos dinheiros
let description1 = descricaoachada 
description1.textContent = elementos.Descricao.value//Coloquei dentro do card da div um texto
card.appendChild(description1)
card.classList.add('transacao')//Coloquei uma Classe no elemento da div card pra as entradas e saídas de dinheiro
card.appendChild(text2)
if(elementos.tipotransaction.value === "entrada"){//vai adicionar a classe ao texto 2 pra estilizar o numero
text2.classList.add('entrada')
text2.textContent = `+R$: ${elementos.Numeroadd.value}`
}
if(elementos.tipotransaction.value === "saida"){// vai adicionar a classe ao texto 2 e estilizar o numero com negativo
text2.classList.add("saida")
text2.textContent = `-R$: ${elementos.Numeroadd.value}`
}
let botaoapagar = document.createElement('button')// criei o elemento da lixeira
card.appendChild(botaoapagar)// adicionei a lixeira dentro da div card
botaoapagar.textContent="🗑️"
botaoapagar.classList.add('btn-excluir')//adicionei a classe ao botão do apagar
botaoapagar.addEventListener("click",deletar)
console.log(numeroanterior)
console.log(totalentradas)
console.log(totalsaidas)
function deletar(){
let idexcluida = iddatransacao // Pega o id que foi excluido e adiciona na variavel
console.log(idexcluida)
let transacaoexcluida = elements.find(item => item.id === idexcluida) // peguei o Objeto do item excluido
console.log(transacaoexcluida) // console.log da transção que foi excluida o objeto
let numeroconvertapag = Number(transacaoexcluida.quantidade) // peguei o numero do objeto da excluida e converti em numero
if(transacaoexcluida.tiptransaction === "saida"){ // aqui vai diminuir do painel se a transação excluida foi de saida
totalsaidas -= numeroconvertapag  // diminui do painel das saidas
numeroanterior += numeroconvertapag // coloca o valor de volta no painel do total
}else{ // aqui vai diminuir se a transação excluida foi de entrada
numeroanterior -= numeroconvertapag // diminui do painel das somas
totalentradas -= numeroconvertapag  // diminui do painel do total das transações
}
elementos.saidas.textContent = `R$:${totalsaidas}`
elementos.saldo.textContent = `R$:${numeroanterior}`
elementos.entradas.textContent= `R$:${totalentradas}`
card.remove()
let mantidas =  elements.filter(mantaim => mantaim.id !== idexcluida)
elements = mantidas
}
console.log(elements)
let editar = document.createElement('button')//Criei o elemento do botão de editar
editar.textContent='✏️'//Adicionei o emoji de lapis no botao
editar.classList.add('btn-editar')//coloquei a classlist no botao
card.appendChild(editar)//coloquei o botao dentro da div que tem as infos
editar.addEventListener("click",edit)// quando clicar vai executar a função edit
let transacaoantedit // Criei uma variavel que vai guardar o objeto que foi clicado pra editar o objeto com as info antigas
function edit(){
editando = true // coloca a propriedade editar true
let iddoeditar = iddatransacao // acha o identificador do card que foi clicado
let achar = elements.find(item => item.id === iddoeditar) // pega somente o elemento que ta com o id igual do id que foi clicado
guardarachado = achar// guardar achado vai guardar o elemento achado e achar vai ser meu elemento editado
// bloco para modificar as informações antigas pelas novas 
descricaoEditada = description1
valorEditado = text2   
// Quando clica em editar ele ativa o modo edição e acha o objeto clicado e passa pro input 
elementos.Descricao.value = achar.Description
elementos.Numeroadd.value= achar.quantidade 
elementos.tipotransaction.value = achar.tiptransaction 
//agora elementos ja está com os novos resultados
}
}
// Criação dos Botões de filtro 
let filtrotodas= elementos.filtroall //Peguei o botão do filtro todas
let filtrosaidas = elementos.filtroclose// Peguei o Botão do filtro das saidas
let filtroentry = elementos.filtroentrada// Peguei o Botão do filtro das entradas
filtroentry.addEventListener('click',Positivas) //adicionei um evento para as entradas de click
filtrosaidas.addEventListener('click', Negativas) // adicionei um evento de saidas de click 7
filtrotodas.addEventListener('click', Todas)
function Positivas(){
let semnomenegatives = elements.filter(negat => negat.tiptransaction === "saida")
console.log(semnomenegatives)
elements.forEach(element => { 
if(element.tiptransaction === "saida"){
element.card.classList.add('escondido')
}else{
element.card.classList.remove('escondido')
}
});
}

function Negativas(){
let othernamepositives = elements.filter(posiv => posiv.tiptransaction === "entrada")
console.log(othernamepositives)
elements.forEach(element =>{
if(element.tiptransaction === "entrada"){
element.card.classList.add('escondido')
}else{
element.card.classList.remove('escondido')
}
})
}

function Todas(){
let tdj = elements.filter(all => all.tiptransaction === "entrada"|| all.tiptransaction === "saida")
console.log(tdj)
elements.forEach(element =>{
if(element.tiptransaction === "entrada"|| element.tiptransaction === "saida"){
element.card.classList.remove('escondido')
}
})
}

