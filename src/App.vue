<template>
    <header class="text-center text-bg-dark p-3 container">
        <img alt="Vue logo"
             width="150"
             height="150"
             class="rounded-circle"
             src="./assets/logo.png">
        <h1 class="mb-0">A fully functional drawing app - powered by VueJS</h1>
    </header>
    <main class="row p-0 m-0 container-fluid">
        <aside class="toolbarContainer col p-0 m-0 h-100 bg-secondary">
            <button></button> <!-- random buttons placeholders -->
            <button></button> <!-- random buttons placeholders -->
            <button></button> <!-- random buttons placeholders -->
            <button></button> <!-- random buttons placeholders -->
            <button></button> <!-- random buttons placeholders -->
            <button></button> <!-- random buttons placeholders -->
            <button></button> <!-- random buttons placeholders -->
            <button></button> <!-- random buttons placeholders -->
            <button></button> <!-- random buttons placeholders -->
            <button></button> <!-- random buttons placeholders -->
        </aside>
        <section class="canvasContainer col p-0 m-0 h-100 bg-white">
            <canvas class="w-100 h-100"
                    @mousedown="startDrawing"
                    @mousemove="draw"
                    @mouseup="stopDrawing"
                    ref="canvas"></canvas>
        </section>
    </main>
</template>

<script>
    // importing bootstrap
    import 'bootstrap/dist/css/bootstrap.css';

    export default {
        name: 'App',
        data()
        {
            return {
                canvas: null,        // canvas element
                context: null,       // defining the context of the canvas
                isDrawing: false,    // the user is drawing on the canvas
                pos: { x: 0, y: 0 }, // current coordinates of the cursor on the canvas
                canvasOffsetX: 0,    // last know Y starting point position of the mouse cursor on the canvas
                canvasOffsetY: 0,    // last know Y starting point position of the mouse cursor on the canvas
            }
        },
        methods:
        {
            /**
             * This method will take care of updating the cursor position
             * @param event
             */
            setPosition(event)
            {
                this.pos.x = event.clientX; // current X position of the cursor on the canvas
                this.pos.y = event.clientY; // current Y position of the cursor on the canvas
            },
            /**
             * This method will check if the user is drawing or not and it will retrieve the current cursor position
             * @param event
             */
            startDrawing(event)
            {
                this.isDrawing = true;   // the user is drawing
                this.setPosition(event); // updating current coordinates
            },
            /**
             * This method will take care of the actual drawing
             *
             * @param event
             */
            draw(event)
            {
                // if the user isn't drawing
                if(!this.isDrawing)
                {
                    // he can't draw
                    return false;
                }

                this.context.beginPath(); // starting a new path and empting previous generated sub paths

                this.context.lineWidth   = 2;         // defining the actual line width; for now, it will be just 2px // TODO we'll add a button to increase the line width, later
                this.context.lineCap     = 'round';   // the brush shape will be a dot
                this.context.strokeStyle = "black"; // defining the brush color; for now, it will be just black. // TODO we'll add some fancy features here, later

                this.context.moveTo((this.pos.x-this.canvasOffsetX), (this.pos.y-this.canvasOffsetY)); // starting a new sub-path at the specified coordinates

                this.setPosition(event); // updating current coordinates

                this.context.lineTo((this.pos.x-this.canvasOffsetX), (this.pos.y-this.canvasOffsetY)); // this will take care of connecting latest path's coordinates with the point at the current coordinates

                // draw a line that connects the current path with the settings defined above;
                // the current path is the one defined earlier (the connection between the previous point and the current one)
                this.context.stroke();
            },
            /**
             * This method will take care of interrupting the drawing
             */
            stopDrawing(event)
            {
                this.isDrawing = false;  // the user isn't drawing anymore
                this.setPosition(event); // updating current coordinates
            },
            /**
             * This method will take care of the canvas resizing based on the browser's window size
             */
            resize()
            {
                // retrieving the canvas's offset
                this.canvasOffsetX = this.canvas.offsetLeft;
                this.canvasOffsetY = this.canvas.offsetTop;

                // saving the currend draw
                let currentDraw = this.context.getImageData(0, 0,this.canvas.width, this.canvas.height);

                // defining canvas's size
                this.canvas.width  = (window.innerWidth-this.canvasOffsetX);
                this.canvas.height = (window.innerHeight-this.canvasOffsetY);

                // putting the previous draw back into the canvas
                this.context.putImageData(currentDraw, 0, 0);
            }
        },
        components: {},
        mounted()
        {
            this.canvas = this.$refs.canvas; // loading the canvas element into the component's attribute

            // retrieving the object that manages methods and properties needed for actual drawing and image manipulation on the canvas element
            // it will include all the info that we need (colors, line widths, fonts...) and other parameters
            // we're passing the "2d" identifier so that the system know we're using a 2d only canvas instead of 3d or webgl
            this.context = this.canvas.getContext("2d");

            this.resize(); // resizing the canvas

            // when the browser's window is resized
            window.addEventListener("resize", this.resize);
        },
    }
</script>

<style lang="scss">
#app {
    main {
        height: calc(100% - 230px);
    }
    .toolbarContainer,
    .canvasContainer { flex: 0 0 auto }
    .toolbarContainer {
        width: 50px;

    }
    .toolbarContainer button {
        @include button-styles;
    }
    .canvasContainer {
        width: calc(100% - 50px);
    }
    canvas { cursor: crosshair; }
}
</style>
