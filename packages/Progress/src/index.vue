<template>
    <div class="container" :style="styleWidth">
        <div class="progress" ref="progress" :style="{background: progressColor, '--solid-color': solidColor}">
            <div class="solid" ref="solid"></div>
        </div>
        <div class="title" v-if="isShowPercent">{{ percent.toFixed(0) }}%</div>
    </div>
</template>

<script>
    export default {
        name: 'CProgress',
        props: {
            percent: {
                type: Number,
                required: true
            },
            width: {
                type: Number,
                default: 0
            },
            solidColor: {
                type: String,
                default: 'rgb(252, 191, 35)'
            },
            progressColor: {
                type: String,
                default: 'rgb(56, 230, 91)'
            },
            isShowPercent: {
                type: Boolean,
                default: false
            },
            isChange: {
                type: Boolean,
                default: false
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
            },
            isBorder(x, border) {
                if (x < 0 || x > border) {
                    return false
                } else {
                    return true
                }
            }
        },
        watch: {
            percent() {
                const left = this.percent / 100 * this.getProgressWidth()
                this.setSolidLoaction(left)
            }
        },
        mounted() {
            if (this.isChange) {      
                this.$refs.progress.onclick = (event) => {
                    let distanceX = 0
                    let element = this.$refs.progress
                    while (!this.isBody(element)) {
                        distanceX += element.offsetLeft + element.clientLeft
                        element = element.offsetParent
                    }
                    distanceX += element.offsetLeft      
                    const x = event.clientX + document.body.scrollLeft - distanceX
                    const newPercent = x / this.getProgressWidth() * 100
                    this.$emit('update:percent', Number.parseFloat(newPercent.toFixed(2)))
                }

                this.$refs.solid.onclick = (event) => {
                    event.stopPropagation()
                }
                this.$refs.solid.onmousedown = (e) => {
                    let solidX = 0
                    let solidelement = this.$refs.solid
                    while (!this.isBody(solidelement)) {
                        solidX += solidelement.offsetLeft + solidelement.clientLeft
                        solidelement = solidelement.offsetParent
                    }
                    solidX += solidelement.offsetLeft   
                    const sx = e.clientX + document.body.scrollLeft - solidX
                    
                    this.$refs.progress.onmousemove = (event) => {
                        let distanceX = 0
                        let element = this.$refs.progress
                        while (!this.isBody(element)) {
                            distanceX += element.offsetLeft + element.clientLeft
                            element = element.offsetParent
                        }
                        distanceX += element.offsetLeft      
                        const x = event.clientX + document.body.scrollLeft - distanceX + 7 - sx
                        const border = this.getProgressWidth()
                        if (this.isBorder(x, border)) {
                            this.setSolidLoaction(x)
                            const percent = x / border * 100
                            this.$emit('update:percent', Number.parseFloat(percent.toFixed(2)))
                        }
                    }

                    this.$refs.solid.onmouseup = () => {
                        this.$refs.progress.onmousemove = null
                    }

                    this.$refs.solid.onmouseleave = () => {
                        this.$refs.progress.onmousemove = null
                    }

                    
                }
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
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        -webkit-user-drag: none;
        padding: 0 7px 0 10px;
    }

    .progress {
        flex: 1;
        height: 8px;
        border-radius: 4px;
        background-color: rgb(56, 230, 91);
        position: relative;
        --solid-color: rgb(252, 191, 35);

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
                background: var(--solid-color);
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }

        }
    }

    .title {
        width: 40px;
        height: 20px;
        margin-left: 8px;
        line-height: 20px;
        text-align: center;
        color: rgb(50, 50, 50);
        font-size: 13px;      
    }

</style>