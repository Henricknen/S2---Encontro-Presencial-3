function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('endereco').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('estado').value=("");
    document.getElementById('ibge').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('endereco').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('estado').value=(conteudo.uf);
    document.getElementById('ibge').value=(conteudo.ibge);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisa_cep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('endereco').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('estado').value="...";
        document.getElementById('ibge').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};

    function validarNome(){
        try {
            let nome = document.getElementById('nome').value;
            let re = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
            
            if(!re.test(nome)){
                //se campo inválido, retorna false para o formulário não ser enviado
                alert('Nome Inválido');
                document.form.nome.focus();
                return false
            }
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    function validarCPF(){
        var cpf = document.getElementById('cpf').value;

        if(typeof cpf !== "string") return false;
        cpf = cpf.replace(/[\s.-]*/igm,'');
        if(!cpf ||
            cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999" 
        ){
            return false;
        }
        var soma = 0;
        var resto 

        for(var i =1; i <=9; i++)
            soma = soma + parseInt(cpf.substring(i-1,i)) * (11 -i);
        resto = (soma * 10) % 11;
        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(cpf.substring(9,10))) return false;
        soma = 0;

        for(var i = 1; i <= 10; i++)
            soma = soma + parseInt(cpf.substring(i-1, i)) * (12 -i);
        resto = (soma * 10) % 11;
        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto !=parseInt(cpf.substring(10,11))) return false;
        return true; 

}         
function confereCPF(){
    const valido = validarCPF()
    if(!valido){
        alert("CPF Inválido!");
        document.form.cpf.focus();
    }
    return valido;   

}

function gerar_json(form){
    var nome = form.nome.value;
    var cpf = form.cpf.value;
    var telefone_res = form.telefone_res.value;
    var telefone_cel = form.telefone_cel.value;
    var cep = form.cep.value;
    var endereco = form.endereco.value;
    var numero = form.numero.value;
    var bairro = form.bairro.value;
    var cidade = form.cidade.value;
    var estado = form.estado.value;
    var ibge = form.ibge.value;
    
    var dados = {nome, cpf, telefone_res, telefone_cel, cep, endereco, numero, bairro, cidade, estado, ibge}

    var formularioValido = validarNome() && confereCPF();

    if(formularioValido){
        document.write("<h2>Retorno em json</h2>");
        document.write(JSON.stringify (dados, null, '<br>'));
    }else{
        alert ("Preencha  todos os campos de forma correta, não deixe nenhum campo sem preenchimento");
        document.form.focus ()
    }
}


//mascaras
$(function(){
    $(".cpf_mask").mask('999.999.999-99');
    $(".tel_res_mask").mask('(99)9999-9999');
    $(".tel_res_mask").mask('(99)99999-9999');
    $(".cep_mask").mask('99999-999');
});