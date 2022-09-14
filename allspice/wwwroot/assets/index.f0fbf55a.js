import{r as ie,c as v,a as S,o as c,b as d,d as s,e as x,F as $,f as re,S as Y,g as P,h as b,w as M,M as T,n as U,t as h,i as m,j as O,k as q,l as w,v as k,m as C,p as ae,q as Q,s as ce,u as D,x as j,y as de,z as le,A as ue,B as pe,C as _e,D as ge,E as me,G as ve}from"./vendor.2e10bab8.js";const he=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))e(i);new MutationObserver(i=>{for(const p of i)if(p.type==="childList")for(const l of p.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function o(i){const p={};return i.integrity&&(p.integrity=i.integrity),i.referrerpolicy&&(p.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?p.credentials="include":i.crossorigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function e(i){if(i.ep)return;i.ep=!0;const p=o(i);fetch(i.href,p)}};he();const r=ie({user:{},account:{},recipes:[],activeRecipe:{},ingredients:[],steps:[],favorites:[],search:!1,searchWord:""});var I=(n,t)=>{for(const[o,e]of t)n[o]=e;return n};const ye={name:"App",setup(){return{appState:v(()=>r)}}},fe={class:"container-fluid"};function be(n,t,o,e,i,p){const l=S("Navbar"),g=S("router-view");return c(),d($,null,[s("header",null,[x(l)]),s("main",null,[s("div",fe,[x(g)])])],64)}var we=I(ye,[["render",be]]);const G=window.location.origin.includes("localhost"),J=G?"https://localhost:5001":"",Se="dev-in-9pjrc.us.auth0.com",xe="https://patrickdev.com",ke="KCkMZ4ZIRzme4LvLXEQoEorQQItsONAx";function L(n,t){if(G)console[n](`[${n}] :: ${new Date().toLocaleTimeString()} :: `,...t);else{switch(n){case"log":case"assert":return}console[n](`[${n}] :: ${new Date().toLocaleTimeString()} :: `,...t)}}const _={log(){L("log",arguments)},error(){L("error",arguments)},warn(){L("warn",arguments)},assert(){L("assert",arguments)},trace(){L("trace",arguments)}},y=re.create({baseURL:J,timeout:8e3});class Ie{async getRecipes(){let o=(await y.get("api/recipes")).data;o.forEach(e=>{e.isFavorite=!1}),r.recipes=o}async getIngredients(t){const o=await y.get("api/recipes/"+t+"/ingredients");r.ingredients=o.data}async getSteps(t){const o=await y.get("api/recipes/"+t+"/steps");r.steps=o.data;let e=r.steps;for(let i=0;i<e.length;i++){const p=e[i];p.position=i+1}}async createRecipe(t){const o=await y.post("/api/recipes",t);return r.recipes.push(o.data),r.activeRecipe=o.data,o.data}async favoriteRecipe(t){await y.post("api/recipes/"+t+"/favorite");let o=r.recipes.find(e=>e.id==t);o.isFavorite=!o.isFavorite}async deleteRecipe(t){await y.delete("api/recipes/"+t),r.recipes=r.recipes.filter(o=>o.id!=t)}async searchRecipes(t){let e=(await y.get("api/recipes?query="+t)).data;e.forEach(i=>{i.isFavorite=!1}),r.recipes=e}}const R=new Ie;class Re{async deleteStep(t){await y.delete("api/steps/"+t),r.steps=r.steps.filter(o=>o.id!=t)}async createStep(t){const o=await y.post("api/steps",t);r.steps.push(o.data)}async updateStep(t){await y.put("api/steps/"+t.id,t)}}const E=new Re;class Ce{async deleteIngredient(t){await y.delete("api/ingredients/"+t),r.ingredients=r.ingredients.filter(o=>o.id!=t)}async createIngredient(t){const o=await y.post("api/ingredients",t);r.ingredients.push(o.data)}async updateIngredient(t){await y.put("api/ingredients/"+t.id,t)}}const A=new Ce;class a{static async confirm(t="Are you sure?",o="You won't be able to revert this!",e="warning",i="Yes, delete it!"){try{return!!(await Y.fire({title:t,text:o,icon:e,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:i})).isConfirmed}catch{return!1}}static toast(t="Warning!",o="warning",e="top-end",i=3e3,p=!0){Y.fire({title:t,icon:o,position:e,timer:i,timerProgressBar:p,toast:!0,showConfirmButton:!1})}static error(t){var o;if(t.isAxiosError){const{response:e}=t;this.toast(((o=e.data.error)==null?void 0:o.message)||e.data.message,"error")}else this.toast(t.message||t,"error")}static success(t="Success!"){this.toast(t,"success")}}const Ee={components:{draggable:P},data(){return{enabled:!0,list1:v(()=>r.steps)}},methods:{log:function(n){window.console.log(n)}},setup(){b({});const n=b(""),t=b({recipeId:r.activeRecipe.id}),o=b({recipeId:r.activeRecipe.id,position:1});return M(async()=>{try{r.account,r.activeRecipe.id&&(await R.getIngredients(r.activeRecipe.id),await R.getSteps(r.activeRecipe.id))}catch(e){_.error(e),a.toast(e.message,"error")}}),{ingredientData:t,stepData:o,stepsView:n,recipe:v(()=>r.activeRecipe),ingredients:v(()=>r.ingredients),account:v(()=>r.account),steps:v(()=>r.steps),async deleteRecipe(){try{await a.confirm("Are you sure you want to delete this recipe?")&&(await R.deleteRecipe(this.recipe.id),T.getOrCreateInstance(document.getElementById("active-recipe")).hide(),a.toast("Recipe deleted","success"))}catch(e){_.error(e),a.toast(e.message,"error")}},async deleteStep(e){try{_.log("delete step",e.element.id),await a.confirm("Are you sure you want to delete this step?")&&(await E.deleteStep(e.element.id),this.sortSteps(),a.toast("Step deleted","success"))}catch(i){_.error(i),a.toast(i.message,"error")}},async deleteIngredient(e){try{await a.confirm("Are you sure you want to delete this ingredient?")&&(await A.deleteIngredient(e),a.toast("Step deleted","success"))}catch(i){_.error(i),a.toast(i.message,"error")}},async addIngredient(){try{await A.createIngredient(t.value),t.value.name="",t.value.quantity="",a.toast("Ingredient Added!","success")}catch(e){_.error(e),a.toast(e.message,"error")}},async addStep(){try{if(o.value.position=1,this.steps.length>0){let e=this.steps[this.steps.length-1];o.value.position=e.position+1}await E.createStep(o.value),o.value.body="",a.toast("Step added!","success")}catch(e){_.error(e),a.toast(e.message,"error")}},async updateStep(e){try{await E.updateStep(e)}catch(i){_.error(i),a.toast(i.message,"error")}},async sortSteps(){try{_.log("sort steps ran");let e=r.steps;for(let i=0;i<e.length;i++){const p=e[i];p.position=i+1,this.updateStep(p)}a.toast("Steps updated!","success")}catch(e){_.error(e),a.toast(e.message,"error")}}}}},Ae={class:"container-fluid"},Ve={class:"row"},$e=s("i",{class:"text-danger fs-1 mdi mdi-heart-outline bg-grey rounded"},null,-1),Te=[$e],Oe={class:"col-lg-8 pt-3 p-3"},De={class:"d-flex justify-content-between align-items-center"},je={class:"text-secondary fs-3"},Le={class:"bg-grey rounded-pill p-1 px-3 mx-3"},qe={class:""},Pe=q(" Delete "),Me=s("i",{class:"mdi mdi-trash-can"},null,-1),Ue=[Pe,Me],Ne=s("button",{type:"button",class:"btn-close btn btn-light bg-light","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),Be={class:"text-grey fs-4"},ze={class:"row pt-5"},Fe={class:"col-lg-6"},He=s("div",{class:"text-center bg-primary rounded"},[s("h3",null,"Recipe Steps")],-1),Ke={class:"list-group-item d-flex align-items-center justify-content-between"},We={class:""},Ye={key:0,class:"mdi mdi-reorder-horizontal fs-4 me-2"},Qe={class:"me-2"},Ge=["contenteditable"],Je={key:2},Ze=["onUpdate:modelValue"],Xe=["onClick"],et={key:0,class:"d-flex justify-content-between mx-2 p-2"},tt=s("i",{class:"mdi mdi-plus fs-4"},null,-1),st=[tt],ot=s("i",{class:"mdi mdi-pencil fs-4"},null,-1),nt=[ot],it=s("i",{class:"mdi mdi-swap-vertical-bold fs-4"},null,-1),rt=[it],at={key:0,class:"my-3"},ct={class:"text-end m-2"},dt=s("button",{type:"submit",class:"btn btn-primary m-1"},"Add",-1),lt={key:1,class:"d-flex justify-content-end m-2"},ut={class:"col-lg-6"},pt={class:"elevation-2 rounded"},_t=s("div",{class:"text-center bg-primary rounded"},[s("h3",null,"Ingredients")],-1),gt={class:"d-flex justify-content-between"},mt=["onClick"],vt={key:0,class:"mb-3"},ht=s("div",{class:"text-end mb-5"},[s("button",{type:"submit",class:"btn btn-primary m-2"},"Add")],-1),yt={class:"d-flex justify-content-end align-items-end published p-2"};function ft(n,t,o,e,i,p){const l=S("B"),g=S("draggable");return c(),d("div",Ae,[s("div",Ve,[s("div",{class:"col-lg-4 modal-col1 text-end modal-round",style:U(`background-image: url(${e.recipe.picture})`)},Te,4),s("div",Oe,[s("div",De,[s("div",null,[s("span",je,h(e.recipe.title),1),s("span",Le,h(e.recipe.category),1)]),s("div",qe,[e.account.id==e.recipe.creatorId?(c(),d("button",{key:0,onClick:t[0]||(t[0]=(...u)=>e.deleteRecipe&&e.deleteRecipe(...u)),type:"button",class:"btn btn-danger mx-3"},Ue)):m("",!0),Ne])]),s("span",Be,h(e.recipe.subtitle),1),s("div",ze,[s("div",Fe,[He,x(g,{tag:"ul",class:"list-group",handle:".handle",list:i.list1,onChange:t[1]||(t[1]=u=>e.sortSteps()),"item-key":"body"},{item:O(({element:u})=>[s("div",Ke,[s("div",We,[e.account.id==e.recipe.creatorId&&e.stepsView=="Sort"?(c(),d("i",Ye)):m("",!0),s("span",Qe,[x(l,null,{default:O(()=>[q(h(u.position+": "),1)]),_:2},1024)]),e.stepsView!=="Edit"?(c(),d("span",{key:1,contenteditable:e.stepsView=="Edit"},h(u.body),9,Ge)):m("",!0),e.stepsView=="Edit"?(c(),d("div",Je,[w(s("input",{class:"form-control form-control-sm",type:"text","onUpdate:modelValue":V=>u.body=V},null,8,Ze),[[k,u.body]])])):m("",!0)]),e.account.id==e.recipe.creatorId&&e.stepsView=="Sort"?(c(),d("i",{key:0,onClick:V=>e.deleteStep({element:u}),class:"mdi mdi-close text-danger selectable grow text-end"},null,8,Xe)):m("",!0)])]),_:1},8,["list"]),e.stepsView==""?(c(),d("div",et,[s("button",{class:"btn btn-primary rounded-pill",onClick:t[2]||(t[2]=u=>e.stepsView="Add"),title:"Add a Step"},st),s("button",{class:"btn btn-primary rounded-pill",onClick:t[3]||(t[3]=u=>e.stepsView="Edit"),title:"Edit Steps"},nt),s("button",{class:"btn btn-primary rounded-pill elevation-2",onClick:t[4]||(t[4]=u=>e.stepsView="Sort"),title:"Sort step order"},rt)])):m("",!0),e.account.id==e.recipe.creatorId?(c(),d("form",{key:1,onSubmit:t[8]||(t[8]=C((...u)=>e.addStep&&e.addStep(...u),["prevent"]))},[e.stepsView=="Add"?(c(),d("div",at,[w(s("input",{"onUpdate:modelValue":t[5]||(t[5]=u=>e.stepData.body=u),type:"text",class:"form-control",id:"exampleFormControlInput1",placeholder:"Add Step",required:""},null,512),[[k,e.stepData.body]]),s("div",ct,[s("button",{onClick:t[6]||(t[6]=u=>e.stepsView=""),class:"btn btn-primary"}," Close "),dt])])):m("",!0),e.stepsView=="Sort"||e.stepsView=="Edit"?(c(),d("div",lt,[s("button",{class:"btn btn-primary",onClick:t[7]||(t[7]=u=>e.stepsView="")}," Done ")])):m("",!0)],32)):m("",!0)]),s("div",ut,[s("div",pt,[_t,s("ul",null,[(c(!0),d($,null,ae(e.ingredients,u=>(c(),d("li",{key:u.id,class:"py-2"},[s("div",gt,[s("div",null,[s("span",null,h(u.quantity+" of "),1),s("span",null,h(u.name),1)]),s("div",null,[e.account.id==e.recipe.creatorId?(c(),d("i",{key:0,onClick:V=>e.deleteIngredient(u.id),class:"mdi mdi-trash-can selectable grow text-danger"},null,8,mt)):m("",!0)])])]))),128))])]),e.account.id==e.recipe.creatorId?(c(),d("div",vt,[s("form",{onSubmit:t[11]||(t[11]=C((...u)=>e.addIngredient&&e.addIngredient(...u),["prevent"]))},[w(s("input",{"onUpdate:modelValue":t[9]||(t[9]=u=>e.ingredientData.name=u),type:"text",class:"form-control",id:"exampleFormControlInput1",placeholder:"Ingredient name...",required:""},null,512),[[k,e.ingredientData.name]]),w(s("input",{"onUpdate:modelValue":t[10]||(t[10]=u=>e.ingredientData.quantity=u),type:"text",class:"form-control",id:"exampleFormControlInput1",placeholder:"Qty: 2 tbsp...",required:""},null,512),[[k,e.ingredientData.quantity]]),ht],32)])):m("",!0)])]),s("div",yt,[s("span",null,"published by: "+h(e.recipe.creator.name),1)])])])])}var bt=I(Ee,[["render",ft]]),wt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:bt});let N=3;const St={name:"handle",display:"Handle, Transitions",instruction:"Drag using the handle icon",order:5,components:{draggable:P},data(){return{list:v(()=>r.steps),drag:!1}},computed:{draggingInfo(){return this.dragging?"under drag":""},dragOptions(){return{animation:200,group:"description",disabled:!1,ghostClass:"ghost"}}},methods:{removeAt(n){this.list.splice(n,1)},add:function(){N++,this.list.push({body:"Juan "+N,id:N,text:""})}},setup(){const n=b(""),t=b({recipeId:r.activeRecipe.id,position:1});return{stepData:t,stepsView:n,steps:v(()=>r.steps),account:v(()=>r.account),recipe:v(()=>r.activeRecipe),async updateStep(o){try{await E.updateStep(o)}catch(e){_.error(e),a.toast(e.message,"error")}},async sortSteps(){try{let o=r.steps;for(let e=0;e<o.length;e++){const i=o[e];i.position=e+1,this.updateStep(i)}n.value="",t.value.body="",a.toast("Steps updated!","success")}catch(o){_.error(o),a.toast(o.message,"error")}},async addStep(){try{if(t.value.position=1,this.steps.length>0){let o=this.steps[this.steps.length-1];t.value.position=o.position+1}t.value.recipeId=r.activeRecipe.id,await E.createStep(t.value),t.value.body="",a.toast("Step added!","success")}catch(o){_.error(o),a.toast(o.message,"error")}},async deleteStep(o){try{_.log("delete step",o.element.id),await a.confirm("Are you sure you want to delete this step?")&&(await E.deleteStep(o.element.id),a.toast("Step removed","success"))}catch(e){_.error(e),a.toast(e.message,"error")}}}}},B=n=>(D("data-v-65063f9a"),n=n(),j(),n),xt={class:"row"},kt={class:"col-12"},It=B(()=>s("div",{class:"text-center bg-primary rounded"},[s("h3",null,"Recipe Steps")],-1)),Rt={key:0,class:"text-center text-danger"},Ct=B(()=>s("span",null,"Steps have not been added",-1)),Et=[Ct],At={key:1,class:"text-center text-danger"},Vt=B(()=>s("span",null,"Click edit to add steps",-1)),$t=[Vt],Tt={key:0,class:"mdi mdi-reorder-horizontal handle me-2"},Ot=["onUpdate:modelValue"],Dt={key:2,class:"mx-2"},jt=["onClick"],Lt={key:0,class:"d-flex justify-content-end m-2"},qt={key:1,class:"d-flex justify-content-end my-3"},Pt={key:2,class:"d-flex justify-content-end my-3"};function Mt(n,t,o,e,i,p){const l=S("draggable");return c(),d($,null,[s("div",xt,[s("div",kt,[It,e.steps<1?(c(),d("div",Rt,Et)):m("",!0),e.steps<1&&e.recipe.creatorId==e.account.id?(c(),d("div",At,$t)):m("",!0),x(l,ce({tag:"transition-group","component-data":{tag:"ul",type:"transition-group",body:i.drag?null:"flip-list"},list:i.list,class:"list-group",handle:".handle",disabled:e.stepsView==""},p.dragOptions,{onStart:t[0]||(t[0]=g=>i.drag=!0),onEnd:t[1]||(t[1]=g=>i.drag=!1),"item-key":"position"}),{item:O(({element:g,index:u})=>[s("li",{class:Q(e.stepsView=="Edit"?"list-group-item move-list align-items-center d-flex justify-content-between p-2":"list-group-item")},[e.stepsView=="Edit"?(c(),d("i",Tt)):m("",!0),s("span",null,[s("b",null,h(u+1+"."),1)]),e.stepsView=="Edit"?w((c(),d("input",{key:1,type:"text-area",class:"form-control form-control-sm","onUpdate:modelValue":V=>g.body=V,placeholder:"Step details..."},null,8,Ot)),[[k,g.body]]):m("",!0),e.stepsView==""?(c(),d("span",Dt,h(g.body),1)):m("",!0),e.stepsView=="Edit"?(c(),d("i",{key:3,class:"mdi mdi-close close text-danger delete",onClick:V=>e.deleteStep({element:g})},null,8,jt)):m("",!0)],2)]),_:1},16,["component-data","list","disabled"])])]),e.stepsView=="Edit"?(c(),d("div",Lt)):m("",!0),e.stepsView=="Edit"?(c(),d("div",qt,[e.stepsView=="Edit"?(c(),d("button",{key:0,class:"btn btn-primary mx-2",type:"submit",onClick:t[2]||(t[2]=C(g=>e.addStep(),["prevent"])),title:"Add a Step"}," Add ")):m("",!0),s("button",{onClick:t[3]||(t[3]=g=>e.sortSteps()),class:"btn btn-primary",title:"Save Steps"}," Save ")])):m("",!0),e.stepsView==""&&e.recipe.creatorId==e.account.id?(c(),d("div",Pt,[s("button",{onClick:t[4]||(t[4]=g=>e.stepsView="Edit"),class:"btn btn-primary"},"Edit")])):m("",!0)],64)}var Z=I(St,[["render",Mt],["__scopeId","data-v-65063f9a"]]),Ut=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Z});const Nt={setup(){const n=b({recipeId:r.activeRecipe.id}),t=b({recipeId:r.activeRecipe.id,position:1});return M(async()=>{try{r.account,r.activeRecipe.id&&(await R.getIngredients(r.activeRecipe.id),await R.getSteps(r.activeRecipe.id))}catch(o){_.error(o),a.toast(o.message,"error")}}),{ingredientData:n,stepData:t,recipe:v(()=>r.activeRecipe),ingredients:v(()=>r.ingredients),steps:v(()=>r.steps),account:v(()=>r.account),async deleteRecipe(){try{await a.confirm("Are you sure you want to delete this recipe?")&&(await R.deleteRecipe(this.recipe.id),T.getOrCreateInstance(document.getElementById("active-recipe")).hide(),a.toast("Recipe deleted","success"))}catch(o){_.error(o),a.toast(o.message,"error")}},async deleteStep(o){try{await a.confirm("Are you sure you want to delete this step?")&&(await E.deleteStep(o),a.toast("Step deleted","success"))}catch(e){_.error(e),a.toast(e.message,"error")}},async deleteIngredient(o){try{await a.confirm("Are you sure you want to delete this ingredient?")&&(await A.deleteIngredient(o),a.toast("Step deleted","success"))}catch(e){_.error(e),a.toast(e.message,"error")}},async addIngredient(){try{await A.createIngredient(n.value),n.value.name="",n.value.quantity="",a.toast("Ingredient Added!","success")}catch(o){_.error(o),a.toast(o.message,"error")}},async addStep(){try{await E.createStep(t.value),t.value.body="",a.toast("Step added!","success")}catch(o){_.error(o),a.toast(o.message,"error")}}}},components:{Steps:Z}},z=n=>(D("data-v-5c3f963c"),n=n(),j(),n),Bt={class:"container-fluid"},zt={class:"row"},Ft={class:"col-lg-8 pt-3 p-3"},Ht={class:"d-flex justify-content-between align-items-center"},Kt={class:"text-secondary fs-3"},Wt={class:"bg-grey rounded-pill p-1 px-3 mx-3"},Yt={class:"position-absolute top-0 end-0 p-2"},Qt={key:0,class:"dropdown"},Gt=z(()=>s("a",{class:"btn",href:"#",role:"button",id:"dropdownMenuLink","data-bs-toggle":"dropdown","aria-expanded":"false"},[s("i",{class:"mdi mdi-dots-horizontal ellipses"})],-1)),Jt={class:"dropdown-menu dropdown-menu-end","aria-labelledby":"dropdownMenuLink"},Zt=q("Delete"),Xt=z(()=>s("i",{class:"mdi mdi-trash-can"},null,-1)),es=[Zt,Xt],ts=z(()=>s("button",{type:"button",class:"btn-close btn btn-light bg-light","data-bs-dismiss":"modal","aria-label":"Close"},null,-1)),ss={class:"text-grey fs-4"},os={class:"row pt-5"},ns={class:"col-lg-6"},is={class:"col-lg-6 mb-5"},rs={class:"published p-2"};function as(n,t,o,e,i,p){const l=S("Steps"),g=S("Ingredients");return c(),d("div",Bt,[s("div",zt,[s("div",{class:"col-lg-4 modal-col1 text-end modal-round",style:U(`background-image: url(${e.recipe.picture})`)},null,4),s("div",Ft,[s("div",Ht,[s("div",null,[s("span",Kt,h(e.recipe.title),1),s("span",Wt,h(e.recipe.category),1),s("p",null,h(),1)]),s("div",Yt,[e.recipe.creatorId==e.account.id?(c(),d("div",Qt,[Gt,s("ul",Jt,[s("li",null,[s("a",{onClick:t[0]||(t[0]=(...u)=>e.deleteRecipe&&e.deleteRecipe(...u)),class:"dropdown-item text-danger d-flex justify-content-between",href:"#"},es)])]),ts])):m("",!0)])]),s("span",ss,h(e.recipe.subtitle),1),s("div",os,[s("div",ns,[x(l)]),s("div",is,[x(g)])])])]),s("div",rs,[s("span",null,"published by: "+h(e.recipe.creator.name),1)])])}var cs=I(Nt,[["render",as],["__scopeId","data-v-5c3f963c"]]),ds=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:cs});let F=3;const ls={name:"handle",display:"Handle, Transitions",instruction:"Drag using the handle icon",order:5,components:{draggable:P},data(){return{list:v(()=>r.ingredients),drag:!1}},computed:{draggingInfo(){return this.dragging?"under drag":""},dragOptions(){return{animation:200,group:"description",disabled:!1,ghostClass:"ghost"}}},methods:{removeAt(n){this.list.splice(n,1)},add:function(){F++,this.list.push({body:"Juan "+F,id:F,text:""})}},setup(){const n=b(""),t=b({recipeId:r.activeRecipe.id});return{ingredientData:t,ingredientsView:n,ingredients:v(()=>r.ingredients),account:v(()=>r.account),recipe:v(()=>r.activeRecipe),async updateIngredient(o){try{await A.updateIngredient(o)}catch(e){_.error(e),a.toast(e.message,"error")}},async saveIngredients(){try{let o=r.ingredients;for(let e=0;e<o.length;e++){const i=o[e];this.updateIngredient(i)}n.value="",a.toast("Ingredients updated!","success")}catch(o){_.error(o),a.toast(o.message,"error")}},async addIngredient(){try{t.value.recipeId=r.activeRecipe.id,await A.createIngredient(t.value),t.value.name="",a.toast("Ingredient added!","success")}catch(o){_.error(o),a.toast(o.message,"error")}},async deleteIngredient(o){try{await a.confirm("Are you sure you want to delete this ingredient?")&&(await A.deleteIngredient(o.element.id),a.toast("Ingredient removed","success"))}catch(e){_.error(e),a.toast(e.message,"error")}}}}},H=n=>(D("data-v-273737be"),n=n(),j(),n),us={class:"row"},ps={class:"col-12"},_s=H(()=>s("div",{class:"text-center bg-primary rounded"},[s("h3",null,"Recipe Ingredients")],-1)),gs={key:0,class:"text-center text-danger"},ms=H(()=>s("span",null,"Ingredients have not been added",-1)),vs=[ms],hs={key:1,class:"text-center text-danger"},ys=H(()=>s("span",null,"Click edit to add ingredients",-1)),fs=[ys],bs=["onUpdate:modelValue"],ws={key:1,class:"mx-2"},Ss=["onClick"],xs={key:0,class:"d-flex justify-content-end m-2"},ks={key:1,class:"d-flex justify-content-end my-3"},Is={key:2,class:"d-flex justify-content-end my-3"};function Rs(n,t,o,e,i,p){const l=S("draggable");return c(),d($,null,[s("div",us,[s("div",ps,[_s,e.ingredients<1?(c(),d("div",gs,vs)):m("",!0),e.ingredients<1&&e.recipe.creatorId==e.account.id?(c(),d("div",hs,fs)):m("",!0),x(l,{tag:"transition-group","component-data":{tag:"ul",type:"transition-group",body:i.drag?null:"flip-list"},list:i.list,class:"list-group",disabled:"true","item-key":"position"},{item:O(({element:g})=>[s("li",{class:Q(e.ingredientsView=="Edit"?"list-group-item align-items-center d-flex justify-content-between p-2":"list-group-item")},[e.ingredientsView=="Edit"?w((c(),d("input",{key:0,type:"text-area",class:"form-control form-control-sm mx-2 w-100","onUpdate:modelValue":u=>g.name=u,placeholder:"1 cup of flour..."},null,8,bs)),[[k,g.name]]):m("",!0),e.ingredientsView==""?(c(),d("span",ws,h(g.name),1)):m("",!0),e.ingredientsView=="Edit"?(c(),d("i",{key:2,class:"mdi mdi-close close text-danger delete",onClick:u=>e.deleteIngredient({element:g})},null,8,Ss)):m("",!0)],2)]),_:1},8,["component-data","list"])])]),e.ingredientsView=="Edit"?(c(),d("div",xs)):m("",!0),e.ingredientsView=="Edit"?(c(),d("div",ks,[e.ingredientsView=="Edit"?(c(),d("button",{key:0,class:"btn btn-primary mx-2",type:"submit",onClick:t[0]||(t[0]=C(g=>e.addIngredient(),["prevent"])),title:"Add an ingredient"}," Add ")):m("",!0),s("button",{onClick:t[1]||(t[1]=g=>e.saveIngredients()),class:"btn btn-primary",title:"Save Steps"}," Save ")])):m("",!0),e.ingredientsView==""&&e.recipe.creatorId==e.account.id?(c(),d("div",Is,[s("button",{onClick:t[2]||(t[2]=g=>e.ingredientsView="Edit"),class:"btn btn-primary"}," Edit ")])):m("",!0)],64)}var Cs=I(ls,[["render",Rs],["__scopeId","data-v-273737be"]]),Es=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Cs});const As="modulepreload",X={},Vs="/",K=function(t,o){return!o||o.length===0?t():Promise.all(o.map(e=>{if(e=`${Vs}${e}`,e in X)return;X[e]=!0;const i=e.endsWith(".css"),p=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${p}`))return;const l=document.createElement("link");if(l.rel=i?"stylesheet":As,i||(l.as="script",l.crossOrigin=""),l.href=e,document.head.appendChild(l),i)return new Promise((g,u)=>{l.addEventListener("load",g),l.addEventListener("error",u)})})).then(()=>t())};function $s(n){switch(n){case"./pages/AboutPage.vue":return K(()=>import("./AboutPage.ed7215db.js"),["assets/AboutPage.ed7215db.js","assets/vendor.2e10bab8.js"]);case"./pages/AccountPage.vue":return K(()=>import("./AccountPage.ed64db1f.js"),["assets/AccountPage.ed64db1f.js","assets/AccountPage.1d38451d.css","assets/vendor.2e10bab8.js"]);case"./pages/HomePage.vue":return K(()=>import("./HomePage.262f4617.js"),["assets/HomePage.262f4617.js","assets/HomePage.e59e6b54.css","assets/vendor.2e10bab8.js"]);default:return new Promise(function(t,o){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(o.bind(null,new Error("Unknown variable dynamic import: "+n)))})}}function W(n){return()=>$s(`./pages/${n}.vue`)}const Ts=[{path:"/",name:"Home",component:W("HomePage")},{path:"/about",name:"About",component:W("AboutPage")},{path:"/account",name:"Account",component:W("AccountPage"),beforeEnter:ue}],ee=de({linkActiveClass:"router-link-active",linkExactActiveClass:"router-link-exact-active",history:le(),routes:Ts});class Os{async getAccount(){try{const t=await y.get("/account");r.account=t.data}catch(t){_.error("HAVE YOU STARTED YOUR SERVER YET???",t)}}async getFavorites(){let o=(await y.get("/account/favorites")).data;o.forEach(e=>{let i=r.recipes.find(p=>e.id==p.id);i&&(i.isFavorite=!0)}),r.favorites=o}}const te=new Os,Ds={connection:"connection",connected:"connected",disconnect:"disconnect",authenticate:"authenticate",authenticated:"authenticated",userConnected:"userConnected",userDisconnected:"userDisconnected",error:"error"};class js{constructor(t=!1,o=J){}on(t,o){var e;return(e=this.socket)==null||e.on(t,o.bind(this)),this}onConnected(t){_.log("[SOCKET_CONNECTION]",t),this.connected=!0,this.playback()}onAuthenticated(t){_.log("[SOCKET_AUTHENTICATED]",t),this.authenticated=!0,this.playback()}authenticate(t){var o;(o=this.socket)==null||o.emit(Ds.authenticate,t)}onError(t){_.error("[SOCKET_ERROR]",t)}enqueue(t,o){_.log("[ENQUEING_ACTION]",{action:t,payload:o}),this.queue.push({action:t,payload:o})}playback(){_.log("[SOCKET_PLAYBACK]");const t=[...this.queue];this.queue=[],t.forEach(o=>{this.emit(o.action,o.payload)})}emit(t,o=void 0){if(this.requiresAuth&&!this.authenticated)return this.enqueue(t,o);if(!this.connected)return this.enqueue(t,o);this.socket.emit(t,o)}}class Ls extends js{constructor(){super();this.on("error",this.onError)}onError(t){a.toast(t.message,"error")}}const se=new Ls,f=pe({domain:Se,clientId:ke,audience:xe,useRefreshTokens:!0,onRedirectCallback:n=>{ee.push(n&&n.targetUrl?n.targetUrl:window.location.pathname)}});f.on(f.AUTH_EVENTS.AUTHENTICATED,async function(){y.defaults.headers.authorization=f.bearer,y.interceptors.request.use(qs),r.user=f.user,await te.getAccount(),se.authenticate(f.bearer)});async function qs(n){if(!f.isAuthenticated)return n;const t=f.identity.exp*1e3,o=t<Date.now(),e=t<Date.now()+1e3*60*60*12;return o?await f.loginWithPopup():e&&(await f.getTokenSilently(),y.defaults.headers.authorization=f.bearer,se.authenticate(f.bearer)),n}const Ps={setup(){return{user:v(()=>r.user),account:v(()=>r.account),async login(){f.loginWithPopup()},async logout(){f.logout({returnTo:window.location.origin})}}}},oe=n=>(D("data-v-ce32ca6a"),n=n(),j(),n),Ms={class:"navbar-text"},Us={key:1,class:"dropdown my-lg-0"},Ns={class:"dropdown-toggle selectable","data-bs-toggle":"dropdown","aria-expanded":"false",id:"authDropdown"},Bs={key:0},zs=["src"],Fs={class:"dropdown-menu p-0 list-group w-100","aria-labelledby":"authDropdown"},Hs=oe(()=>s("div",{class:"list-group-item list-group-item-action hoverable"}," Manage Account ",-1)),Ks=oe(()=>s("i",{class:"mdi mdi-logout"},null,-1)),Ws=q(" logout "),Ys=[Ks,Ws];function Qs(n,t,o,e,i,p){const l=S("router-link");return c(),d("span",Ms,[e.user.isAuthenticated?(c(),d("div",Us,[s("div",Ns,[e.account.picture?(c(),d("div",Bs,[s("img",{src:e.account.picture,alt:"account photo",height:"40",class:"profile-img"},null,8,zs)])):m("",!0)]),s("div",Fs,[x(l,{to:{name:"Account"}},{default:O(()=>[Hs]),_:1}),s("div",{class:"list-group-item list-group-item-action hoverable text-danger",onClick:t[1]||(t[1]=(...g)=>e.logout&&e.logout(...g))},Ys)])])):(c(),d("button",{key:0,class:"btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0",onClick:t[0]||(t[0]=(...g)=>e.login&&e.login(...g))}," Login "))])}var Gs=I(Ps,[["render",Qs],["__scopeId","data-v-ce32ca6a"]]),Js=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Gs});const Zs={},Xs={class:"modal fade modal-open",tabindex:"-1",role:"dialog","aria-labelledby":"modelTitleId","aria-hidden":"true"},eo={class:"modal-fade modal-dialog modal-xl",role:"document"},to={class:"modal-content border-0"},so={class:"modal-body p-0"};function oo(n,t,o,e,i,p){return c(),d("div",Xs,[s("div",eo,[s("div",to,[s("div",so,[_e(n.$slots,"body")])])])])}var no=I(Zs,[["render",oo]]),io=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:no});const ro={setup(){const n=b("");return M(()=>{r.search==!1&&(n.value="")}),{searchTerm:n,account:v(()=>r.account),async searchRecipes(){await R.searchRecipes(n.value),r.search=!0,r.searchWord=n.value,r.account.id&&await te.getFavorites()}}}},ao=n=>(D("data-v-6a8b78ba"),n=n(),j(),n),co={class:"header-img d-flex justify-content-end"},lo={class:"input-group pt-3"},uo=ao(()=>s("span",{class:"input-group-append"},[s("button",{class:"btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5",type:"submit"},[s("i",{class:"mdi mdi-magnify"})])],-1)),po={class:"p-3"};function _o(n,t,o,e,i,p){const l=S("Login");return c(),d("div",co,[s("div",null,[s("form",{onSubmit:t[1]||(t[1]=C(g=>e.searchRecipes(),["prevent"]))},[s("div",lo,[w(s("input",{"onUpdate:modelValue":t[0]||(t[0]=g=>e.searchTerm=g),class:"form-control border-end-0 border",type:"search",placeholder:"search",id:"example-search-input"},null,512),[[k,e.searchTerm]]),uo])],32)]),s("div",po,[x(l)])])}var go=I(ro,[["render",_o],["__scopeId","data-v-6a8b78ba"]]),mo=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:go});const vo={props:{recipe:{type:Object,required:!0}},setup(n){return{recipes:v(()=>r.recipes),async triggerModal(){r.activeRecipe=n.recipe,_.log(r.activeRecipe),T.getOrCreateInstance(document.getElementById("active-recipe")).show()},async favoriteRecipe(){try{await R.favoriteRecipe(n.recipe.id),n.recipe.isFavorite?a.toast("Recipe added to favorites","success"):a.toast("Recipe removed from favorites","success")}catch(t){_.error(t),a.toast(t.message,"error")}}}}},ho={class:"col-lg-4 col-md-6"},yo={class:"d-flex justify-content-between"},fo={class:"bg-grey text-shadow elevation-2 m-2 rounded-pill p-2 card-content"},bo={class:"bg-grey text-shadow m-2 rounded p-2 elevation-2 grow card-content"},wo={class:"position-absolute bottom-0 w-100"},So={class:"bg-grey text-shadow elevation-2 rounded m-3 p-3 card-content border-5 border-dark"};function xo(n,t,o,e,i,p){return c(),d("div",ho,[s("div",{onClick:t[2]||(t[2]=(...l)=>e.triggerModal&&e.triggerModal(...l)),class:"bg-grey elevation-2 m-3 card-bg rounded position-relative grow-card selectable",style:U(`background-image: url(${o.recipe.picture})`)},[s("div",yo,[s("span",fo,[s("b",null,h(o.recipe.category),1)]),s("span",bo,[s("b",null,[o.recipe.isFavorite?(c(),d("i",{key:0,onClick:t[0]||(t[0]=C((...l)=>e.favoriteRecipe&&e.favoriteRecipe(...l),["stop"])),class:"mdi mdi-heart text-danger selectable grow"})):(c(),d("i",{key:1,onClick:t[1]||(t[1]=C((...l)=>e.favoriteRecipe&&e.favoriteRecipe(...l),["stop"])),class:"mdi mdi-heart-outline text-danger selectable grow"}))])])]),s("div",wo,[s("div",So,[s("h4",null,h(o.recipe.title),1),s("span",null,h(o.recipe.subtitle),1)])])],4)])}var ko=I(vo,[["render",xo]]),Io=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:ko});const Ro={setup(){const n=b({});return{editable:n,async postRecipe(){try{await R.createRecipe(n.value),T.getOrCreateInstance(document.getElementById("recipe-form")).hide(),n.value={},T.getOrCreateInstance(document.getElementById("active-recipe")).show(),a.toast("recipe created!","success")}catch(t){_.error(t),a.toast(t.message,"error")}}}}},Co=s("div",{class:"d-flex justify-content-between bg-primary text-white p-2 rounded-top"},[s("div",{class:""},[s("span",{class:"fs-3 p-3"}," Create Recipe ")]),s("div",null,[s("button",{type:"button",class:"btn-close btn btn-light bg-light m-3","data-bs-dismiss":"modal","aria-label":"Close"})])],-1),Eo={class:"row pt-3 p-3"},Ao={class:"col-lg-6"},Vo={class:"form-floating mb-3"},$o=s("label",{for:"floatingInput"},"Title",-1),To={class:"form-floating mb-3"},Oo=s("label",{for:"floatingInput"},"Subtitle",-1),Do={class:"col-lg-6"},jo={class:"form-floating"},Lo=me('<option value="" selected>Please select...</option><option value="Breakfast">Breakfast</option><option value="Lunch">Lunch</option><option value="Dinner">Dinner</option><option value="Salad">Salad</option><option value="Sides">Sides</option><option value="Appetizer">Appetizer</option><option value="Dessert">Dessert</option>',8),qo=[Lo],Po=s("label",{for:"floatingSelect"},"Select Category",-1),Mo={class:"form-floating mb-3"},Uo=s("label",{for:"floatingInput"},"Image URL",-1),No=s("div",{class:"d-flex justify-content-end p-3"},[s("button",{type:"button",class:"btn btn-light","data-bs-dismiss":"modal","aria-label":"Close"}," Cancel "),s("button",{type:"submit",class:"btn btn-secondary mx-3"},"Submit")],-1);function Bo(n,t,o,e,i,p){return c(),d($,null,[Co,s("form",{onSubmit:t[4]||(t[4]=C((...l)=>e.postRecipe&&e.postRecipe(...l),["prevent"]))},[s("div",Eo,[s("div",Ao,[s("div",Vo,[w(s("input",{"onUpdate:modelValue":t[0]||(t[0]=l=>e.editable.title=l),type:"text",class:"form-control",id:"floatingInput",placeholder:"Title",required:""},null,512),[[k,e.editable.title]]),$o]),s("div",To,[w(s("input",{"onUpdate:modelValue":t[1]||(t[1]=l=>e.editable.subtitle=l),type:"text",class:"form-control",id:"floatingInput",placeholder:"Subtitle",required:""},null,512),[[k,e.editable.subtitle]]),Oo])]),s("div",Do,[s("div",jo,[w(s("select",{"onUpdate:modelValue":t[2]||(t[2]=l=>e.editable.category=l),class:"form-select mb-3",id:"floatingSelect","aria-label":"Floating label select example",required:""},qo,512),[[ge,e.editable.category]]),Po]),s("div",Mo,[w(s("input",{"onUpdate:modelValue":t[3]||(t[3]=l=>e.editable.picture=l),type:"text",class:"form-control",id:"floatingInput",placeholder:"img URL"},null,512),[[k,e.editable.picture]]),Uo])])]),No],32)],64)}var zo=I(Ro,[["render",Bo]]),Fo=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:zo});function Ho(n){Object.entries({"./components/ActiveRecipe-broken.vue":wt,"./components/ActiveRecipe.vue":ds,"./components/Ingredients.vue":Es,"./components/Login.vue":Js,"./components/Modal.vue":io,"./components/Navbar.vue":mo,"./components/Recipe.vue":Io,"./components/RecipeForm.vue":Fo,"./components/Steps.vue":Ut}).forEach(([o,e])=>{const i=e.name||o.substr(o.lastIndexOf("/")+1).replace(/\.\w+$/,"");n.component(i,e.default)})}const ne=ve(we);Ho(ne);ne.use(ee).mount("#app");export{r as A,a as P,I as _,f as a,te as b,_ as l,R as r};