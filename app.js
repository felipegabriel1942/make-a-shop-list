/*********************************************************************************
 * DATA CONTROLLER
****************************************************************************/
let listController = (function() {
    let Item = function(id , descricao, value) {
        this.id = id;
        this.descricao = descricao;
        this.value = value;
    };

    let calculaValorTotalPorTipo = function(tipo) {
        let sum = 0;
        data.todosOsItens[tipo].forEach(function(current){
            sum += current.value;
        });

        data.totais[tipo] = sum;
        data.valorTotal += sum;
    }

    let data = {
        todosOsItens: {
            pad: [],
            hor: [],
            lim: [],
            hig: [],
            per: [],
            nper: [],
            beb: [],
            pap: []
        },
        totais: {
            pad: 0,
            hor: 0,
            lim: 0,
            hig: 0,
            per: 0,
            nper: 0,
            beb: 0,
            pap: 0
        },
        valorTotal: 0
    }

    return {
        adicionarItem: function(tipo, descricao, valor) {
            let novoItem, id;
            console.log(valor);    
            if (data.todosOsItens[tipo].length > 0) {
                id = data.todosOsItens[tipo][data.todosOsItens[tipo].length - 1].id + 1;
            } else {
                id = 0;
            }

            novoItem = new Item(id, descricao, valor);

            data.todosOsItens[tipo].push(novoItem);
            console.log(data.todosOsItens);
            return novoItem;
        },

        calcularValorTotalDaLista: function() {
            data.valorTotal = 0;
            calculaValorTotalPorTipo('pad');
            calculaValorTotalPorTipo('hor');
            calculaValorTotalPorTipo('lim');
            calculaValorTotalPorTipo('hig');
            calculaValorTotalPorTipo('per');
            calculaValorTotalPorTipo('nper');
            calculaValorTotalPorTipo('beb');
            calculaValorTotalPorTipo('pap');
        },

        getValores: function() {
            return {
                valorTotal: data.valorTotal
            }
        }
    }
})();


/*********************************************************************************
 * UI CONTROLLER
****************************************************************************/
let UIController = (function() {
    let DOMStrings = {
        inputTipo: '.add-tipo',
        inputBtnAdd: '.add-btn',
        inputDescricao: '.add-descricao',
        inputValor: '.add-valor',
        valorTotalLabel: '.valor-total-label'
    }

    

    return {

        addItemLista: function(obj, tipo) {
            console.log(tipo);
        },

        getInput: function() {
            return {
                tipo: document.querySelector(DOMStrings.inputTipo).value,
                descricao: document.querySelector(DOMStrings.inputDescricao).value,
                valor: parseFloat(document.querySelector(DOMStrings.inputValor).value),
            }
        },

        exibirValores: function(obj) {
            let tipo;
            document.querySelector(DOMStrings.valorTotalLabel).textContent = obj.valorTotal;
        },

        getDOMStrings: function() {
            return DOMStrings;
        }
    }
})();


/*********************************************************************************
 * GLOBAL CONTROLLER
****************************************************************************/
let controller = (function(litsCtrl, UICtrl) {
    let input, novoItem;

    let setupEventListeners = function() {
        let DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtnAdd).addEventListener('click', ctrlAdicionarItem);
    }

    let atualizarValores = function() {
        litsCtrl.calcularValorTotalDaLista();

        let valorTotal = litsCtrl.getValores();
        
        UICtrl.exibirValores(valorTotal);

    }

    let ctrlAdicionarItem = function() {
        input = UICtrl.getInput();

        if (input.descricao !== '' && !isNaN(input.valor) && input.valor > 0) {
            novoItem = listController.adicionarItem(input.tipo, input.descricao, input.valor);
        }

        atualizarValores();
    }
    
    return {
        init: function() {
            console.log('Aplicação iniciada');
            setupEventListeners();
        }
    }
})(listController, UIController);


controller.init();