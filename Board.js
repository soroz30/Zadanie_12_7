function Board(name, id) {
    var self = this;

    this.name = name;
    this.$element = createBoard();
    this.id = id;

    function createBoard() {
        var $board = $('<div>').addClass('board');
        var $boardTitle = $('<h1>').text(self.name);
        var $boardDelete = $('<button>').addClass('btn-delete').text('x');
        var $boardAddColumn = $('<button>').addClass('create-column').text('Add a column');
        var $boardColumnContainer = $('<div>').addClass('column-container');

        $boardAddColumn.click(function() {
            var columnName = prompt('Enter the name of the column');
            if (columnName) {
                $.ajax({
                    url: baseUrl + '/column',
                    method: 'POST',
                    data: {
                        name: columnName
                    },
                    success: function(response) {
                        var column = new Column(response.id, columnName);
                        self.addColumn(column);
                    }
                });
            }
        });

        $boardDelete.click(function() {
            self.removeBoard();
        });

        $board.append($boardTitle)
              .append($boardDelete)
              .append($boardAddColumn)
              .append($boardColumnContainer);

        return $board;
    }
}

Board.prototype = {
    addColumn: function(column) {
        this.$element.children('.column-container').append(column.$element);
        initSortable();
    },
    removeBoard: function() {
        this.$element.remove();
    }
};

function initSortable() {
    $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: 'card-placeholder'
    }).disableSelection();
}