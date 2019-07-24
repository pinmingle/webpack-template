 // import '../css/index.scss';
 import '../css/demo2.css';
 import '../css/index.scss';

 import {ver} from './tool.js';
 document.getElementById("demo").innerHTML = ver();
//https://ceshi-wxckservice.comeyes.com
 $("#getInfoBtn").on("click",() => {
   $.ajax({
       url:"/api/ApiHandler/GetVisitorCrmMemberByUnionId",
       type:"POST",
       dataType:"json",
       data:{
           Openid:"oOckQt1950twzhBBDhBv1irLV47g",
           UnionId:"oIx981V9KW9J9a1xMuz7jzD9oIMQ"
       },
       success:(res)=>{
         console.log(res);
       }
   })
 })