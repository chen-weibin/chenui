<template>
    <div class="progress" ref="progress" :style="styleWidth">
        <div class="line" ref="line"></div>
        <div class="solid" ref="solid"></div>
    </div>
</template>

<script>
    export default {
        name: 'CProgress',
        props: {
            percent: {
                type: Number,
                default: 21
            },
            width: {
                type: Number,
                default: 0
            },
        },
        computed: {
            styleWidth() {    
                return {
                    width: this.width === 0 ? '100%' : this.width + 'px'
                }
            },
            
        },
        watch: {
            percent(){          
                const percentLeft = this.percent / 100 * this.getProgressWidth()
                this.setSolidLeft(percentLeft)          
            }
        },
        mounted() {
            
            console.log(this.getProgressWidth())
            // setInterval(() => {
            //     this.percent += 1
            // }, 1000)
        },
        methods: {
            // 获取进度条的宽度
            getProgressWidth() {
                return parseInt(window.getComputedStyle(this.$refs.line, null).getPropertyValue("width"))
            },
            // 设置滑块的位置
            setSolidLeft(left) {
                this.$refs.solid.style.left = left - 7 + 'px'
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
    .progress {
        min-width: 14px;
        height: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .line {
            flex: 1;
            margin-left: 7px;
            margin-right: 7px;
            height: 8px;
            border-radius: 4px;
            background-color: rgb(56, 230, 91);
        }

        .solid {
            position: absolute;
            top: 0;
            left: 0px;
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

        // .current-percent {
        //     width: 30px;
        //     font-size: 14px;
        //     margin-left: 4px;
        //     margin-right: 2px;
        //     height: 14px;
        //     line-height: 14px;
        //     text-align: center;
        //     color: rgb(20, 20, 20);
        // }
    }
</style>

/** 
// 关于滑轮滑块的初始化
            this.radius = parseInt(window.getComputedStyle(this.$refs.solid, null).getPropertyValue("width")) / 2
            this.width = parseInt(window.getComputedStyle(this.$refs.musicprogress, null).getPropertyValue("width"))
            this.$refs.main.addEventListener('click', (e) => { 
                const x = e.clientX + document.body.scrollLeft - this.$refs.main.offsetLeft
                this.percent = x / this.width * 100
                this.currentTime = this.duration * this.percent / 100
                this.$refs.audio.currentTime = this.currentTime
            })
            this.$refs.main.onmousedown = (e) => {
                    const x = e.clientX + document.body.scrollLeft - this.$refs.main.offsetLeft
                    const left = parseInt(window.getComputedStyle(this.$refs.solid, null).getPropertyValue("left"))
                    const right = left + 2 * this.radius
                    if (left <= x && x <= right) {
                        this.isMusicDrog = true
                        this.$refs.main.onmousemove = (e)=>{
                            this.percent = (e.clientX + document.body.scrollLeft - this.$refs.main.offsetLeft) / this.width * 100
                            this.currentTime = this.duration * this.percent / 100
                            this.$refs.audio.currentTime = this.currentTime
                        }
                        this.$refs.main.onmouseleave = ()=>{
                            this.isMusicDrog = false
                            this.$refs.main.onmousemove = null
                        }
                        this.$refs.main.onmouseup = ()=>{
                            this.isMusicDrog = false
                            this.$refs.main.onmousemove = null
                        }
                    }
            }


.light,
    .dark,
    .green{
        width: 100%;
        height: 8px;
        background: transparent;
        border-radius: 4px;
        cursor: pointer;
        // &:hover{
        //     box-shadow: 0 0 2px .5px rgb(204, 204, 204);
        // }
    }
    .light::-webkit-progress-bar{
        background-color:var(--light-progress-all-color);
        border-radius: 4px;
    }
    .light::-webkit-progress-value{
        border-radius: 4px;
        background-color: var(--light-progress-current-color);
    }

*/