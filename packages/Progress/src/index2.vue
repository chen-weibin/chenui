<template>
    <div class="container" :style="styleWidth">
        <div class="progress" ref="progress">
            <div class="line"></div>
            <div class="solid" ref="solid"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CProgress',
        props: {
            percent: {
                type: Number,
                default: 0
            },
            width: {
                type: Number,
                default: 0
            }
        },
        computed: {
            styleWidth() {    
                return {
                    width: this.width === 0 ? '100%' : this.width + 'px'
                }
            }
        },
        methods: {
            setSolidLoaction(left) {
                this.$refs.solid.style.left = left - 7 + 'px'
            },
            getProgressWidth() {
                return parseInt(window.getComputedStyle(this.$refs.progress, null).getPropertyValue("width"))
            }
        },
        watch: {
            percent() {
                const left = this.percent / 100 * this.getProgressWidth()
                this.setSolidLoaction(left)
            }
        },
        mounted() {
            this.$refs.progress.onclick = (event) => {
                console.log('点击了')
            }

            // this.$refs.progress.onmousedown = (event) => {
            //     console.log('down')
            // }

            // this.$refs.progress.onmousemove = (event) => {
            //     console.log('移动')
            // }

            // this.$refs.progress.onmouseleave = (event) => {
            //     console.log('离开')
            // }

            // this.$refs.progress.onmouseup = (event) => {
            //     console.log('up')
            // }

            this.$refs.solid.onmousedown = (event) => {
                event.stopPropagation()
                console.log('dolid')
                // this.$refs.progress.onmousemove = (event) => {
                //     console.log(event.clientX, event.clientY)
                // }
            }
        }
    }
</script>

<style lang='less' scoped>
    div {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .container {
        min-width: 14px;
        height: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #000;
    }

    .progress {
        width: 300px;
        height: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .line {
            width: 100%;
            height: 8px;
            border-radius: 4px;
            background-color: rgb(56, 230, 91);
            user-select: none;
            -webkit-user-drag: none;
        }

        .solid {
            position: absolute;
            top: 0;
            left: -7px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: rgb(253, 253, 253);
            cursor: pointer;

            &:hover {
                box-shadow: 0 0 3px 1px #d0d0d0;
            }

            &::before {
                content: '';
                display: block;
                position: absolute;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: rgb(252, 191, 35);
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
</style>