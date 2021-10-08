const { Schema, model } = require('mongoose');

const PlaylistSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    playlist: Schema.Types.Mixed

})

module.exports = model('Playlist', PlaylistSchema);
