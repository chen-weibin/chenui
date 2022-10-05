<template>
    <div class="container" :style="styleWidth">
        <div class="progress" ref="progress">
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
            },
            isBody(element) {
                return element.offsetParent.tagName === 'BODY'
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
                let distanceX = 0, distanceY = 0
                let element = this.$refs.progress
                while (!this.isBody(element)) {
                    distanceX += element.offsetLeft + element.clientLeft
                    distanceY += element.offsetTop + element.clientTop
                    element = element.offsetParent
                }
                distanceX += element.offsetLeft      
                distanceY += element.offsetTop      
                const x = event.clientX + document.body.scrollLeft - distanceX
                const y = event.clientY + document.body.scrollTop - distanceY
                console.log(x, y)
            }

            this.$refs.solid.onclick = (event) => {
                event.stopPropagation()
            }
            this.$refs.solid.onmousedown = (event) => {
                console.log('d')
                this.$refs.progress.onmousemove = (event) => {
                    console.log('move')
                }

                this.$refs.solid.onmouseup = () => {
                    this.$refs.progress.onmousemove = null
                }

                this.$refs.solid.onmouseleave = () => {
                    this.$refs.progress.onmousemove = null
                }

                
            }

            this.$emit('update:percent', 31)
            
        }
    }
</script>

<style lang='less' scoped>
    .container {
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #000;
        user-select: none;
        -webkit-user-drag: none;
    }

    .progress {
        width: 300px;
        height: 8px;
        border-radius: 4px;
        background-color: rgb(56, 230, 91);
        position: relative;

        .solid {
            position: absolute;
            top: -3px;
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