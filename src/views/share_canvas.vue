<template>
  <div id="share_canvas">
    <canvas
      id="canvas"
      class="border-2"
      style="width: 1000px; height: 1000px"
    ></canvas>
    <button @click="change_text">click</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exampleContent: "This is TEXT",
    };
  },
  methods: {
    updateCanvas: function () {
      var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.font = "20px Georgia";
      ctx.fillText(this.exampleContent, 10, 50);

      make_base();

      function make_base() {
        base_image = new Image();
        base_image.src = "../assets/cdu.png";
        base_image.onload = function () {
          ctx.drawImage(base_image, 0, 0, 200, 200);
        };
      }
    },
    change_text() {
      this.exampleContent = "Hallo";
    },
  },
  watch: {
    exampleContent: function (val, oldVal) {
      this.updateCanvas();
    },
  },
  mounted: function () {
    this.updateCanvas();
  },
};
</script>
