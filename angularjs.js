angular.module("graficos", ['googlechart']);
angular.module("graficos").controller("graficosCtrl", function($scope){
    $scope.app = "Dashboard";
    $scope.meses = [
        {nome: "JANEIRO", codigo: 1},
        {nome: "FEVEREIRO", codigo: 2},
        {nome: "MARÇO", codigo: 3},
        {nome: "ABRIL", codigo: 4},
        {nome: "MAIO", codigo: 5},
        {nome: "JUNHO", codigo: 6},
        {nome: "JULHO", codigo: 7},
        {nome: "AGOSTO", codigo: 8},
        {nome: "SETEMBRO", codigo: 9},
        {nome: "OUTUBRO", codigo: 10},
        {nome: "NOVEMBRO", codigo: 11},
        {nome: "DEZEMBRO", codigo: 12}
    ];
    $scope.contatos = [
      {razao: "Fernando-me", fantasia: "Fernando", versao: {numero: "2.0.30.0"}, data: new Date(), situacao:{nome: "Sucesso"}},
      {razao: "Elton-me", fantasia: "Elton", versao: {numero: "3.1.3.17"}, data: new Date(), situacao: {nome: "Falha"}},
      {razao: "Romario-me", fantasia: "Romário", versao: {numero: "17.1.2.9"}, data: new Date(), situacao:{nome: "Sucesso"}},
      {razao: "Ronaldo-me", fantasia: "Ronaldo", versao: {numero: "1.0.5.7"}, data: new Date(), situacao:{nome: "Sucesso"}}
    ];
    $scope.situacao = [
      {nome: "Sucesso"},
      {nome: "Falha"}
    ];
    $scope.versao = [
      {numero: "2.0.30.0"},
      {numero: "3.1.3.17"},
      {numero: "17.1.2.9"},
      {numero: "4.0.2.9"},
      {numero: "1.0.5.7"}
    ];
    
    $scope.myChartObject = {
        type: "ColumnChart",
        displayed: false,
        data: {
          cols: [
            {
              id: "versao-id",
              label: "versao",
              type: "string",
              "p": {}
            },
            {
              id: "sucessos-id",
              label: "Sucesso",
              type: "number",
              "p": {}
            },
            {
              id: "falhas-id",
              label: "Falhas",
              type: "number",
              "p": {},
            }            
          ],
          rows: [
            {
              c: [
                {
                  v: "1"
                },
                {
                  v: 19
                  
                },
                {
                  v: 12
                  
                },
                null
              ]
            },
            {
              c: [
                {
                  v: "2"
                },
                {
                  v: 13
                },
                {
                  v: 6
                  
                },
                null
              ]
            },
            {
                c: [
                  {
                    v: "3"
                  },
                  {
                    v: 26
                  },
                  {
                    v: 20
                    
                  },
                  null
                ]
              },
            {
              c: [
                {
                  v: "4"
                },
                {
                  v: 24
                },
                {
                  v: 5
                },
                null
              ]
            }
          ]
        },
        options: {
         isStacked: "percent",
          fill: 20,
          legend: {position: 'top'},
          displayExactValues: true,
          vAxis: {
            gridlines: {
              count: 10
            }
          },
          tooltip: {
            isHtml: false
          }
        },
        formatters: {},
        view: {}
      };
      
      $scope.seriesSelected = function (selectedItem) {
        console.log('item selected');
        console.log(selectedItem);
        if(selectedItem.row === 0 && selectedItem.column === 1){
          console.log("Sucessos", $scope.myChartObject.data.rows[0].c[1]);
        }
        else if(selectedItem.row === 0 && selectedItem.column === 2){
          console.log("Falhas", $scope.myChartObject.data.rows[0].c[2]);

        }
        else if(selectedItem.row === 1 && selectedItem.column === 1){
          console.log("Sucessos", $scope.myChartObject.data.rows[1].c[1]);
        }
        else if(selectedItem.row === 1 && selectedItem.column === 2){
          console.log("Falhas", $scope.myChartObject.data.rows[1].c[2]);

        }
        else if(selectedItem.row === 2 && selectedItem.column === 1){
          console.log("Sucessos", $scope.myChartObject.data.rows[2].c[1]);
        }
        else if(selectedItem.row === 2 && selectedItem.column === 2){
          console.log("Falhas", $scope.myChartObject.data.rows[2].c[2]);
        }
        else if(selectedItem.row === 3 && selectedItem.column === 1){
          console.log("Sucessos", $scope.myChartObject.data.rows[3].c[1]);
        }
        else{
          console.log("Falhas", $scope.myChartObject.data.rows[3].c[2]);
        }
    }
});
