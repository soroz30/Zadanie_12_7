function Column(id, name) {
    var self = this;

    this.id = id;
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
        var $column = $('<div>').addClass('column');
        var $columnTitle = $('<h2>').addClass('column-title').text(self.name)
                                    .attr('contenteditable','true');
        var $columnCardList = $('<ul>').addClass('column-card-list');
        var $columnDelete = $('<button>').addClass('btn-delete').text('x');
        var $columnAddCard = $('<button>').addClass('add-card').text('Add a card...');

        $columnDelete.click(function() {
            $.ajax({
                url: baseUrl + '/column/' + self.id,
                method: 'DELETE',
                success: function(response) {
                    self.removeColumn();
                }
            });
        });

        $columnAddCard.click(function() {
            var cardName = prompt("Enter the name of the card");
            if (cardName) {
                $.ajax({
                    url: baseUrl + '/card',
                    method: 'POST',
                    data: {
                        name: cardName,
                        bootcamp_kanban_column_id: self.id
                    },
                    success: function(response) {
                        var card = new Card(response.id, cardName);
                        self.addCard(card);
                    }
                });
            }
        });

        $columnTitle.on('keypress', function(e) {
            checkForEnter(e);
        });

        $columnTitle.on('focusout', function() {
            $.ajax({
                url: baseUrl + '/column/' + self.id,
                method: 'PUT',
                data: {
                    name: $(this).text()
                }
            });
        });

        $columnCardList.on('sortreceive', function(event, ui) {
            $.ajax({
                url: baseUrl + '/card/' + ui.item.attr('data-id'),
                method: 'PUT',
                data: {
                    name: ui.item.find('p').text(),
                    bootcamp_kanban_column_id: self.id
                }
            });
        });

        $column.append($columnTitle)
               .append($columnAddCard)
               .append($columnDelete)
               .append($columnCardList);

        return $column;
    }
}

Column.prototype = {
    addCard: function(card) {
        this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
        this.$element.remove();
    }
};