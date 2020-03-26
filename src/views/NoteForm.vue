<template>
  <div>
    <div class="form">
      <div class="header">
        <h1>{{editableNote.id?'Редактировать':'Создать'}} заметку</h1>
        <div class="icon">
          <i
            @click="discardChange"
            title="Отменить внесенное изменение"
            class="mdi mdi-rotate-left"
            :class="{'disabled':currentVersionIndex === 0}"
          ></i>
          <i
            @click="cancelDiscardChange"
            title="Вернуть отмененное изменение"
            class="mdi mdi-rotate-right"
            :class="{'disabled':currentVersionIndex === versions.length-1}"
          ></i>
        </div>
      </div>
      <hr />
      <div class="noteName">
        <span>Название заметки:</span>
        <input
          @change="addVersion()"
          maxlength="35"
          placeholder="Введите название"
          v-model="note.name"
          type="text"
        />
      </div>
      <hr />
      <div class="todoList">
        <div class="todoListHeader">
          <h2>Задачи</h2>
          <button @click="createTodo">Добавить задачу</button>
        </div>
        <div class="emptyList" v-if="!note.todos.length">Список задач пуст</div>
        <div v-for="todo in note.todos" :key="todo.id" class="todo">
          <input @change="addVersion()" class="check" type="checkbox" v-model="todo.select" />
          <input
            @change="addVersion()"
            maxlength="50"
            placeholder="Введите текст"
            class="text"
            type="text"
            v-model="todo.text"
          />
          <i @click="deleteTodo(todo.id)" title="Удалить задачу" class="mdi mdi-close"></i>
        </div>
      </div>
      <hr />
      <div class="footer">
        <button @click="confrimDialog()">Отменить</button>
        <i
          @click="confrimDialog(editableNote.id)"
          v-if="editableNote.id"
          title="Удалить заметку"
          class="mdi mdi-delete"
        ></i>
        <button @click="addNote">Принять</button>
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
      note: {},
      dialog: false,
      message: '',
      action: null,
      currentVersionIndex: 0,
      versions: [],
    };
  },

  computed: {
    editableNote() {
      return this.$store.getters.editableNote;
    },
  },

  watch: {
    currentVersionIndex() {
      this.note = JSON.parse(JSON.stringify(this.versions[this.currentVersionIndex]));
    },
  },

  methods: {
    createTodo() {
      const newTodo = {
        select: false,
        text: '',
        id: Date.now(),
      };
      this.note.todos.push(newTodo);
      this.addVersion();
    },
    addNote() {
      const newNote = {
        name: this.note.name || 'Без названия',
        todos: this.note.todos.map((t) => {
          if (!t.text.length) {
            return {
              ...t,
              text: 'Без названия',
            };
          }
          return t;
        }),
        id: this.editableNote.id || Date.now(),
      };
      if (this.editableNote.id) {
        this.$store.dispatch('editNote', newNote);
      } else {
        this.$store.dispatch('addNote', newNote);
      }
      this.$router.push('/');
    },
    deleteTodo(id) {
      this.note.todos = this.note.todos.filter((todo) => todo.id !== id);
      this.addVersion();
    },
    cancel() {
      this.$router.push('/');
    },
    discardChange() {
      if (this.currentVersionIndex > 0) {
        this.currentVersionIndex -= 1;
      }
    },
    cancelDiscardChange() {
      if (this.currentVersionIndex < this.versions.length - 1) {
        this.currentVersionIndex += 1;
      }
    },
    deleteNote(id) {
      this.$store.dispatch('deleteNote', id);
      this.cancel();
    },
    confrimDialog(id) {
      if (id) {
        this.message = 'удалить заметку';
        this.action = () => this.deleteNote(id);
      } else {
        this.message = 'выйти';
        this.action = () => this.cancel();
      }
      this.dialog = true;
    },
    addVersion() {
      if (this.versions.length === 6) {
        if (this.currentVersionIndex !== this.versions.length - 1) {
          this.versions = this.versions.slice(0, this.currentVersionIndex);
        } else {
          this.versions.shift();
        }
      } else {
        this.currentVersionIndex += 1;
      }
      this.versions.push(JSON.parse(JSON.stringify(this.note)));
    },
  },
  created() {
    this.note = JSON.parse(JSON.stringify(this.editableNote));
    this.versions.push(JSON.parse(JSON.stringify(this.note)));
  },
};
</script>

<style lang="sass" scoped>
  .form
    background: white
    border-radius: 5px
    width: calc( 160px + 30vw )
    margin: 50px auto
    padding: 18px 24px
    .header
      display: flex
      align-items: center
      justify-content: space-between
      .icon
        margin-top: 6px
        i
          padding: 6px
          font-size: 28px
    .noteName
      display: flex
      align-items: center
      padding: 6px 0
      input
        width: 65%
      span
        width: 35%
        margin-right: 12px
    .todoList
      margin: 20px 0
      .todoListHeader
        display: flex
        justify-content: space-between
      .emptyList
        text-align: center
        padding: 7px 0
        margin-top: 10px
        color: #757575
      .todo
        margin-top: 12px
        display: flex
        align-items: center
        .text
          width: 100%
    i
      margin-left: 6px
    .footer
      height: 20px
      display: flex
      align-items: center
      justify-content: space-between
      padding: 12px 0

  .check
    margin-right: 12px
    transform: scale(1.3)
    cursor: pointer

  .disabled
    color: #a5a5a5
    cursor: default
    &:hover
      background: white
</style>
