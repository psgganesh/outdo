<template>
  <va-row>
    <va-column :xs="12" :sm="12" :md="12" :lg="12">
      <div style="margin:20px 0px;text-align: -webkit-center;">
        <canvas ref="can" width="800" height="600" style="border: 1px dashed #ccc;" />
      </div>
    </va-column>
  </va-row>
</template>

<script>
import { fabric } from 'fabric'

export default {
  name: 'Builder',

  data () {
    return {
      x: null,
      y: null,
      rect: null,
      started: false,
      gutter: 25,
      size: 'lg',
      canvasObjects: []
    }
  },

  mounted () {
    const ref = this.$refs.can
    const canvas = new fabric.Canvas(ref)

    canvas.setBackgroundImage('https://outdo.test/test/1.png', canvas.renderAll.bind(canvas))

    canvas.on('mouse:down', function (options) {
      if (canvas.getActiveObject()) {
        return false
      }

      this.started = true
      var pointer = canvas.getPointer(options.e)
      this.x = pointer.x
      this.y = pointer.y
      this.rect = new fabric.Rect({
        left: this.x,
        top: this.y,
        originX: 'left',
        originY: 'top',
        width: pointer.x - this.x,
        height: pointer.y - this.y,
        angle: 0,
        fill: '#2196f366',
        transparentCorners: false
      })
      canvas.add(this.rect)
    })

    canvas.on('mouse:move', function (options) {
      if (!this.started) {
        return false
      }

      var pointer = canvas.getPointer(options.e)

      if (this.x > pointer.x) {
        this.rect.set({ left: Math.abs(pointer.x) })
      }
      if (this.y > pointer.y) {
        this.rect.set({ top: Math.abs(pointer.y) })
      }

      this.rect.set({ width: Math.abs(this.x - pointer.x) })
      this.rect.set({ height: Math.abs(this.y - pointer.y) })

      canvas.renderAll()
    })

    canvas.on('mouse:up', function (options) {
      if (this.started) {
        this.started = false
      }

      var square = canvas.getActiveObject()
      if (!Object.is(square, null)) {
        square.setCoords()
      }

      if (this.rect.width > 1 && this.rect.height > 1) {
        console.log(this.rect)
      }
    })
  }
}
</script>
