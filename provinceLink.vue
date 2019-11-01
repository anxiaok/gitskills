<!--
  如何调用：
注意：基于iview组件库
<province-link
    @change="getCurProvince"  // 返回具体的省份id
    :isDisabled="false" // 是否不可点击
    :isForm="false"  // 是否是查询页面的：true是查询页面的，false：编辑页的
    :hasError="errorMsgList.showProvinceMsg" // 提示错误信息
    :selectStyle="'width:190px'" // 样式修改
    :lastSelectStyle="'width:193px;'"> //最后一个select的样式修改
</province-link>
-->
<template>
    <div class="expert-province-wrapper">
        <div class="curItem">
            <Select v-model="curProvinceId" @on-change="changeLocalProvince" :class="{'ivu-form-item-error':selectIsError}"  size="large" :disabled="isDisabled" :placeholder="isForm?'全部':'省'" :style="selectStyle">
                <Option value="-1" v-if="isForm">全部</Option>
                <Option v-for="item,index in localProvinceList" :value="item.id+''" :key="index">{{ item.name }}</Option>
            </Select>
            <Select v-model="curCityId" @on-change="changeLocalCity" :class="{'ivu-form-item-error':selectIsError}"  :placeholder="isForm?'全部':'市'" :disabled="isDisabled" size="large"  :style="selectStyle">
                <Option value="-1" v-if="isForm">全部</Option>
                <Option v-for="item,index in localCityList" :value="item.id+''" :key="index">{{ item.name }}</Option>
            </Select>
            <Select v-model="curCountyId" @on-change="changeLocalCountry" :class="{'ivu-form-item-error':selectIsError}"  :disabled="isDisabled" :placeholder="isForm?'全部':'县'" size="large"  :style="selectStyle">
                <Option value="-1" v-if="isForm">全部</Option>
                <Option v-for="item,index in localCountryList" :value="item.id+''" :key="index">{{ item.name }}</Option>
            </Select>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            isForm:{
                type:Boolean,
                default:true
            },
            isDisabled:{
                type:Boolean,
                default:false
            },
            selectStyle:{
                type:String,
                default:'width:113px;'
            },
            lastSelectStyle:{
                type:String,
                default:'width:113px;'
            },
            hasError:{
                type:Boolean,
                default:false
            },
            provinceId:'',
            cityId:'',
            countyId:'',
        },
        data(){
            return {
                localProvinceList: [],// 本区域省列表
                localCityList: [],// 本区域市列表
                localCountryList: [],// 本区域县列表
                initProvinceData:[],// 初始化数据
                selectIsError:'',// 判断是否有问题
                curProvinceId:'',
                curCityId:'',
                curCountyId:'',
                curProvinceName:'',
                curCityName:'',
                curCountyName:'',
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.provinceId === undefined ? this.getProvinceList(0) : '';
            })
        },
        watch:{
            hasError:{
                handler:function(newValue,obleValue){
                    this.selectIsError = newValue;
                },
                deep:true,
                immediate:true
            },
            provinceId:{
                handler:function(newValue,oldValue){
                    if(newValue !== undefined){
                        this.curProvinceId = newValue+'';
                        this.getProvinceList(0);
                    }
                },
                deep:true,
                immediate:true
            },
            cityId:{
                handler:function(newValue,oldValue){
                    if(newValue){
                        this.curCityId = newValue+'';
                    }
                },
                deep:true,
                immediate:true
            },
            countyId:{
                handler:function(newValue,oldValue){
                    if(newValue) {
                        this.curCountyId = newValue + '';
                    }
                },
                deep:true,
                immediate:true
            }
        },
        methods:{
            // 获取省份列表
            getProvinceList(id){
                this.$request.apiAxiosHasBaseUrl('get','common/getProvince',null,null,this.$baseUrl).then((res)=>{
                    this.initProvinceData = res.data.data;
                    this.localProvinceList = this.initProvinceData.filter((item)=>{
                        return +item.pid === id;
                    });
                    if(+this.curProvinceId !== 0){
                        let provinceList = this.localProvinceList.filter((item)=>{
                            return +item.id === +this.curProvinceId;
                        })[0];
                        this.curProvinceName = provinceList ? provinceList.name : '';
                    }
                    if(+this.curProvinceId){
                        this.localCityList = this.initProvinceData.filter((item)=>{
                            return +item.pid === +this.curProvinceId;
                        });
                        let cityList = this.localCityList.filter((item)=>{
                            return +item.id === +this.curCityId;
                        })[0];
                        this.curCityName = cityList ? cityList.name : '';
                    }
                    if(+this.curCityId){
                        this.localCountryList = this.initProvinceData.filter((item)=>{
                            return +item.pid === +this.curCityId;
                        });
                        let countryList = this.localCountryList.filter((item)=>{
                            return +item.id === +this.curCountyId;
                        })[0];
                        this.curCountyName = countryList ? countryList.name : '';
                    }
                    this.$emit('change', {
                        provinceId: this.curProvinceId,
                        curProvinceName: this.curProvinceName,
                        cityId: this.curCityId,
                        curCityName: this.curCityName,
                        countyId: this.curCountyId,
                        curCountyName: this.curCountyName
                    })
                });
            },
            // 改变省份
            changeLocalProvince(curItem){
                this.localCityList = this.initProvinceData.filter((item)=>{
                    return +item.pid === +this.curProvinceId;
                });
                this.selectIsError = false;
                this.localCountryList = [];
                this.curCountyId = '';
                this.curCityId = '';
                if(this.curProvinceId === '-1'){
                    this.curProvinceId = 0;
                }
                let curList = this.localProvinceList.filter((item)=>{
                    return +item.id === +curItem;
                })[0];
                this.curProvinceName = curList ? curList.name : '';
                if(curList) {
                    this.$emit('change', {
                        provinceId: this.curProvinceId,
                        curProvinceName: this.curProvinceName,
                        cityId: '',
                        curCityName: '',
                        countyId: '',
                        curCountyName: ''
                    })
                }else{
                    this.$emit('change', {
                        provinceId: this.curProvinceId,
                        curProvinceName: this.curProvinceName,
                        cityId: this.curCityId,
                        curCityName: this.curCityName,
                        countyId: this.curCountyId,
                        curCountyName: this.curCountyName
                    })
                }
            },
            // 改变市
            changeLocalCity(curItem){
                this.localCountryList = this.initProvinceData.filter((item)=>{
                    return +item.pid === +this.curCityId;
                });
                this.selectIsError = false;
                this.curCountyId = '';
                if(this.curCityId === '-1'){
                    this.curCityId = 0;
                }
                let curList = this.localCityList.filter((item)=>{
                    return +item.id === +curItem;
                })[0];
                this.curCityName = curList ? curList.name : '';
                if(curList) {
                    this.$emit('change', {
                        provinceId: this.curProvinceId,
                        curProvinceName: this.curProvinceName,
                        cityId: this.curCityId,
                        curCityName: this.curCityName,
                        countyId: '',
                        curCountyName: ''
                    })
                }else{
                    this.$emit('change', {
                        provinceId: this.curProvinceId,
                        curProvinceName: this.curProvinceName,
                        cityId: this.curCityId,
                        curCityName: this.curCityName,
                        countyId: this.curCountyId,
                        curCountyName: this.curCountyName
                    })
                }
            },
            // 改变县
            changeLocalCountry(curItem){
                this.selectIsError = false;
                if(this.curCountyId === '-1'){
                    this.curCountyId = 0;
                }
                let curList = this.localCountryList.filter((item)=>{
                    return +item.id === +curItem;
                })[0];
                this.curCountyName = curList ? curList.name : '';
                if(curList) {
                    this.$emit('change', {
                        provinceId: this.curProvinceId,
                        curProvinceName: this.curProvinceName,
                        cityId: this.curCityId,
                        curCityName: this.curCityName,
                        countyId: this.curCountyId,
                        curCountyName: this.curCountyName
                    })
                }else{
                    this.$emit('change', {
                        provinceId: this.curProvinceId,
                        curProvinceName: this.curProvinceName,
                        cityId: this.curCityId,
                        curCityName: this.curCityName,
                        countyId: this.curCountyId,
                        curCountyName: this.curCountyName
                    })
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    .expert-province-wrapper{
        display: inline-block;
    }

</style>
