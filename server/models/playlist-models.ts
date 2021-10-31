import { model, Schema } from 'mongoose';

const PlaylistSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    playlist: Schema.Types.Mixed

})

export = model('Playlist', PlaylistSchema);
