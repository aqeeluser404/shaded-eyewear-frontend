<template>
  <div
    class="menu-wrapper relative-position"
    @mouseenter="hover ? open() : null"
    @mouseleave="hover ? delayedClose() : null"
  >
    <div class="menu-trigger" ref="triggerRef">
      <div @click.stop="hover ? null : toggle()">
        <slot name="trigger" />
      </div>
    </div>

    <q-menu
      v-model="isOpen"
      :target="triggerRef"
      :anchor="anchor"
      :self="self"
      :offset="offset"
      transition-show="jump-down"
      transition-hide="jump-up"
      @mouseenter="hover ? open() : null"
      @mouseleave="hover ? delayedClose() : null"
      class="universal-menu bg-dark"
    >
    <div class="row q-col-gutter-md q-pa-md">
      <!-- First column -->
      <div class="col">
        <q-list dense>
          <template v-for="(item, idx) in firstColumnItems" :key="'col1-' + idx">
            <q-item
              v-if="!item.hidden"
              clickable
              v-close-popup
              :disable="item.disabled"
              :class="item.negative ? 'text-negative' : ''"
              @click="handleAction(item)"
              class="nav-hover custom-button"
            >
              <q-item-section avatar v-if="item.icon">
                <q-icon
                  :name="item.icon"
                  size="xs"
                  :color="item.negative ? 'negative' : item.color || 'primary'"
                />
              </q-item-section>
              <q-item-section>{{ item.label }}</q-item-section>
            </q-item>
            <q-separator v-if="item.separatorAfter" />
          </template>
        </q-list>
      </div>

      <!-- Second column (only if items exist) -->
      <div class="col" v-if="secondColumnItems.length > 0">
        <q-list dense>
          <template v-for="(item, idx) in secondColumnItems" :key="'col2-' + idx">
            <q-item
              v-if="!item.hidden"
              clickable
              v-close-popup
              :disable="item.disabled"
              :class="item.negative ? 'text-negative' : ''"
              @click="handleAction(item)"
              class="nav-hover"
            >
              <q-item-section side v-if="item.icon">
                <q-icon
                  :name="item.icon"
                  size="xs"
                  :color="item.negative ? 'negative' : item.color || 'primary'"
                />
              </q-item-section>
              <q-item-section>{{ item.label }}</q-item-section>
            </q-item>
            <q-separator v-if="item.separatorAfter" />
          </template>
        </q-list>
      </div>
    </div>
    </q-menu>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'UniversalMenu',
  props: {
    items: { type: Array, required: true },
    hover: { type: Boolean, default: false },
    anchor: { type: String, default: 'bottom right' },
    self: { type: String, default: 'top right' },
    offset: { type: Array, default: () => [0, 8] }
  },
  setup() {
    const triggerRef = ref(null);
    return { triggerRef };
  },
  data() {
    return {
      isOpen: false,
      timeout: null
    };
  },
computed: {
  visibleItems() {
    return this.items.filter(item => !item.hidden);
  },
  firstColumnItems() {
    if (this.visibleItems.length < 6) {
      return this.visibleItems;
    }
    return this.visibleItems.slice(0, 5);
  },
  secondColumnItems() {
    if (this.visibleItems.length < 6) {
      return [];
    }
    return this.visibleItems.slice(5);
  }
},


  methods: {
    handleAction(item) {
      if (item.to) {
        this.$router.push(item.to);
      } else if (typeof item.handler === 'function') {
        item.handler();
      }
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
    open() {
      clearTimeout(this.timeout);
      this.isOpen = true;
    },
    delayedClose() {
      this.timeout = setTimeout(() => (this.isOpen = false), 150);
    }
  }
};
</script>

<style lang="sass">
.universal-menu
  border: 1px solid rgba(255, 255, 255, 0.12)
  border-radius: 12px
  overflow: hidden
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55)
  min-width: 220px
  background-color: #141414

  .q-list
    padding: 8px

  .q-item
    color: #e8e8e8
    min-height: 44px
    padding: 10px 12px
    border-radius: 8px
    transition: background-color 0.15s ease, color 0.15s ease

  .q-item + .q-item
    margin-top: 2px

  .q-item__label
    font-size: 0.875rem
    font-weight: 500
    letter-spacing: 0.01em

  .q-item__section--avatar,
  .q-item__section--side
    min-width: 32px

.nav-hover
  &:hover
    background-color: rgba(255, 255, 255, 0.08)
    color: #ffffff

.menu-trigger
  display: inline-block
</style>
