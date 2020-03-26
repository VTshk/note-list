import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: JSON.parse(localStorage.getItem('notes') || '[]'),
    editableNote: JSON.parse(localStorage.getItem('editableNote') || '{}'),
  },
  mutations: {
    addNote(state, note) {
      state.notes.unshift(note);
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
    editNote(state, newNote) {
      const notes = state.notes.concat();
      const idx = notes.findIndex((n) => n.id === newNote.id);
      notes[idx] = newNote;
      state.notes = notes;
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
    setEditableNote(state, note) {
      state.editableNote = JSON.parse(JSON.stringify(note));
      localStorage.setItem('editableNote', JSON.stringify(state.editableNote));
    },
    deleteNote(state, id) {
      state.notes = state.notes.filter((note) => note.id !== id);
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
  },
  actions: {
    addNote({ commit }, note) {
      commit('addNote', note);
    },
    editNote({ commit }, newNote) {
      commit('editNote', newNote);
    },
    setEditableNote({ commit }, note) {
      commit('setEditableNote', note);
    },
    deleteNote({ commit }, id) {
      commit('deleteNote', id);
    },
  },
  getters: {
    notes: (s) => s.notes,
    editableNote: (s) => s.editableNote,
  },
});
