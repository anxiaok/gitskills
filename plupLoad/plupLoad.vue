<!--
    使用组件说明：
        1，local_name:文件原始名字
        2，random_name:文件随机名字

    如何调用：
        <plup-load :browse_button="'addAppendix'" @getImgList_addAppendix = "getImgList_addAppendix" :curType="'getImgList_addAppendix'" :multi_selection="false"></plup-load>

        1,browse_button:触发按钮
        2，@getImgList_addAppendix = "getImgList_addAppendix"：触发事件
        3，:curType="'getImgList_addAppendix'"：触发类型，
        4, :multi_selection 是否可以多选 true:可以多选， false:不可以多选
    注意：
        1，browse_button一定是能找到dom
        2, 记得修改getSign的请求方式

-->
<template>
    <div>
        <form name=theform style="display: none">
            <!--可以设置不同的文件名上传-->
            <input type="radio" name="myradio" value="local_name" checked=true/> 上传文件名字保持本地文件名字
            <input type="radio" name="myradio" value="random_name" /> 上传文件名字是随机文件名
            <br/>
            上传到指定目录:<input type="text" id='dirname' placeholder="如果不填，默认是上传到根目录" size=50>
        </form>
        <div id="showBg" v-show="showProgress">
            <div id="file-progress-List">
                <div v-for="item,index in progressList" :key="index">
                    <span class="file-name">{{item.fileName}}</span>
                    <el-progress :percentage="item.percent" :color="customColorMethod" :format="format"></el-progress>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import plupload from 'plupLoad'
    export default{
        props:{
            browse_button: '',
            curType:{
                type:String,
                default:'upload'
            },
            dropBtn:'',
            multi_selection:{
                type:Boolean,
                default:true
            },// 是否可以多文件上传
        },
        data(){
            return {
                token:this.$cookie.get('token'),
                parames:'', // 后台返回的直传签名
                accessid: '', // 全局OSSAccessKeyId
                host : '', // 后台返回的host
                policyBase64 : '', // policey
                signature : '', // 签名
                callbackbody:'', // 回调
                g_dirname:'', // 全局根目录（未实现）
                g_object_name:'', // 全局key名字
                g_object_name_type:'', // 上传文件名是随机还是原名字
                uploader:'', // uploader实例
                showProgress:false,// 是否显示进度条
                progressList:[],// 进度条的个数
                allList : [], // 所有的进度list
                progressLength:0,//上传文件数
            }
        },
        components:{
            plupload
        },
        mounted(){
            this.token = this.$cookie.get('osstoken');
            this.initPlupLoad();
        },
        methods: {
            // 格式化进度条文字
            format(percentage){
              return percentage === 100 ? '成功' : `${percentage}%`;
            },
            // 修改进度条颜色
            customColorMethod(percentage) {
              if (percentage < 100) {
                return '#1E8E76';
              } else {
                return '#2BB943';
              }
            },
            check_object_radio() {
                let tt = document.getElementsByName('myradio');
                for (let i = 0; i < tt.length ; i++ )
                {
                    if(tt[i].checked)
                    {
                        this.g_object_name_type = tt[i].value;
                        break;
                    }
                }
            },
            get_dirname(){
                let dir = document.getElementById("dirname").value;
                if (dir != '' && dir.indexOf('/') != dir.length - 1){
                    dir = dir + '/'
                }
                this.g_dirname = dir
            },
            random_string(len) {
                len = len || 32;
                const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                let maxPos = chars.length;
                let pwd = '';
                for (let i = 0; i < len; i++) {
                    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            },
            get_suffix(filename) {
                let pos = filename.lastIndexOf('.')
                this.suffix = ''
                if (pos != -1) {
                    this.suffix = filename.substring(pos)
                }
                return this.suffix;
            },
            calculate_object_name(filename){
                this.g_object_name = this.parames.key;
                if (this.g_object_name_type == 'local_name')
                {
                    this.g_object_name += "${filename}"
                }
                else if (this.g_object_name_type == 'random_name')
                {
                    this.suffix = this.get_suffix(filename)
                    this.g_object_name = this.g_object_name + this.random_string(10) + this.suffix
                }
                return ''
            },
            get_uploaded_object_name(filename){
                if (this.g_object_name_type == 'local_name')
                {
                    let tmp_name = this.g_object_name
                    tmp_name = tmp_name.replace("${filename}", filename);
                    return tmp_name
                }
                else if(this.g_object_name_type == 'random_name')
                {
                    return this.g_object_name
                }
            },
            set_upload_param(up, filename, ret){
                if (filename != '') {
                    this.suffix = this.get_suffix(filename)
                    this.calculate_object_name(filename)
                }
                let new_multipart_params = {
                    'key' : this.g_object_name,
                    'policy': this.policyBase64,
                    'OSSAccessKeyId': this.accessid,
                    'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
                    'callback' : this.callbackbody,
                    'signature': this.signature,
                };
                up.setOption({
                    'url': this.host,
                    'multipart_params': new_multipart_params
                });

                up.start();
            },
            initPlupLoad(){
                const that = this;
                this.uploader = new plupload.Uploader({
                    runtimes : 'html5,flash,silverlight,html4',
                    browse_button : this.browse_button,
                    url : 'http://oss.aliyuncs.com',
                    max_file_size : '100mb', //最大只能上传10mb的文件
                    multi_selection:this.multi_selection,//是否可以多选
                    init: {
                        FilesAdded: function(up, files) {
                            that.progressLength = files.length;
                            that.allList = [];
                            that.progressList = [];
                            that.$request.apiAxiosHasBaseUrl('get','cmsApp/content/getSign',{},{
                                token:that.token
                            }).then((request)=>{
                                let requestData = request.data;
                                that.accessid = requestData.accessid;
                                that.signature = requestData.signature;
                                that.policyBase64 = requestData.policy;
                                that.host = requestData.host;
                                that.g_object_name = requestData.dir;
                                that.callbackbody = requestData.callback;
                                that.parames = {
                                    'key' : requestData.dir,
                                    'policy':requestData.policy,
                                    'OSSAccessKeyId':requestData.accessid,
                                    'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
                                    'callback': requestData.callback,
                                    'signature': requestData.signature,
                                    'host':requestData.host
                                };
                                up.start();
                            });
                        },
                        BeforeUpload: function(up, file) {
                            that.percent = 0;
                            that.progressName = '上传中';
                            that.check_object_radio();
                            that.get_dirname();
                            that.set_upload_param(up, file.name, true);
                        },
                        UploadProgress: function(up, file) {
                            /**
                             * 添加进度条，判断是否全部100%
                             *
                             */
                            that.showProgress = true;
                            let list = that.allList.filter((item)=>{
                                return item === file.id;
                            });
                            if(list.length === 0){
                                that.allList.push(file.id);
                                that.progressList.push({
                                    id:file.id,
                                    fileName:file.name,
                                    percent:file.percent
                                });
                            }else{
                                list.forEach((item)=>{
                                    that.progressList.forEach((curItem)=>{
                                        if(item === curItem.id){
                                            curItem.percent = file.percent
                                        }
                                    })
                                })
                            }
                            let isOver = that.progressList.filter((item)=>{
                                return +item.percent === 100;
                            });
                            if(that.allList.length === isOver.length && that.allList.length === that.progressLength){
                                setTimeout(()=>{
                                    that.showProgress = false;
                                },1000);
                            }
                        },
                        FileUploaded: function(up, file, info) {
                            if (info.status == 200){
                                let fileName = that.get_uploaded_object_name(file.name);
                                that.$emit(that.curType,{imgUrl:`${that.parames.host}/${fileName}`,fileName:fileName,name:file.name,size:file.size});
                            }else if (info.status == 203){
                                console.log(info.response)
                            }
                        },
                        Error: function(up, err) {
                            if (err.code == -600) {
                                console.log("选择的文件太大了或文件为空,可以根据应用情况，在upload.js 调整设置");
                            }
                            else if (err.code == -601) {
                                console.log("选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型");
                            }
                            else if (err.code == -602) {
                                console.log("这个文件已经上传过一遍了");
                            }else{
                                console.log(err.response);
                            }
                        }
                    }
                });
                this.uploader.init();
            }
        }
    }
</script>
<style lang="scss">
    #showBg{
        width:320px;
        background: #fff;
        box-shadow:0 2px 12px 0 rgba(0,0,0,0.18);
        border-radius:4px;
        padding:20px;
        position:fixed;
        top:45%;
        left:50%;
        margin-left:-250px;
        z-index:10;
        color:#fff;
        #file-progress-List {
          .file-name {
            color: #999;
            font-size: 12px;
          }
        }
    }
</style>
