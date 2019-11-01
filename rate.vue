<template>
    <div :class="classes" @mouseleave="handleMouseleave">
        <input type="hidden" :name="name" :value="currentValue">
        <div
                v-for="item in count"
                :class="starCls(item)"
                @mousemove="handleMousemove(item, $event)"
                :key="item"
                @click="handleClick(item)">
            <template>
                <span :class="[prefixCls + '-star-content']" type="half"></span>
                <img :src="require(`../../assets/images/expertImg/${starImgCal(item)}`)" alt="">
            </template>
        </div>
    </div>
</template>
<script>
    const prefixCls = 'me-rate';
    export default {
        name: 'Rate',
        props: {
            count: {
                type: Number,
                default: 5
            },
            value: {
                type: Number,
                default: 0
            },
            allowHalf: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            showText: {
                type: Boolean,
                default: false
            },
            name: {
                type: String
            },
            clearable: {
                type: Boolean,
                default: false
            },
            character: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            customIcon: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                prefixCls: prefixCls,
                hoverIndex: -1,
                isHover: false,
                isHalf: this.allowHalf && this.value.toString().indexOf('.') >= 0,
                currentValue: this.value
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-disabled`]: this.disabled
                    }
                ];
            },
            iconClasses () {
                return [
                    'ivu-icon',
                    {
                        [`ivu-icon-${this.icon}`]: this.icon !== '',
                        [`${this.customIcon}`]: this.customIcon !== '',
                    }
                ];
            },
            showCharacter () {
                return this.character !== '' || this.icon !== '' || this.customIcon !== '';
            }
        },
        watch: {
            value (val) {
                this.currentValue = val;
            },
            currentValue (val) {
                this.setHalf(val);
            }
        },
        methods: {
            starCls (value) {
                const hoverIndex = this.hoverIndex;
                const currentIndex = this.isHover ? hoverIndex : this.currentValue;

                let full = false;
                let isLast = false;

                if (currentIndex >= value) full = true;

                if (this.isHover) {
                    isLast = currentIndex === value;
                } else {
                    isLast = Math.ceil(this.currentValue) === value;
                }

                return [
                    {
                        [`${prefixCls}-star`]: !this.showCharacter,
                        [`${prefixCls}-star-chart`]: this.showCharacter,
                        [`${prefixCls}-star-full`]: (!isLast && full) || (isLast && !this.isHalf),
                        [`${prefixCls}-star-half`]: isLast && this.isHalf,
                        [`${prefixCls}-star-zero`]: !full
                    }
                ];
            },
            starImgCal (value) {
                const hoverIndex = this.hoverIndex;
                const currentIndex = this.isHover ? hoverIndex : this.currentValue;

                let full = false;
                let isLast = false;

                if (currentIndex >= value) full = true;

                if (this.isHover) {
                    isLast = currentIndex === value;
                } else {
                    isLast = Math.ceil(this.currentValue) === value;
                }

                if(isLast && this.isHalf){
                    return 'pentagram-half.png';
                }else{
                    if(!full){
                        return 'pentagram-gray.png';
                    }
                    if((!isLast && full) || (isLast && !this.isHalf)){
                        return 'pentagram.png';
                    }
                }

            },
            handleMousemove(value, event) {
                if (this.disabled) return;

                this.isHover = true;
                if (this.allowHalf) {
                    const type = event.target.getAttribute('type') || false;
                    this.isHalf = type === 'half';
                } else {
                    this.isHalf = false;
                }
                this.hoverIndex = value;
            },
            handleMouseleave () {
                if (this.disabled) return;

                this.isHover = false;
                this.setHalf(this.currentValue);
                this.hoverIndex = -1;
            },
            setHalf (val) {
                this.isHalf = val ? (this.allowHalf && val.toString().indexOf('.') >= 0):false;
            },
            handleClick (value) {
                if (this.disabled) return;
                //value++;
                if (this.isHalf) value -= 0.5;

                if(this.clearable && Math.abs(value - this.currentValue) < 0.01) {
                    value = 0;
                }

                this.currentValue = value;
                this.$emit('input', value);
                this.$emit('on-change', value);
            }
        }
    };
</script>
<style lang="scss" scoped>
    .me-rate{
        display: inline-block;
    }
    .me-rate-star{
        display: inline-block;
        margin: 0 14px 0 0;
        padding: 0;
        position: relative;
        transition: all .3s ease;
    }
    .me-rate-star-content{
        position: absolute;
        left: 0;
        top: 0;
        width: 50%;
        height: 100%;
        overflow: hidden;
    }
</style>
