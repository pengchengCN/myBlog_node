webpackJsonp([1],{0:function(t,e,n){t.exports=n("NHnr")},G3BA:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("/5sW"),i=(n("EuXz"),{name:"Item",props:{msg:String}}),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"item"},[n("div",[t._v("sdfsdfsdf")]),n("mt-button",{attrs:{type:"primary"}},[t._v("Item")])],1)},l=[],r=n("XyMi");function u(t){n("gu/D")}var s=!1,c=u,d="data-v-1bb544b8",m=null,f=Object(r["a"])(i,o,l,s,c,d,m),p=f.exports,v={name:"app",components:{Item:p},watch:{"$route.name":function(t,e){this.cgtl(t)}},data:function(){return{title:""}},methods:{cgtl:function(t){this.title="home"==t?"审批列表":"审批详情"}},mounted:function(){var t=this.$route.name;this.cgtl(t)}},h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view",{staticClass:"content"}),n("mt-header",{attrs:{fixed:"",title:t.title}},["审批详情"==t.title?n("router-link",{attrs:{slot:"left",to:"/"},slot:"left"},[n("mt-button",{attrs:{icon:"back"}},[t._v("返回")])],1):t._e()],1)],1)},b=[];function y(t){n("G3BA")}var g=!1,_=y,x=null,k=null,w=Object(r["a"])(v,h,b,g,_,x,k),$=w.exports,D=n("/ocq"),O=n("mtWM"),j=n.n(O),S={name:"home",components:{Item:p},data:function(){return{value:"",result:[{title:"出国申请",value:"待审批"},{title:"打印机申请",value:"待审批"},{title:"电脑申请",value:"待审批"},{title:"显示器申请",value:"已审批"},{title:"座位申请",value:"已审批"}]}},methods:{},mounted:function(){var t=this;console.log(this.$route.query),j.a.get("http://192.168.43.125:3000/posts").then(function(e){t.result=e.data[0].res})}},A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("mt-search",{attrs:{"cancel-text":"取消",placeholder:"搜索",show:!0},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.result,function(t,e){return n("mt-cell",{key:e,attrs:{title:t.title,value:t.value,to:"/detail?key="+t.title}})}))],1)},E=[];function C(t){n("RNFh")}var N=!1,I=C,M=null,R=null,B=Object(r["a"])(S,A,E,N,I,M,R),q=B.exports,z=n("Au9i"),F=n.n(z),G={name:"Details",props:{msg:String},data:function(){return{username:"",birthday:"2018-01-16",introduction:"需要出国深造,需要出国深造,需要出国深造,需要出国深造,需要出国深造,需要出国深造"}},methods:{getDatabyc:function(){Object(z["MessageBox"])("提示","操作成功"),this.$router.go(-1)},getDatabyApi:function(){var t=this;j.a.get("http://192.168.43.125:3000/comments").then(function(e){var n=e.data[0].res;t.username=n.username,t.birthday=n.birthday,t.introduction=n.introduction})}},mounted:function(){this.getDatabyApi()}},H=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"details"},[n("mt-field",{attrs:{label:"用户名",placeholder:"请输入用户名"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),n("mt-field",{attrs:{label:"生日",placeholder:"请输入生日",type:"date"},model:{value:t.birthday,callback:function(e){t.birthday=e},expression:"birthday"}}),n("mt-field",{attrs:{label:"自我介绍",placeholder:"自我介绍",type:"textarea",rows:"4"},model:{value:t.introduction,callback:function(e){t.introduction=e},expression:"introduction"}}),n("div",{staticStyle:{width:"80%",margin:"auto","margin-top":"50px"}},[n("mt-button",{staticStyle:{width:"100%"},attrs:{type:"primary",plain:"",size:"small"},on:{click:t.getDatabyc}},[t._v("通过")])],1)],1)},V=[];function W(t){n("eR3V")}var X=!1,J=W,P="data-v-3f9e12cc",T=null,Y=Object(r["a"])(G,H,V,X,J,P,T),K=Y.exports,L={name:"About",components:{Details:K}},Q=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about"},[n("Details")],1)},U=[],Z=!1,tt=null,et=null,nt=null,at=Object(r["a"])(L,Q,U,Z,tt,et,nt),it=at.exports;a["default"].use(D["a"]);var ot=new D["a"]({routes:[{path:"/",name:"home",component:q},{path:"/detail",name:"detail",component:it}]}),lt=n("NYxO");a["default"].use(lt["a"]);var rt=new lt["a"].Store({state:{},mutations:{},actions:{}});n("d8/S");a["default"].config.productionTip=!1,a["default"].use(F.a),new a["default"]({router:ot,store:rt,render:function(t){return t($)}}).$mount("#app")},RNFh:function(t,e){},"d8/S":function(t,e){},eR3V:function(t,e){},"gu/D":function(t,e){}},[0]);
//# sourceMappingURL=app.303d043c.js.map