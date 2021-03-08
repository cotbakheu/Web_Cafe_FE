import Swal from 'sweetalert2';

export const cafeMixins = {
  data() {
    return {
        teslain: 'tes mixin',
        toggleSidebar: true,
    };
  },
  methods: {
    swalAlert(title, text, icon) {
       Swal.fire({
            icon,
            title,
            text,
          })
    alert(title + text + icon)
    },
    swalPop(title, text, icon) {
        Swal.fire({
            icon,
            title,
            text,
          })
    },
    swalConfirm(title, text, icon) {
      return new Promise((resolve) => {
        Swal.fire({
          title,
          text,
          icon,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.isConfirmed) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    },
    linkTo (route) {
        this.$router.push(`/${route}`)
    },
    onToggle () {
      this.toggleSidebar = !this.toggleSidebar
    }
  },
};
