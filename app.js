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
                valorTotal: data.valorTotal,
                valorTotalPadaria: data.totais['pad'],
                valorTotalHortifruti: data.totais['hor'],
                valorTotalLimpeza: data.totais['lim'],
                valorTotalHigiene: data.totais['hig'],
                valorTotalPereciveis: data.totais['per'],
                valorTotalNPereciveis: data.totais['nper'],
                valorTotalBebidas: data.totais['beb'],
                valorTotalPapelaria: data.totais['pap'],
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
        valorTotalLabel: '.valor-total-label',
        valorTotalPadariaLabel: '.valor-total-padaria-label',
        valorTotalHortifrutiLabel: '.valor-total-hortifruti-label',
        valorTotalHigieneLabel: '.valor-total-higiene-label',
        valorTotalLimpezaLabel: '.valor-total-limpeza-label',
        valorTotalPereciveisLabel: '.valor-total-pereciveis-label',
        valorTotalNPereciveisLabel: '.valor-total-nao-pereciveis-label',
        valorTotalBebidasLabel: '.valor-total-bebidas-label',
        valorTotalPapelariaLabel: '.valor-total-papelaria-label',
        listaComprasContainer: '.lista-compras-container'
    }

    let formatNumber = function(num) {

        let numSplit, int, dec;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1];

        return 'R$ ' + int + '.' + dec;
    }

    

    return {

        addItemLista: function(obj, tipo) {
            let html, newHtml, element;

            element = DOMStrings.listaComprasContainer;
            html = '<div class="row" style="border-bottom: 1px solid rgba(0, 0, 0, 0.25)" id="%id%">' +
                '<div class="col-3 px-0">' +
                    '<div style="font-size: 14px;">%tipoDeProduto%</div>' +
                '</div>' +
                '<div class="col-4 px-0">' +
                    '<div style="font-size: 14px;">%descricao%</div>' +
                '</div>' +
                '<div class="col-3 px-0">' +
                    '<div style="font-size: 14px;">%valor%</div>' +
                '</div>' +
                '<div class="col-2 px-0">' +
                    '<button class="btn btn-sm col-sm-12 py-0" >' +
                        '<img src="img/excluir.png" width="25" height="25" >' +
                    '</button>' +
                '</div>' +
            '</div>'

            newHtml = html.replace('%id%', tipo + obj.id);
            newHtml = newHtml.replace('%tipoDeProduto%', tipo);
            newHtml = newHtml.replace('%descricao%', obj.descricao);
            newHtml = newHtml.replace('%valor%', formatNumber(obj.value));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        getInput: function() {
            return {
                tipo: document.querySelector(DOMStrings.inputTipo).value,
                descricao: document.querySelector(DOMStrings.inputDescricao).value,
                valor: parseFloat(document.querySelector(DOMStrings.inputValor).value),
            }
        },

        exibirValores: function(obj) {
            document.querySelector(DOMStrings.valorTotalLabel).textContent = formatNumber(obj.valorTotal);
            document.querySelector(DOMStrings.valorTotalPadariaLabel).textContent = formatNumber(obj.valorTotalPadaria);
            document.querySelector(DOMStrings.valorTotalHortifrutiLabel).textContent = formatNumber(obj.valorTotalHortifruti);
            document.querySelector(DOMStrings.valorTotalHigieneLabel).textContent = formatNumber(obj.valorTotalHigiene);
            document.querySelector(DOMStrings.valorTotalLimpezaLabel).textContent = formatNumber(obj.valorTotalLimpeza);
            document.querySelector(DOMStrings.valorTotalPereciveisLabel).textContent = formatNumber(obj.valorTotalPereciveis);
            document.querySelector(DOMStrings.valorTotalNPereciveisLabel).textContent = formatNumber(obj.valorTotalNPereciveis);
            document.querySelector(DOMStrings.valorTotalBebidasLabel).textContent = formatNumber(obj.valorTotalBebidas);
            document.querySelector(DOMStrings.valorTotalPapelariaLabel).textContent = formatNumber(obj.valorTotalPapelaria);
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

            UIController.addItemLista(novoItem, input.tipo);
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