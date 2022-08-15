var mongoose = require('mongoose');
mongoose.set('debug', true);
var autoIncrement = require("mongoose-auto-increment");

const eldermonkmsgSchema = new mongoose.Schema(
{
    payload:
    {
        type: Object,
        index: true,
    },
    status:
    {
        type: String,
        enum: ['read', 'sent', 'delivered'],
        default: 'sent'

    },
    type:
    {
        type: String,
        enum: ['typing', 'html', 'audio', 'video', 'string'],
        default: 'typing'
    },
    stage:
    {
        type: String,
        enum: ['saved', 'unsaved'],
        default: 'unsaved'
    },
    scrollHeight:
    {

        type: String,
        default: '0'
    },
    created_at:
    {
        type: Date,
        default: Date.now
    }

},
{
    strict: true
});
eldermonkmsgSchema.plugin(autoIncrement.plugin,
{
    model: 'eldermonkmsg',
    field: 'id',
    startAt: 1

});
module.exports = eldermonkmsgSchema;