<template>
  <div>
    <va-row>
      <va-column :xs="2" :sm="2" :md="2" :lg="2">
        <va-card :elevation="elevation" :padding="padding" class="card m-b-10">
          <vue-dropzone
            id="screens-dropzone"
            ref="screensDropzone"
            :options="screensDropzoneUploadArea"
            @vdropzone-success="fileUploadSuccess"
            @vdropzone-sending="fileUploadingEvent"
          />
        </va-card>
        <div style="width:100%; padding: 10px;">
          <va-card
            v-for="(image, index) in uploadedImagesList"
            :key="`image_${index}`"
            :elevation="computedCurrentActiveScreenElevation(image)"
            class="screen"
            :padding="thumbnail.padding"
          >
            <img
              :src="image.src"
              aspect-ratio="1"
              class="screen-thumbnail"
              @click.stop="applyImageOnCanvas(image)"
            >
          </va-card>
        </div>
      </va-column>
      <va-column :xs="10" :sm="10" :md="10" :lg="10" class="full-height" style="border-left:1px solid #CCC;border-right:1px solid #CCC;">
        <div class="window_outline">
          <div class="window_head">
            <div class="circle window_item" />
            <div class="circle window_item" />
            <div class="circle window_item" />
            <div class="address_bar window_item" />
          </div>
          <div class="browser_body">
            <div style="width:100%;text-align: -webkit-center;">
              <canvas
                ref="can"
                @mousedown="startSelect"
                @mousemove="drawRect"
                @mouseup="stopSelect"
              />
            </div>
          </div>
        </div>
        <va-row>
          <va-column :xs="12" :sm="12" :md="12" :lg="12" style="border-top:3px solid rgba(200,200,200,1);">
            <va-tabs style="margin:10px;">
              <va-tab name="Actions">
                <h1>Test</h1>
              </va-tab>
              <va-tab name="Debugger">
                <hotspot-inspector :spots="canvasObjects" />
              </va-tab>
            </va-tabs>
          </va-column>
        </va-row>
      </va-column>
    </va-row>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'
import vue2Dropzone from 'vue2-dropzone'
import HotspotInspector from '~/components/HotspotInspector'

const UPLOAD_URL = process.env.MIX_APP_URL

export default {
  name: 'Builder',

  components: {
    HotspotInspector,
    'vueDropzone': vue2Dropzone
  },

  data () {
    return {
      avatar: {
        rounded: false
      },
      thumbnail: {
        elevation: 1,
        padding: 0
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
      screensDropzoneUploadArea: {
        url: `${UPLOAD_URL}/api/media/upload/screen`,
        thumbnailWidth: 240,
        thumbnailHeight: 135,
        addRemoveLinks: true,
        headers: null
      }
    }
  },

  computed: {
    uploadedImagesList () {
      return this.$store.state.outdo.screens
    },
    currentActiveScreen: {
      get () {
        if (!Object.is(this.$store.state.outdo.active.screen, null)) {
          return this.$store.state.outdo.active.screen
        }
        return null
      },
      set (screen) {
        this.$store.commit('outdo/SET_ACTIVE_SCREEN', screen)
      }
    },
    currentScreenState: {
      get () {
        return this.$store.state.outdo.active.screen.canvasState
      },
      set (canvasState) {
        this.$store.commit('outdo/SET_CURRENT_CANVAS_STATE', canvasState)
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
    this.screensDropzoneUploadArea.headers = headers
  },

  methods: {
    computedCurrentActiveScreenElevation (image) {
      if (typeof this.currentActiveScreen !== 'undefined') {
        if (this.currentActiveScreen.id === image.id) {
          return `3`
        }
      }
      return this.thumbnail.elevation
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
        id: uuidv4(),
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

      let index = this.canvasObjects.findIndex((canvasObject) => canvasObject.id === this.rect.id)
      if (index === -1) {
        this.canvasObjects.push(this.rect)
        this.currentScreenState = this.canvas.toJSON()
      }
    },
    fileUploadingEvent (file, xhr, formData) {
      formData.append('name', file.name)
      formData.append('locale', 'en')
      formData.append('type', 'desktop')
    },
    fileUploadSuccess (file, response) {
      console.log(response)
      const payload = {
        id: uuidv4(),
        src: response.url.replace('/storage', UPLOAD_URL),
        response: response
      }
      this.$store.commit('outdo/PUSH_SCREEN', payload)
      this.$refs.screensDropzone.removeFile(file)
    },
    applyImageOnCanvas (image) {
      this.currentActiveScreen = image
      this.canvas.clear()

      this.canvas.setBackgroundImage(image.src, this.canvas.renderAll.bind(this.canvas), {
        // Needed to position backgroundImage at 0/0
        top: 0,
        left: 0,
        originX: 'left',
        originY: 'top',
        scaleX: 0.67,
        scaleY: 0.67
      })
      this.canvas.setDimensions({ width: 1300, height: 580 })

      if (!Object.is(this.currentScreenState, null)) {
        let json = this.currentScreenState
        this.canvas.loadFromJSON(json, this.canvas.renderAll.bind(this.canvas))
      }
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
.screen {
  margin: 0px 0px 20px 0px;
}
</style>
