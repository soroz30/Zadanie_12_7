function Card(id, name, bootcamp_kanban_column_id) {
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.$element = createCard();
    this.bootcamp_kanban_column_id = bootcamp_kanban_column_id;

    function createCard() {
        var $card = $('<li>').addClass('card').attr('data-id', self.id);
        var $cardDescription = $('<p>').addClass('card-description').text(self.name)
                                       .attr('contenteditable','true');
        var $cardDelete = $('<button>').addClass('btn-delete').text('x');

        $cardDelete.click(function(){
            $.ajax({
                url: baseUrl + '/card/' + self.id,
                method: 'DELETE',
                success: function() {
                    self.removeCard();
                }
            });
        });

        $cardDescription.on('click', function() {
            $(this).focus();
        });

        $cardDescription.on('mousedown', function() {
            $(this).css('cursor', 'default');
        });

        $cardDescription.on('mouseup', function() {
            $(this).css('cursor', 'auto');
        });

        $cardDescription.on('keypress', function(e) {
            checkForEnter(e);
        });

        $cardDescription.on('focusout', function() {
            $.ajax({
                url: baseUrl + '/card/' + self.id,
                method: 'PUT',
                data: {
                    name: $(this).text(),
                    bootcamp_kanban_column_id: self.bootcamp_kanban_column_id
                }
            });
        });

        $card.append($cardDescription)
             .append($cardDelete);

        return $card;
    }
}

Card.prototype = {
    removeCard: function() {
        this.$element.remove();
    }
};