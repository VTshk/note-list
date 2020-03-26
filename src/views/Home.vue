<template>
  <div class="home">
    <div class="header">
      <h1>Список заметок</h1>
      <button @click="createNote()">Создать заметку</button>
    </div>
    <hr />
    <div class="noteList">
      <div class="emptyList" v-if="!notes.length">Список заметок пуст</div>
      <div v-for="note in notes" :key="note.id" class="note">
        <div class="noteHeader">
          <div class="noteName">
            <h2>{{note.name}}</h2>
          </div>
          <div class="icon">
            <i title="Редактировать заметку" @click="editNote(note)" class="mdi mdi-pencil"></i>
            <i title="Удалить заметку" @click="confrimDialog(note.id)" class="mdi mdi-delete"></i>
          </div>
        </div>

        <div class="todoList">
          <div
            v-for="todo in todoShown.includes(note.id) ? note.todos : note.todos.slice(0, 3)"
            :key="todo.id"
            class="todo"
          >
            <input disabled type="checkbox" :checked="todo.select" />
            <span>{{todo.text}}</span>
          </div>
        </div>
        <div
          @click="showTodo(note.id)"
          v-if="note.todos.length>3"
          class="showMore"
        >{{todoShown.includes(note.id)?'Скрыть':'Показать еще'}}</div>
      </div>
    </div>
    <Modal
      :message="message"
      :action="() => action()"
      v-if="dialog"
      @closeDialog="dialog = $event"
    />
  </div>
</template>

<script>
import Modal from '../components/Modal.vue';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      todoShown: [],
      dialog: false,
      message: '',
      action: null,
    };
  },

  computed: {
    notes() {
      return this.$store.getters.notes;
    },
  },

  methods: {
    createNote() {
      this.$store.dispatch('setEditableNote', { name: '', todos: [] });
      this.$router.push('NoteForm');
    },
    editNote(note) {
      this.$store.dispatch('setEditableNote', note);
      this.$router.push('NoteForm');
    },
    deleteNote(id) {
      this.$store.dispatch('deleteNote', id);
      this.dialog = false;
    },
    confrimDialog(id) {
      this.message = 'удалить заметку';
      this.action = () => this.deleteNote(id);
      this.dialog = true;
    },
    showTodo(id) {
      if (this.todoShown.includes(id)) {
        this.todoShown = this.todoShown.filter((t) => t !== id);
      } else {
        this.todoShown.push(id);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.home
  margin: 50px auto
  width: calc( 160px + 35vw )
  background: white
  padding: 20px
  border-radius: 5px
  .header
    display: flex
    justify-content: space-between
    align-items: center
  .noteList
    .emptyList
      text-align: center
      padding: 7px 0
      margin-top: 10px
      color: #757575
    .note
      border: 1px solid #a5a5a5
      margin-top: 20px
      border-radius: 5px
      padding: 0 12px
      .noteHeader
        display: flex
        align-items: center
        justify-content: space-between
        border-bottom: 1px solid #dddddd
        padding: 12px 0
        .noteName
          overflow: auto
          flex-basis: 90%
        .icon
          display: flex
          flex-basis: 10%
          i
            font-size: 24px
            margin-left: 12px
            cursor: pointer
      .todoList
        margin: 12px
        .todo
          display: flex
          align-items: center
          margin-bottom: 12px
          span
            overflow: auto
          input
            margin-right: 12px
            transform: scale(1.3)
      .showMore
        text-align: center
        border-top: 1px solid #dddddd
        padding: 6px 0
        cursor: pointer
        border-radius: 3px
        &:hover
          background: #dedede
</style>
