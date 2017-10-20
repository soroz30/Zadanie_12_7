var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '2401',
    'X-Auth-Token': '1f4193d9f18985642fa4af81b32e50e6'
};

function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
    var str = '', i;
    for (i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function checkForEnter(e) {
    var self = e.target;
    if (e.which === 13) {
        $(self).trigger('focusout');
        $(self).blur();
        window.getSelection().removeAllRanges();
    }
}

$('.create-board').click(function() {
    var boardName = prompt('Enter a board name');
    if (boardName) {
        var board = new Board(boardName, randomString());
        $('#main').append(board.$element);
    }
});

function setupCards(col, cards) {
    cards.forEach(function(card) {
        var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
        col.addCard(card);
    });
}

function setupColumns(board, columns) {
    columns.forEach(function(column) {
        var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

$.ajaxSetup({
    headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
        var board = new Board(response.name, response.id);
        $('#main').append(board.$element);
        setupColumns(board, response.columns);
    }
});