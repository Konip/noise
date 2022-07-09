import PlaylistModel from '../models/playlist-models';

interface Iclone {
    [key: string]: object
}

class PlaylistService {
    async createPlaylist(playlist: any, id: string) {
        const user = await PlaylistModel.findOne({ user: id });
        let key = Object.keys(playlist)[0];

        let playlistData;
        if (!user) {
            return await PlaylistModel.create({ user: id, playlist });
        } else if (user.playlist[key]) {

            user.playlist[key] = playlist[key];
            user.markModified(`playlist.${key}`);
            playlistData = await user.save();
        } else {
            user.playlist[key] = playlist[key];
            user.markModified(`playlist.${key}`);
            playlistData = await user.save();
        }

        return playlistData
    }

    async getPlaylist(id: string) {
        const playlist = await PlaylistModel.findOne({ user: id });
        return playlist
    }

    async renamePlaylist(id: string, currentName: string, newName: string) {
        const user = await PlaylistModel.findOne({ user: id });
        const clone: Iclone = {};
        let key
        for (key in user.playlist) {
            if (user.playlist.hasOwnProperty(key) && key !== currentName) {
                clone[key] = user.playlist[key];
            } else clone[newName] = user.playlist[key];
        }

        PlaylistModel.updateOne({ user: id }, { playlist: clone }, {},
            (err: any, ac: any) => {
                if (err) console.log(err);
            })
        return clone
    }

    async deletePlaylist(id: string, name: string) {
        let res = await PlaylistModel.findOneAndUpdate({ user: id },
            { $unset: { [`playlist.${name}`]: "" } },
            { new: true },
            (err: any, ac: any) => {
                if (err) console.log(err);
            })
        return res.playlist
    }
}

export = new PlaylistService();