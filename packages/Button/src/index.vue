<template>
    <div class="c-button">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "CButton",
        props: {
            type: String,
        },
    };
</script>

<style scoped>
    .c-button {
        display: inline-block;
        padding: 3px 6px;
        background: #000;
        color: #fff;
    }
</style>