<template>
  <va-row>
    <va-column :xs="3" :sm="3" :md="3" :lg="3">
      <va-card :elevation="elevation" :padding="padding" class="card m-b-10 full-height">
        <va-form ref="form" :type="form.type">
          <va-form-item
            v-for="(item, index) in form.dynamicItems"
            :key="index"
            :label="item.label"
          >
            <va-input v-model="item.value" style="margin-right: 5px;" :rules="[{type:'required'}]" :name="'dynamic' + index" />
            <va-button @click="deleteItem(index)">
              <va-icon type="times" />
            </va-button>
          </va-form-item>
          <va-form-item>
            <va-button type="subtle" @click="addItem">
              <va-icon type="plus" margin="0 7px 0 0" />
              Add item
            </va-button>
          </va-form-item>
        </va-form>
      </va-card>
    </va-column>
    <va-column :xs="7" :sm="7" :md="7" :lg="7" class="full-height" style="border-left:1px solid #CCC;border-right:1px solid #CCC;">
      <div class="window_outline">
        <div class="window_head">
          <div class="circle window_item" />
          <div class="circle window_item" />
          <div class="circle window_item" />
          <div class="address_bar window_item" />
        </div>
        <div class="browser_body">
          <div style="width:100%;text-align: -webkit-center;">
            <div v-if="showDropzone">
              <vue-dropzone
                id="dropzone_en_desktop"
                ref="dropzoneEnDesktop"
                :options="dropzoneOptions_en_desktop"
                @vdropzone-success="fileUploadSuccess"
                @vdropzone-sending="fileUploadingEvent"
              />
            </div>
            <div v-if="onImageReady">
              <canvas
                ref="can"
                width="800"
                height="600"
                @mousedown="startSelect"
                @mousemove="drawRect"
                @mouseup="stopSelect"
              />
            </div>
          </div>
        </div>
      </div>
    </va-column>
    <va-column :xs="2" :sm="2" :md="2" :lg="2" />
  </va-row>
</template>

<script>
import { fabric } from 'fabric'
import vue2Dropzone from 'vue2-dropzone'

const UPLOAD_URL = process.env.MIX_APP_URL

export default {
  name: 'Builder',

  components: {
    'vueDropzone': vue2Dropzone
  },

  data () {
    return {
      form: {
        type: 'horizontal',
        dynamicItems: [
          {
            label: 'Page 1',
            value: null
          }
        ]
      },
      elevation: 0,
      padding: 10,
      canvas: null,
      x: null,
      y: null,
      rect: null,
      started: false,
      gutter: 25,
      size: 'lg',
      hover: true,
      canvasObjects: [],
      showDropzone: true,
      onImageReady: false,
      dropzoneOptions_en_desktop: {
        url: `${UPLOAD_URL}/api/media/upload/screen`,
        thumbnailWidth: 480,
        thumbnailHeight: 270,
        addRemoveLinks: true,
        dictDefaultMessage: 'Upload desktop image',
        headers: null
      }
    }
  },

  mounted () {
    const ref = this.$refs.can
    this.canvas = new fabric.Canvas(ref)
    this.canvas.on('mouse:down', (e) => this.startSelect(e))
    this.canvas.on('mouse:move', (e) => this.drawRect(e))
    this.canvas.on('mouse:up', (e) => this.stopSelect(e))
    const token = this.$store.getters['auth/token']
    const headers = {
      'Cache-Control': null,
      'X-Requested-With': null,
      Authorization: `Bearer ${token}`
    }
    this.dropzoneOptions_en_desktop.headers = headers
  },

  methods: {
    addItem () {
      this.form.dynamicItems.push({
        label: `Page ${this.form.dynamicItems.length + 1}`,
        value: 'Random data'
      })
    },
    deleteItem (index) {
      this.form.dynamicItems.splice(index, 1)
    },
    startSelect (options) {
      if (this.canvas.getActiveObject()) {
        return false
      }

      this.started = true
      var pointer = this.canvas.getPointer(options.e)
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
      this.canvas.add(this.rect)
    },
    drawRect (options) {
      if (!this.started) {
        return false
      }

      var pointer = this.canvas.getPointer(options.e)

      if (this.x > pointer.x) {
        this.rect.set({ left: Math.abs(pointer.x) })
      }
      if (this.y > pointer.y) {
        this.rect.set({ top: Math.abs(pointer.y) })
      }

      this.rect.set({ width: Math.abs(this.x - pointer.x) })
      this.rect.set({ height: Math.abs(this.y - pointer.y) })

      this.canvas.renderAll()
    },
    stopSelect (options) {
      if (this.started) {
        this.started = false
      }

      var square = this.canvas.getActiveObject()
      if (!Object.is(square, null)) {
        square.setCoords()
      }

      if (this.rect.width > 1 && this.rect.height > 1) {
        this.canvasObjects.push(this.rect)
        console.log(this.canvasObjects)
      }
    },
    fileUploadingEvent (file, xhr, formData) {
      formData.append('name', file.name)
      formData.append('locale', 'en')
      formData.append('type', 'desktop')
    },
    fileUploadSuccess (file, response) {
      const image = response.url.replace('/storage', UPLOAD_URL)
      this.showDropzone = false
      console.log(image)
      this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas))
      this.onImageReady = true
      this.$store.commit('outdo/PUSH_SCREEN', image)
    }
  }
}
</script>

<style scoped>
/*window styles*/
.browser_body {
  min-height: 20em;
}

.window_outline {
  border-radius: 5px;
  background-color: white;
  color: #303442;
  width: 100%;
  height: 643px;
}
.window_head {
  background: rgba(200,200,200,1);
  width: 100%;
  height: 2.5em;
  border: 3px solid rgba(120,120,120,1);
  display: flex;
}

.window_item {
  align-self: center;
  background: #fff;
  width: 1em;
  height: 1em;
  border: 1px solid rgba(180,180,180,1);
}
.circle {
  border-radius: 50%;
  margin-right: 0.6em;
}
.circle:first-child {
  margin-left: 0.6em;
}

.address_bar {
  border-radius: 3px;
  flex: 1 1 10px;
  max-width: 50%;
  height: 1.3em
}
</style>