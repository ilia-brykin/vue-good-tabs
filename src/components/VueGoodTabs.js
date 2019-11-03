export default {
  name: "VueGooDTabs",
  props: {
    list: {
      type: Array,
      required: true,
    },
    change: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      tabActiveId: undefined,
    };
  },
  methods: {
    initTabActiveId() {
      this.list.forEach(item => {
        if (item.active) {
          this.tabActiveId = item.id;
          return false;
        }
      });
      if (this.tabActiveId === undefined) {
        this.tabActiveId = this.list[0].id;
      }
    },

    onChangeTab(event, item) {
      if (this.tabActiveId === item.id) {
        return;
      }
      this.tabActiveId = item.id;
      this.change({ event, tab: item });
    },
  },
  computed: {
    getTabId() {
      return id => `tab_${ id }`;
    },
    getContentId() {
      return id => `content_${ id }`;
    },

    getAriaSelected() {
      return id => this.tabActiveId === id + "";
    },
  },
  created() {
    this.initTabActiveId();
  },
};
