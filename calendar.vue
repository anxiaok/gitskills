<!--
    调用方式：<calendar @getfirstCalendarDate="getfirstCalendarDate" :type="'getfirstCalendarDate'" :disabled="true"></calendar>
    1，type和触发方式一样，是为了确定唯一性
   ,2，disabled :是否可以点击

-->
<template>
    <div class="canlendar-wraper">
        <div class="date-wrapper">
            <DatePicker :open="open" :value="dateValue" type="date" format="yyyy-MM-dd" @on-change="changeDate" @on-clickoutside="changeOut">
                <a  href="javascript:;" @click="clickDateInput">
                    <Input v-model="dateValue" size="large" :disabled="disabled" placeholder="请填写日历" style="width: 275px" />
                </a>
            </DatePicker>
            <img @click="clickDateInput" v-show="!disabled" format="yyyy-MM-dd" class="date-icon" src="../../assets/images/expertImg/date.png" alt="">
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            type:{
                type:String,
                default:'eCalendar'
            },
            disabled:{
                type:Boolean,
                default: false
            },
            defaultValue:''
        },
        data(){
            return{
                open:false,
                dateValue:this.$time.timeFormat(this.defaultValue,'Y-m-d'),
            }
        },
        mounted(){
            this.$nextTick(()=>{
            })
        },
        watch:{
            defaultValue:{
                handler(newData, oldData) {
                    if (newData) {
                        this.dateValue=this.$time.timeFormat(this.defaultValue,'Y-m-d');
                    }
                },
                deep: true, //是否检测对象中子对象变化
                immediate: true //首次传值是是否变化
            }
        },
        methods:{
            changeDate(date){
                this.dateValue = date;
                this.$emit(this.type,{'dateValue':this.dateValue});
                this.clickDateInput();
            },
            clickDateInput(){
                this.disabled ? '' : this.open = !this.open;
            },
            changeOut(){
                this.clickDateInput();
            }
        }
    }
</script>
<style scoped lang="scss">
    .canlendar-wraper{
        display: inline-block;
        .date-wrapper{
            display: inline-block;
            position:relative;
            .date-icon{
                position: absolute;
                right: 12px;
                top: 10px;
            }
        }
    }
</style>
