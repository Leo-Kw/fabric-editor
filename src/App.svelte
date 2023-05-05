<script lang="ts">
  import { onMount } from 'svelte'
  import { fabric } from 'fabric'
  import png from './assets/0.png'
  import { ControlPanel } from './components/control-panel'
  import { createStore } from './store'

  let canvasElement: HTMLCanvasElement
  let canvas: fabric.Canvas
  let workspace: fabric.Rect
  let history: { version: string; objects: Object[] }[] = []
  let size = { width: 0, height: 0 }
  const store = createStore()

  onMount(() => {
    canvas = new fabric.Canvas(canvasElement, {
      width: 800,
      height: 600,
      selection: false,
    })

    fabric.Image.fromURL(png, (img) => {
      const imgRatio = img.width / img.height
      const canvasRatio = canvas.width / canvas.height
      if (imgRatio > canvasRatio) {
        img.scaleToWidth(canvas.width)
        img.top = (canvas.height - img.getScaledHeight()) / 2
      } else {
        img.scaleToHeight(canvas.height)
        img.left = (canvas.width - img.getScaledWidth()) / 2
      }
      img.set({
        hasControls: false,
        selectable: false,
      })
      size.width = img.width
      size.height = img.height
      canvas.add(img)
      canvas.requestRenderAll()
    })

    workspace = new fabric.Rect({
      fill: 'transparent',
      width: 200,
      height: 400,
      objectCaching: false,
      selectable: false,
      hasControls: false,
    })
    canvas.add(workspace)
    workspace.center()

    canvas.on('object:added', (event) => {
      const isSelect = event.action === undefined && event.e
      if (isSelect) return
      const data = canvas.toJSON()
      history.push(data)
      store.history.update((v) => [...v, data])
    })

    canvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY
      let zoom = canvas.getZoom()
      const zoomRatio = 1.02
      let penWidth = canvas.freeDrawingBrush.width

      if (delta > 0) {
        zoom > 1
          ? (canvas.freeDrawingBrush.width = penWidth * zoomRatio)
          : (canvas.freeDrawingBrush.width = penWidth)
        zoom > 1 ? (zoom /= zoomRatio) : (zoom = 1)
      } else {
        zoom *= zoomRatio
        canvas.freeDrawingBrush.width = penWidth / zoomRatio
      }

      canvas.zoomToPoint(
        {
          x: opt.e.offsetX,
          y: opt.e.offsetY,
        },
        zoom,
      )
      opt.e.preventDefault()
      opt.e.stopPropagation()
    })
  })
</script>

<main>
  <div class="contain">
    <canvas bind:this={canvasElement} />
    <ControlPanel {canvas} {workspace} {history} {store} />
  </div>
</main>

<style>
  .contain {
    position: relative;
    background-color: rgba(24, 28, 32, 1);
    box-shadow: inset 0 0 9px 2px #0000001f;
  }
</style>
