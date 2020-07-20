<template>
  <div>
    <va-row>
      <va-column :xs="2" :sm="2" :md="2" :lg="2">
        <va-card :elevation="elevation" :padding="padding" class="card m-b-10">
          <vue-dropzone
            id="screens-dropzone"
            ref="screensDropzone"
            :options="screensDropzoneUploadArea"
            @vdropzone-duplicate-file="fileDuplicateFile"
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
            <va-table :hover="table.hover" :size="table.size">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Left</th>
                    <th>Top</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Angle</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody v-if="canvasIsDirty">
                  <tr v-for="(spot, index) in canvas.toJSON().objects"
                      :key="index"
                  >
                    <td>{{ index }}</td>
                    <td>{{ spot.left }}</td>
                    <td>{{ spot.top }}</td>
                    <td>{{ spot.width }}</td>
                    <td>{{ spot.height }}</td>
                    <td>{{ spot.angle }}</td>
                    <td>{{ spot.destination }}</td>
                  </tr>
                </tbody>
              </table>
            </va-table>
          </va-column>
        </va-row>
      </va-column>
    </va-row>

    <va-aside ref="destinationAsideDiv" :placement="aside.placement" :width="aside.width">
      <div style="padding:20px;">
        <h2>Choose hotspot destination</h2>
        <vue-select-image
          :dataImages="uploadedImagesList"
          @onselectimage="onSelectImage"
        />
      </div>
    </va-aside>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'
import vue2Dropzone from 'vue2-dropzone'
import VueSelectImage from 'vue-select-image'

const UPLOAD_URL = process.env.MIX_APP_URL

export default {
  name: 'Builder',

  components: {
    VueSelectImage,
    'vueDropzone': vue2Dropzone
  },

  props: {
    workflow: { type: String, default: 'unknown-workflow' }
  },

  data () {
    return {
      id: null,
      table: {
        hover: true,
        size: 'lg'
      },
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
        thumbnailWidth: 120,
        thumbnailHeight: 64.5,
        addRemoveLinks: true,
        headers: null
      },
      aside: {
        width: '400px',
        placement: 'right',
        currentActiveObjectIndex: null,
        imageSelected: {
          id: null,
          src: null,
          alt: null
        }
      }
    }
  },

  computed: {
    canvasIsDirty () {
      return ((!Object.is(this.canvas, null)) && (!Object.is(this.canvas.toJSON(), null)))
    },
    uploadedImagesList () {
      let selectableImages = []
      this.$store.state.outdo.screens.map((image) => {
        let screenSrc = (typeof image.response !== 'undefined')
          ? image.response.path
          : image.path
        selectableImages.push({
          id: image.id,
          src: `${UPLOAD_URL}/storage/${screenSrc}`,
          alt: image.name
        })
      })
      return selectableImages
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
        console.log('passing')
        if (!Object.is(this.$store.state.outdo.active.screen.canvasState, null)) {
          if (this.$store.state.outdo.active.screen.canvasState.constructor === Object) {
            return this.$store.state.outdo.active.screen.canvasState
          }
          if (this.$store.state.outdo.active.screen.canvasState.constructor === String) {
            return JSON.parse(this.$store.state.outdo.active.screen.canvasState)
          }
        }
        return null
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
    this.id = this.$route.params.id
  },

  methods: {
    computedCurrentActiveScreenElevation (image) {
      if (typeof this.currentActiveScreen !== 'undefined' && this.currentActiveScreen !== null) {
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
      if ((typeof square !== 'undefined') && (!Object.is(square, null))) {
        square.setCoords()
      }

      if (Object.is(this.rect, null)) {
        return false
      }

      let index = this.canvasObjects.findIndex((canvasObject) => canvasObject.id === this.rect.id)
      if (index === -1) {
        if (this.rect.width > 0 && this.rect.height > 0) {
          this.canvas.add(this.rect)
          this.canvasObjects.push(this.rect)

          let filteredCanvasState = this.canvas.toJSON().objects.filter((element) => {
            return (element.width > 0 && element.height > 0)
          })

          let currentState = this.canvas.toJSON()
          currentState.objects = null
          currentState.objects = filteredCanvasState

          this.currentScreenState = currentState
          this.addHotSpot(this.rect)
        }
      }
    },
    fileDuplicateFile (file) {
      console.log(file.name)
    },
    fileUploadingEvent (file, xhr, formData) {
      formData.append('name', file.name)
      formData.append('workflow_id', this.workflow)
    },
    fileUploadSuccess (file, response) {
      console.log(response)
      const payload = {
        id: uuidv4(),
        src: response.url,
        response: response
      }
      this.$store.commit('outdo/PUSH_SCREEN', payload)
      this.$refs.screensDropzone.removeFile(file)
    },
    applyImageOnCanvas (image) {
      this.canvasObjects = []
      this.currentActiveScreen = image
      this.canvas.clear()

      let imageSrc = (typeof image.src === 'undefined') ? image.url : image.src
      this.canvas.setBackgroundImage(imageSrc, this.canvas.renderAll.bind(this.canvas), {
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
    },
    addHotSpot (canvasItem) {
      this.$store.commit('outdo/CURRENT_HOTSPOT', canvasItem)
      this.$refs.destinationAsideDiv.open()
    },
    onSelectImage (data) {
      this.aside.imageSelected = data
      if (Object.is(this.aside.imageSelected.id, null)) {
        this.$refs.destinationAsideDiv.open()
      } else {
        this.$store.commit('outdo/SET_CURRENT_HOTSPOT_DESTINATION', data)
        this.$refs.destinationAsideDiv.close()
        this.$store.commit('outdo/ADD_CURRENT_DESTINATION_TO_HOTSPOTS')
        this.$store.dispatch('outdo/save', this.id)
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
