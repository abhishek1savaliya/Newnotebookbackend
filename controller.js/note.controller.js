const Note = require("../models/Note");
const { encrypt, KEY, decrypt } = require("../utils/encode");

exports.addNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const note = new Note({
            title: encrypt(title, KEY),
            description: encrypt(description, KEY),
            tag: encrypt(tag, KEY),
            user: req.user.id
        });

        const saveNote = await note.save();
        res.json(saveNote);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAllNote = async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id });

        const decryptedNotes = notes.map(note => ({
            id: note._id,
            title: decrypt(note.title, KEY),
            description: decrypt(note.description, KEY),
            tag: decrypt(note.tag, KEY),
            date: note.date
        }));

        res.json(decryptedNotes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

exports.getNoteById = async (req, res) => {

    try {

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        res.json({
            id: note._id,
            title: decrypt(note.title, KEY),
            description: decrypt(note.description, KEY),
            tag: decrypt(note.tag, KEY),
            date: note.date
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateNote = async (req, res) => {
    const { title, description, tag } = req.body;

    try {

        const newNote = {};
        if (title) { newNote.title = encrypt(title, KEY); }
        if (description) { newNote.description = encrypt(description, KEY); }
        if (tag) { newNote.tag = encrypt(tag, KEY); }

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteNote = async (req, res) => {
    try {

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not Found");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ Success: "Note has been deleted", note: note });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error")
    }
}


